<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Models\Customer;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display sales history.
     */
    public function index(Request $request)
    {
        $branchId = session('branch_id');

        if (!$branchId) {
            abort(403, 'No active branch selected.');
        }

        $sales = Sale::with([
                'user:id,name',
                'items.product:id,name,sku',
            ])
            ->where('branch_id', $branchId)
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Sales/Index', [
            'sales' => $sales,
        ]);
    }

    /**
     * Display the POS screen.
     */
    public function create()
    {
        $branchId = session('branch_id');

        if (!$branchId) {
            abort(403, 'No active branch selected.');
        }

        $products = Product::where('branch_id', $branchId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'sku',
                'barcode',
                'selling_price',
                'quantity',
                'unit',
                'image',
            ]);

        return Inertia::render('Admin/Sales/Create', [
            'products' => $products,
        ]);
    }



/**
 * Display the Quick Sale POS screen.
 */
public function quickSale()
{
    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    $products = Product::with('category:id,name')
        ->where('branch_id', $branchId)
        ->where('status', 'active')
        ->where('quantity', '>', 0)
        ->orderBy('name')
        ->get([
            'id',
            'category_id',
            'name',
            'sku',
            'barcode',
            'selling_price',
            'quantity',
            'unit',
            'image',
        ]);

    $categories = $products
        ->pluck('category')
        ->filter()
        ->unique('id')
        ->values()
        ->map(fn ($category) => [
            'id' => $category->id,
            'name' => $category->name,
        ]);
    
    $customers = Customer::where('branch_id', $branchId)
    ->orderBy('name')
    ->get([
        'id',
        'name',
        'phone',
        'email',
    ]);

    return Inertia::render('Admin/QuickSale', [
        'products' => $products,
        'categories' => $categories,
        'customers' => $customers,
    ]);
}

    /**
     * Store a new sale.
     */
    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Validate Request
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'items' => [
                'required',
                'array',
                'min:1',
            ],

            'items.*.product_id' => [
                'required',
                'integer',
                'min:1',
            ],

            'items.*.quantity' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'discount' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'payment_method' => [
                'required',
                'in:cash,mobile_money,bank,credit',
            ],

            'paid_amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'customer_id' => [
                'nullable',
                'integer',
                'min:1',
            ],
        ]);

        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Get Active Branch
        |--------------------------------------------------------------------------
        */

        $branchId = session('branch_id');

        if (!$branchId) {
            throw ValidationException::withMessages([
                'branch_id' => 'No active branch has been selected.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Combine Repeated Products
        |--------------------------------------------------------------------------
        |
        | If the same product appears more than once in the request,
        | combine its quantities before checking available stock.
        |
        */

        $requestedItems = [];

        foreach ($validated['items'] as $item) {
            $productId = (int) $item['product_id'];

            $quantity = (float) $item['quantity'];

            if (!isset($requestedItems[$productId])) {
                $requestedItems[$productId] = 0;
            }

            $requestedItems[$productId] += $quantity;
        }

        /*
        |--------------------------------------------------------------------------
        | Process Sale Inside Database Transaction
        |--------------------------------------------------------------------------
        */

        $sale = DB::transaction(function () use (
            $validated,
            $user,
            $branchId,
            $requestedItems
        ) {
            $subtotal = 0;

            $saleItems = [];

            /*
            |--------------------------------------------------------------------------
            | Lock Products and Check Stock
            |--------------------------------------------------------------------------
            */

            // Sort IDs to reduce the risk of deadlocks between cashiers.
            ksort($requestedItems);

            foreach ($requestedItems as $productId => $requestedQuantity) {

                /*
                |--------------------------------------------------------------------------
                | Lock Product Row
                |--------------------------------------------------------------------------
                */

                $product = Product::where('id', $productId)
                    ->where('branch_id', $branchId)
                    ->where('status', 'active')
                    ->lockForUpdate()
                    ->first();

                if (!$product) {
                    throw ValidationException::withMessages([
                        'items' => "Product ID {$productId} was not found in this branch or is inactive.",
                    ]);
                }

                /*
                |--------------------------------------------------------------------------
                | Check Available Stock
                |--------------------------------------------------------------------------
                */

                if ((float) $product->quantity < $requestedQuantity) {
                    throw ValidationException::withMessages([
                        'items' => "Insufficient stock for {$product->name}. Available stock: {$product->quantity}. Requested quantity: {$requestedQuantity}.",
                    ]);
                }

                /*
                |--------------------------------------------------------------------------
                | Calculate Item Total
                |--------------------------------------------------------------------------
                */

                $quantity = $requestedQuantity;

                $unitPrice = (float) $product->selling_price;

                $costPrice = (float) $product->cost_price;

                $itemTotal = $quantity * $unitPrice;

                $subtotal += $itemTotal;

                $saleItems[] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'cost_price' => $costPrice,
                    'total' => $itemTotal,
                ];
            }

            /*
            |--------------------------------------------------------------------------
            | Calculate Discount
            |--------------------------------------------------------------------------
            */

            $discount = (float) ($validated['discount'] ?? 0);

            if ($discount > $subtotal) {
                throw ValidationException::withMessages([
                    'discount' => 'Discount cannot be greater than the subtotal.',
                ]);
            }

            $total = max(0, $subtotal - $discount);

            /*
            |--------------------------------------------------------------------------
            | Payment
            |--------------------------------------------------------------------------
            */

            $paymentMethod = $validated['payment_method'];

            $paidAmount = (float) $validated['paid_amount'];

            /*
            |--------------------------------------------------------------------------
            | Credit Sale
            |--------------------------------------------------------------------------
            */

            if (
                $paymentMethod === 'credit' &&
                empty($validated['customer_id'])
            ) {
                throw ValidationException::withMessages([
                    'customer_id' => 'A customer is required for credit sales.',
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Payment Status
            |--------------------------------------------------------------------------
            */

            if ($paymentMethod === 'credit') {

                $paymentStatus = $paidAmount >= $total
                    ? 'paid'
                    : ($paidAmount > 0 ? 'partial' : 'unpaid');

            } else {

                if ($paidAmount < $total) {
                    throw ValidationException::withMessages([
                        'paid_amount' => 'Paid amount cannot be less than the sale total.',
                    ]);
                }

                $paymentStatus = 'paid';
            }

            /*
            |--------------------------------------------------------------------------
            | Change
            |--------------------------------------------------------------------------
            */

            $changeAmount = max(0, $paidAmount - $total);

            /*
            |--------------------------------------------------------------------------
            | Generate Invoice Number
            |--------------------------------------------------------------------------
            */

            $invoiceNumber = 'SALE-' .
                now()->format('YmdHis') .
                '-' .
                random_int(100, 999);

            /*
            |--------------------------------------------------------------------------
            | Create Sale
            |--------------------------------------------------------------------------
            */

            $sale = Sale::create([
                'branch_id' => $branchId,
                'user_id' => $user->id,
                'customer_id' => $validated['customer_id'] ?? null,

                'invoice_number' => $invoiceNumber,

                'subtotal' => $subtotal,
                'discount' => $discount,
                'total' => $total,

                'payment_method' => $paymentMethod,
                'payment_status' => $paymentStatus,

                'paid_amount' => $paidAmount,
                'change_amount' => $changeAmount,

                'status' => 'completed',
            ]);

            /*
            |--------------------------------------------------------------------------
            | Create Sale Items and Reduce Stock
            |--------------------------------------------------------------------------
            */

            foreach ($saleItems as $item) {

                $product = $item['product'];

                /*
                |--------------------------------------------------------------------------
                | Create Sale Item
                |--------------------------------------------------------------------------
                */

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,

                    'quantity' => $item['quantity'],

                    'unit_price' => $item['unit_price'],

                    // Snapshot cost price at time of sale.
                    'cost_price' => $item['cost_price'],

                    'discount' => 0,

                    'total' => $item['total'],
                ]);

                /*
                |--------------------------------------------------------------------------
                | Reduce Product Stock
                |--------------------------------------------------------------------------
                */

                $product->decrement(
                    'quantity',
                    $item['quantity']
                );

                /*
                |--------------------------------------------------------------------------
                | Record Stock Movement
                |--------------------------------------------------------------------------
                */

                StockMovement::create([
                    'product_id' => $product->id,
                    'branch_id' => $branchId,

                    'type' => 'OUT',

                    'quantity' => $item['quantity'],

                    'reference' => $invoiceNumber,

                    'note' => 'Stock issued through sale.',

                    'user_id' => $user->id,
                ]);
            }

            return $sale;
        }, 3);

        /*
        |--------------------------------------------------------------------------
        | Return Response
        |--------------------------------------------------------------------------
        */

        /*
*/

/*
|--------------------------------------------------------------------------
| Return Response
|--------------------------------------------------------------------------
*/

if ($request->input('return_to') === 'quick-sale') {
    return redirect()
        ->route('admin.sales.quick-sale')
        ->with(
            'success',
            "Sale {$sale->invoice_number} completed successfully."
        );
}

return redirect()
    ->route('admin.sales.create')
    ->with(
        'success',
        "Sale {$sale->invoice_number} completed successfully."
    );

        // return redirect()
        //     ->route('admin.sales.create')
        //     ->with(
        //         'success',
        //         "Sale {$sale->invoice_number} completed successfully."
        //     );
    }

    /**
     * Display sale details.
     */
    public function show(Sale $sale)
    {
        $branchId = session('branch_id');

        if (!$branchId) {
            abort(403, 'No active branch selected.');
        }

        if ((int) $sale->branch_id !== (int) $branchId) {
            abort(403, 'This sale does not belong to the active branch.');
        }

        $sale->load([
            'items.product',
            'user',
        ]);

        return Inertia::render('Admin/Sales/Show', [
            'sale' => $sale,
        ]);
    }
}

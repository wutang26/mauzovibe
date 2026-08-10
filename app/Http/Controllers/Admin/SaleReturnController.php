<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleReturn;
use App\Models\ReturnItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleReturnController extends Controller
{
 
/**
 * Display sale returns history.
 */
public function index(Request $request)
{
    $activeBranchId = session('branch_id');

    $query = SaleReturn::query()
        ->with([
            'sale',
            'user',
            'items.product',
        ])
        ->latest();

    /*
    |--------------------------------------------------------------------------
    | Active Branch
    |--------------------------------------------------------------------------
    */

    if ($activeBranchId) {
        $query->where(
            'branch_id',
            $activeBranchId
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if ($request->filled('search')) {

        $search = $request->search;

        $query->where(function ($q) use ($search) {

            $q->where(
                'return_number',
                'like',
                "%{$search}%"
            )

            ->orWhereHas('sale', function ($saleQuery) use ($search) {

                $saleQuery->where(
                    'invoice_number',
                    'like',
                    "%{$search}%"
                );

            })

            ->orWhereHas('user', function ($userQuery) use ($search) {

                $userQuery->where(
                    'name',
                    'like',
                    "%{$search}%"
                );

            });

        });
    }

    /*
    |--------------------------------------------------------------------------
    | Refund Method
    |--------------------------------------------------------------------------
    */

    if ($request->filled('refund_method')) {

        $query->where(
            'refund_method',
            $request->refund_method
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    if ($request->filled('status')) {

        $query->where(
            'status',
            $request->status
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Date Filter
    |--------------------------------------------------------------------------
    */

    if ($request->filled('date_from')) {

        $query->whereDate(
            'created_at',
            '>=',
            $request->date_from
        );
    }

    if ($request->filled('date_to')) {

        $query->whereDate(
            'created_at',
            '<=',
            $request->date_to
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    $returns = $query
        ->paginate(15)
        ->withQueryString();

    /*
    |--------------------------------------------------------------------------
    | Summary
    |--------------------------------------------------------------------------
    */

    $summaryQuery = SaleReturn::query();

    if ($activeBranchId) {
        $summaryQuery->where(
            'branch_id',
            $activeBranchId
        );
    }

    $totalReturns = (clone $summaryQuery)->count();

    $totalRefunded = (clone $summaryQuery)
        ->where('status', 'completed')
        ->sum('refund_amount');

    $todayReturns = (clone $summaryQuery)
        ->whereDate(
            'created_at',
            today()
        )
        ->count();

    $itemsReturned = ReturnItem::whereHas(
        'saleReturn',
        function ($query) use ($activeBranchId) {

            if ($activeBranchId) {
                $query->where(
                    'branch_id',
                    $activeBranchId
                );
            }

        }
    )->sum('quantity');

    /*
    |--------------------------------------------------------------------------
    | Return Data
    |--------------------------------------------------------------------------
    */

    $returnData = $returns->through(function ($return) {

        return [
            'id' => $return->id,

            'return_number' =>
                $return->return_number,

            'sale_id' =>
                $return->sale_id,

            'invoice_number' =>
                $return->sale?->invoice_number,

            'created_at' =>
                $return->created_at,

            'refund_amount' =>
                (float) $return->refund_amount,

            'refund_method' =>
                $return->refund_method,

            'reason' =>
                $return->reason,

            'status' =>
                $return->status,

            'user' => [
                'id' => $return->user?->id,
                'name' => $return->user?->name,
            ],

            'items_count' =>
                $return->items->count(),

            'quantity' =>
                (float) $return->items->sum('quantity'),
        ];
    });

    return Inertia::render(
        'Admin/Returns/Index',
        [
            'returns' => $returnData,

            'summary' => [
                'total_returns' =>
                    $totalReturns,

                'today_returns' =>
                    $todayReturns,

                'total_refunded' =>
                    (float) $totalRefunded,

                'items_returned' =>
                    (float) $itemsReturned,
            ],

            'filters' => [
                'search' =>
                    $request->search,

                'refund_method' =>
                    $request->refund_method,

                'status' =>
                    $request->status,

                'date_from' =>
                    $request->date_from,

                'date_to' =>
                    $request->date_to,
            ],
        ]
    );
}

    /**
     * Show the return page for a sale.
     */
    public function create(Sale $sale)
    {
        /*
        |--------------------------------------------------------------------------
        | Load Sale
        |--------------------------------------------------------------------------
        */

        $sale->load([
            'user',
            'branch',
            'items.product',
            'items.returns',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Make sure the sale belongs to the active branch
        |--------------------------------------------------------------------------
        */

        $activeBranchId = session('branch_id');

        if (
            $activeBranchId &&
            (int) $sale->branch_id !== (int) $activeBranchId
        ) {
            abort(403, 'This sale does not belong to the active branch.');
        }

        /*
        |--------------------------------------------------------------------------
        | Prepare Items
        |--------------------------------------------------------------------------
        */

        $items = $sale->items->map(function ($item) {

            /*
             * Quantity originally sold
             */
            $soldQuantity = (float) $item->quantity;

            /*
             * Quantity already returned
             */
            $returnedQuantity = (float) $item->returns->sum(
                'quantity'
            );

            /*
             * Quantity still available for return
             */
            $remainingQuantity = max(
                $soldQuantity - $returnedQuantity,
                0
            );

            return [
                'id' => $item->id,

                'product_id' => $item->product_id,

                'product' => [
                    'id' => $item->product?->id,
                    'name' => $item->product?->name,
                    'sku' => $item->product?->sku,
                    'barcode' => $item->product?->barcode,
                    'image' => $item->product?->image,
                    'unit' => $item->product?->unit ?? 'pcs',
                ],

                'quantity_sold' => $soldQuantity,

                'quantity_returned' => $returnedQuantity,

                'quantity_available' => $remainingQuantity,

                'unit_price' => (float) $item->unit_price,

                'total' => (float) $item->total,
            ];
        });

        /*
        |--------------------------------------------------------------------------
        | Check whether anything is still returnable
        |--------------------------------------------------------------------------
        */

        $hasReturnableItems = $items->contains(function ($item) {
            return $item['quantity_available'] > 0;
        });

        return Inertia::render(
            'Admin/Returns/Create',
            [
                'sale' => [
                    'id' => $sale->id,
                    'invoice_number' => $sale->invoice_number,
                    'created_at' => $sale->created_at,

                    'subtotal' => (float) $sale->subtotal,
                    'discount' => (float) $sale->discount,
                    'total' => (float) $sale->total,

                    'payment_method' => $sale->payment_method,
                    'payment_status' => $sale->payment_status,

                    'user' => [
                        'id' => $sale->user?->id,
                        'name' => $sale->user?->name,
                    ],

                    'items' => $items,
                ],

                'hasReturnableItems' => $hasReturnableItems,
            ]
        );
    }


    /**
     * Process a sale return.
     */
    public function store(Request $request, Sale $sale)
    {
        /*
        |--------------------------------------------------------------------------
        | Validate request
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'refund_method' => [
                'required',
                'in:cash,mobile_money,bank,credit',
            ],

            'reason' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'items' => [
                'required',
                'array',
                'min:1',
            ],

            'items.*.sale_item_id' => [
                'required',
                'integer',
                'exists:sale_items,id',
            ],

            'items.*.quantity' => [
                'required',
                'numeric',
                'gt:0',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Active Branch
        |--------------------------------------------------------------------------
        */

        $activeBranchId = session('branch_id');

        if (
            $activeBranchId &&
            (int) $sale->branch_id !== (int) $activeBranchId
        ) {
            abort(403, 'This sale does not belong to the active branch.');
        }

        /*
        |--------------------------------------------------------------------------
        | Process Everything Atomically
        |--------------------------------------------------------------------------
        */

        DB::transaction(function () use (
            $validated,
            $sale,
            $activeBranchId
        ) {

            /*
            |--------------------------------------------------------------------------
            | Reload sale items with locks
            |--------------------------------------------------------------------------
            */

            $sale->load('items');

            /*
            |--------------------------------------------------------------------------
            | Return total
            |--------------------------------------------------------------------------
            */

            $refundAmount = 0;

            $returnItems = [];

            /*
            |--------------------------------------------------------------------------
            | Validate every selected item
            |--------------------------------------------------------------------------
            */

            foreach ($validated['items'] as $requestedItem) {

                $saleItem = $sale->items
                    ->where(
                        'id',
                        $requestedItem['sale_item_id']
                    )
                    ->first();

                /*
                 * Prevent returning an item belonging
                 * to another sale.
                 */
                if (!$saleItem) {
                    abort(
                        422,
                        'One of the selected products does not belong to this sale.'
                    );
                }

                $requestedQuantity =
                    (float) $requestedItem['quantity'];

                /*
                 |--------------------------------------------------------------------------
                 | Calculate previously returned quantity
                 |--------------------------------------------------------------------------
                 */

                $alreadyReturned = ReturnItem::where(
                    'sale_item_id',
                    $saleItem->id
                )->sum('quantity');

                /*
                 |--------------------------------------------------------------------------
                 | Calculate remaining quantity
                 |--------------------------------------------------------------------------
                 */

                $availableQuantity = max(
                    (float) $saleItem->quantity -
                    (float) $alreadyReturned,
                    0
                );

                /*
                 |--------------------------------------------------------------------------
                 | Prevent over-return
                 |--------------------------------------------------------------------------
                 */

                if ($requestedQuantity > $availableQuantity) {

                    abort(
                        422,
                        "You can only return {$availableQuantity} " .
                        "unit(s) of this product."
                    );
                }

                /*
                 |--------------------------------------------------------------------------
                 | Calculate refund for item
                 |--------------------------------------------------------------------------
                 */

                $itemTotal =
                    $requestedQuantity *
                    (float) $saleItem->unit_price;

                $refundAmount += $itemTotal;

                $returnItems[] = [
                    'sale_item_id' => $saleItem->id,
                    'product_id' => $saleItem->product_id,
                    'quantity' => $requestedQuantity,
                    'unit_price' => $saleItem->unit_price,
                    'total' => $itemTotal,
                ];
            }

            /*
            |--------------------------------------------------------------------------
            | Make sure refund is greater than zero
            |--------------------------------------------------------------------------
            */

            if ($refundAmount <= 0) {
                abort(
                    422,
                    'The return amount must be greater than zero.'
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Generate Return Number
            |--------------------------------------------------------------------------
            */

            $returnNumber =
                'RET-' .
                now()->format('Ymd') .
                '-' .
                strtoupper(
                    substr(
                        uniqid(),
                        -6
                    )
                );

            /*
            |--------------------------------------------------------------------------
            | Create Return
            |--------------------------------------------------------------------------
            */

            $saleReturn = SaleReturn::create([
                'branch_id' => $activeBranchId
                    ?: $sale->branch_id,

                'sale_id' => $sale->id,

                'user_id' => auth()->id(),

                'return_number' => $returnNumber,

                'refund_amount' => $refundAmount,

                'refund_method' =>
                    $validated['refund_method'],

                'reason' =>
                    $validated['reason'] ?? null,

                'status' => 'completed',
            ]);

            /*
            |--------------------------------------------------------------------------
            | Create Return Items + Restore Stock
            |--------------------------------------------------------------------------
            */

            foreach ($returnItems as $item) {

                ReturnItem::create([
                    'return_id' => $saleReturn->id,

                    'sale_item_id' =>
                        $item['sale_item_id'],

                    'product_id' =>
                        $item['product_id'],

                    'quantity' =>
                        $item['quantity'],

                    'unit_price' =>
                        $item['unit_price'],

                    'total' =>
                        $item['total'],

                    'reason' =>
                        $validated['reason'] ?? null,
                ]);

                /*
                |--------------------------------------------------------------------------
                | Restore Product Stock
                |--------------------------------------------------------------------------
                */

                Product::where(
                    'id',
                    $item['product_id']
                )->increment(
                    'quantity',
                    $item['quantity']
                );
            }
        });

        /*
        |--------------------------------------------------------------------------
        | Redirect
        |--------------------------------------------------------------------------
        */

        return redirect()
            ->route(
                'admin.sales.show',
                $sale
            )
            ->with(
                'success',
                'Sale return processed successfully.'
            );
    }

    /**
 * Display a single sale return.
 */
public function show($return)
{
    $saleReturn = SaleReturn::with([
        'sale',
        'sale.items.product',
        'items.product',
    ])->findOrFail($return);

    // Security: return must belong to active branch
    if ($saleReturn->branch_id != session('branch_id')) {
        abort(403, 'This return does not belong to the active branch.');
    }

    return Inertia::render('Admin/Returns/Show', [
        'saleReturn' => $saleReturn,
    ]);
}
}
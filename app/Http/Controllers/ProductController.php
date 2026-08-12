<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Helpers\AuditHelper;
use Inertia\Inertia;

class ProductController extends Controller
{
    //Display resources
    public function index()
    {

        $products = Product::with(
            [
                'category',
            ]
        )

            ->where(
                'branch_id',
                session('branch_id')
            )

            ->latest()

            ->paginate(10);

        return Inertia::render(
            'Admin/Products/Index',
            [
                'products' => $products,
            ]
        );

    }

    //create and store
    public function create()
    {

        $categories = Category::where(
            'branch_id',
            session('branch_id')
        )
            ->get();
//  dd(
//         session('branch_id'),
//         $categories
//     );
        return Inertia::render(
            'Admin/Products/Create',
            [
                'categories' => $categories,
            ]
        );

    }

    public function store(Request $request)
    {

        $request->validate([

            'name'          => 'required|string|max:255',

            'category_id'   => 'required|exists:categories,id',

            'sku'           => 'nullable|string|max:255',

            'barcode'       => 'nullable|string|max:255',

            'image'         => 'nullable|image|max:2048',

            'selling_price' => 'required|numeric',

            'cost_price'    => 'nullable|numeric',

            'quantity'      => 'nullable|integer',

            'unit'          => 'nullable|string',

        ]);

        /*
    |--------------------------------------------------------------------------
    | Upload Product Image
    |--------------------------------------------------------------------------
    */

        $imagePath = null;

        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store(
                    'products',
                    'public'
                );

        }

       
        $product = Product::create([
    'branch_id'     => session('branch_id'),
    'category_id'   => $request->category_id,
    'name'          => $request->name,
    'sku'           => $request->sku,
    'barcode'       => $request->barcode,
    'image'         => $imagePath,
    'cost_price'    => $request->cost_price ?? 0,
    'selling_price' => $request->selling_price,
    'quantity'      => $request->quantity ?? 0,
    'unit'          => $request->unit ?? 'pcs',
]);

    // AUDIT LOG
    AuditHelper::log(
        'created',
        'Product',
        $product->id,
        "Created product: {$product->name}",
        null,
        $product->toArray()
    );

    return redirect()
        ->route('admin.products.index')
        ->with(
            'success',
            'Product created successfully'
        );
            

        // return redirect()

        //     ->route(
        //         'admin.products.index'
        //     )

        //     ->with(
        //         'success',
        //         'Product created successfully'
        //     );

    }

//Edit
   public function edit(Product $product)
{

    if ($product->branch_id != session('branch_id')) {
        abort(403);
    }


    $product->load('category');


    $categories = Category::where(
        'branch_id',
        session('branch_id')
    )->get();


    return Inertia::render(
        'Admin/Products/Edit',
        [
            'product' => $product,
            'categories' => $categories
        ]
    );
}
    public function update(Request $request, Product $product)
    {

        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }

        $request->validate([

            'name'          => 'required|string|max:255',

            'category_id'   => 'required|exists:categories,id',

            'sku'           => 'nullable|string|max:255',

            'barcode'       => 'nullable|string|max:255',

            'image'         => 'nullable|image|max:2048',

            'selling_price' => 'required|numeric',

            'cost_price'    => 'nullable|numeric',

            'quantity'      => 'nullable|integer',

            'unit'          => 'nullable|string',

        ]);

        $imagePath = $product->image;

        /*
    |--------------------------------------------------------------------------
    | Replace Product Image
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('image')) {

            // delete old image
            if ($product->image) {
                Storage::disk('public')
                    ->delete($product->image);
            }

            $imagePath = $request
                ->file('image')
                ->store(
                    'products',
                    'public'
                );

        }

        $product->update([

            'category_id'   => $request->category_id ?? $product->category_id,

            'name'          => $request->name ?? $product->name,

            'sku'           => $request->sku ?? $product->sku,

            'barcode'       => $request->barcode ?? $product->barcode,

            'image'         => $imagePath,

            'cost_price'    => $request->cost_price ?? $product->cost_price,

            'selling_price' => $request->selling_price ?? $product->selling_price,

            'quantity'      => $request->quantity ?? $product->quantity,

            'unit'          => $request->unit ?? $product->unit,

        ]);

        return redirect()

            ->route(
                'admin.products.index'
            )

            ->with(
                'success',
                'Product updated successfully'
            );

    }

    public function destroy(Product $product)
    {

        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }

        // delete image first
        if ($product->image) {

            Storage::disk('public')
                ->delete($product->image);

        }

        $product->delete();

        return back()

            ->with(
                'success',
                'Product deleted successfully'
            );

    }

}

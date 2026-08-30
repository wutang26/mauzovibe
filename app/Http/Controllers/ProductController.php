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
    // Display resources
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


    // Create
    public function create()
    {
        $categories = Category::where(
            'branch_id',
            session('branch_id')
        )
            ->get();

        return Inertia::render(
            'Admin/Products/Create',
            [
                'categories' => $categories,
            ]
        );
    }


    // Store
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
        |
        | Images are stored in Laravel Cloud S3.
        | Only the S3 path is saved in the database.
        |
        */

        $imagePath = null;

        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store(
                    'products',
                    's3'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Create Product
        |--------------------------------------------------------------------------
        */

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


        /*
        |--------------------------------------------------------------------------
        | AUDIT LOG
        |--------------------------------------------------------------------------
        */

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
    }


    // Edit
    public function edit(Product $product)
    {
        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }


        $product->load('category');


        $categories = Category::where(
            'branch_id',
            session('branch_id')
        )
            ->get();


        return Inertia::render(
            'Admin/Products/Edit',
            [
                'product'   => $product,
                'categories' => $categories,
            ]
        );
    }


    // Update
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


        /*
        |--------------------------------------------------------------------------
        | Keep Existing Image
        |--------------------------------------------------------------------------
        */

        $imagePath = $product->image;


        /*
        |--------------------------------------------------------------------------
        | Replace Product Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            /*
            |----------------------------------------------------------------------
            | Delete old image from S3
            |----------------------------------------------------------------------
            */

            if ($product->image) {

                Storage::disk('s3')->delete(
                    $product->image
                );
            }


            /*
            |----------------------------------------------------------------------
            | Upload new image to S3
            |----------------------------------------------------------------------
            */

            $imagePath = $request
                ->file('image')
                ->store(
                    'products',
                    's3'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Update Product
        |--------------------------------------------------------------------------
        */

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


    // Destroy
    public function destroy(Product $product)
    {
        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }


        /*
        |--------------------------------------------------------------------------
        | Delete Product Image from S3
        |--------------------------------------------------------------------------
        */

        if ($product->image) {

            Storage::disk('s3')->delete(
                $product->image
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Delete Product
        |--------------------------------------------------------------------------
        */

        $product->delete();


        return back()
            ->with(
                'success',
                'Product deleted successfully'
            );
    }


    // Show Product
    public function show(Product $product)
    {
        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }


        $product->load('category');


        return Inertia::render(
            'Admin/Products/Show',
            [
                'product' => $product,
            ]
        );
    }
}


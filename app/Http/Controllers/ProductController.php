<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Helpers\AuditHelper;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Storage disk used for product images.
     *
     * Laravel Cloud Object Storage / S3
     */
    private string $imageDisk = 's3';


    // ------------------------------------------------------------------------
    // Display Products
    // ------------------------------------------------------------------------

    public function index()
    {
        $products = Product::with('category')
            ->where('branch_id', session('branch_id'))
            ->latest()
            ->paginate(10);

        /*
        |--------------------------------------------------------------------------
        | Add S3 Image URL
        |--------------------------------------------------------------------------
        |
        | Database stores only the S3 path:
        | products/example.jpg
        |
        | React receives:
        | image_url => full S3 URL
        |
        */

        $products->getCollection()->transform(function ($product) {
            $product->image_url = $this->getImageUrl($product->image);

            return $product;
        });

        return Inertia::render(
            'Admin/Products/Index',
            [
                'products' => $products,
            ]
        );
    }


    // ------------------------------------------------------------------------
    // Create
    // ------------------------------------------------------------------------

    public function create()
    {
        $categories = Category::where(
            'branch_id',
            session('branch_id')
        )->get();

        return Inertia::render(
            'Admin/Products/Create',
            [
                'categories' => $categories,
            ]
        );
    }


    // ------------------------------------------------------------------------
    // Store Product
    // ------------------------------------------------------------------------

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


        // --------------------------------------------------------------------
        // Upload Product Image to S3
        // --------------------------------------------------------------------

        $imagePath = null;

        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store(
                    'products',
                    $this->imageDisk
                );
        }


        // --------------------------------------------------------------------
        // Create Product
        // --------------------------------------------------------------------

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


        // --------------------------------------------------------------------
        // Audit Log
        // --------------------------------------------------------------------

        AuditHelper::log(
            'created',
            'Product',
            $product->id,
            "Created product: {$product->name}",
            null,
            $product->toArray()
        );


        // --------------------------------------------------------------------
        // Redirect
        // --------------------------------------------------------------------

        return redirect()
            ->route('admin.products.index')
            ->with(
                'success',
                'Product created successfully'
            );
    }


    // ------------------------------------------------------------------------
    // Edit
    // ------------------------------------------------------------------------

    public function edit(Product $product)
    {
        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }

        $product->load('category');

        /*
        |--------------------------------------------------------------------------
        | Add S3 Image URL
        |--------------------------------------------------------------------------
        */

        $product->image_url = $this->getImageUrl(
            $product->image
        );

        $categories = Category::where(
            'branch_id',
            session('branch_id')
        )->get();

        return Inertia::render(
            'Admin/Products/Edit',
            [
                'product'    => $product,
                'categories' => $categories,
            ]
        );
    }


    // ------------------------------------------------------------------------
    // Update Product
    // ------------------------------------------------------------------------

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


        // Keep existing image
        $imagePath = $product->image;


        // --------------------------------------------------------------------
        // Replace Product Image
        // --------------------------------------------------------------------

        if ($request->hasFile('image')) {

            /*
            |--------------------------------------------------------------------------
            | Delete Old S3 Image
            |--------------------------------------------------------------------------
            */

            if ($product->image) {

                Storage::disk($this->imageDisk)
                    ->delete($product->image);
            }


            /*
            |--------------------------------------------------------------------------
            | Upload New S3 Image
            |--------------------------------------------------------------------------
            */

            $imagePath = $request
                ->file('image')
                ->store(
                    'products',
                    $this->imageDisk
                );
        }


        // --------------------------------------------------------------------
        // Update Product
        // --------------------------------------------------------------------

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


        // --------------------------------------------------------------------
        // Audit Log
        // --------------------------------------------------------------------

        AuditHelper::log(
            'updated',
            'Product',
            $product->id,
            "Updated product: {$product->name}",
            null,
            $product->fresh()->toArray()
        );


        // --------------------------------------------------------------------
        // Redirect
        // --------------------------------------------------------------------

        return redirect()
            ->route('admin.products.index')
            ->with(
                'success',
                'Product updated successfully'
            );
    }


    // ------------------------------------------------------------------------
    // Delete Product
    // ------------------------------------------------------------------------

    public function destroy(Product $product)
    {
        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }


        // --------------------------------------------------------------------
        // Delete Image from S3
        // --------------------------------------------------------------------

        if ($product->image) {

            Storage::disk($this->imageDisk)
                ->delete($product->image);
        }


        // --------------------------------------------------------------------
        // Delete Product
        // --------------------------------------------------------------------

        $product->delete();

        return back()
            ->with(
                'success',
                'Product deleted successfully'
            );
    }


    // ------------------------------------------------------------------------
    // Show Product
    // ------------------------------------------------------------------------

    public function show(Product $product)
    {
        if ($product->branch_id != session('branch_id')) {
            abort(403);
        }

        $product->load('category');

        /*
        |--------------------------------------------------------------------------
        | Add S3 Image URL
        |--------------------------------------------------------------------------
        */

        $product->image_url = $this->getImageUrl(
            $product->image
        );

        return Inertia::render(
            'Admin/Products/Show',
            [
                'product' => $product,
            ]
        );
    }


    // ------------------------------------------------------------------------
    // Generate S3 Image URL
    // ------------------------------------------------------------------------

    private function getImageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        try {
            return Storage::disk($this->imageDisk)->url($path);
        } catch (\Throwable $e) {
            return null;
        }
    }
}


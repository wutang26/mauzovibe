<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Branch;
use Inertia\Inertia;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $branchId = session('branch_id');

        // $categories = Category::where(
        //     'branch_id',
        //     $branchId
        // )
        // ->latest()
        // ->get();

          $categories = Category::where(
            'branch_id',
            $branchId)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render(
            'Admin/Categories/Index',
            [
                'categories'=>$categories
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'Admin/Categories/Create'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          $request->validate([

            'name'=>'required|string|max:255',

            'description'=>'nullable'

        ]);

        Category::create([

            'branch_id'=>session('branch_id'),

            'name'=>$request->name,

            'description'=>$request->description

        ]);

        return redirect()
            ->route('admin.categories.index')
            ->with(
                'success',
                'Category created successfully'
            );
    }

    /**
     * Display the specified resource.
     */
  public function show(Category $category)
{
    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    // Security: category must belong to active branch
    if ($category->branch_id != $branchId) {
        abort(403, 'This category does not belong to the active branch.');
    }

    // Load products belonging to this category
    $category->load([
        'products' => function ($query) use ($branchId) {
            $query->where('branch_id', $branchId)
                ->latest();
        }
    ]);

    return Inertia::render(
        'Admin/Categories/Show',
        [
            'category' => $category,
        ]
    );
}


    /**
     * Show the form for editing the specified resource.
     */
        public function edit(Category $category)
    {

        return Inertia::render(
            'Admin/Categories/Edit',
            [
                'category'=>$category
            ]
        );

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
{

    $request->validate([

        'name'=>'required|string|max:255',

        'description'=>'nullable'

    ]);



    $category->update([

        'name'=>$request->name,

        'description'=>$request->description

    ]);



        return redirect()

            ->route('admin.categories.index')

            ->with(
                'success',
                'Category updated successfully'
            );

    }

    /**
     * Remove the specified resource from storage.
     */
    
        public function destroy(Category $category)
    {

        $category->delete();


        return back()

            ->with(
                'success',
                'Category deleted successfully'
            );

    }

    /**
 * Display the specified resource.
 */

}

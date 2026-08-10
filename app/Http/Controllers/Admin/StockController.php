<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{

    public function index()
    {

        $stocks = StockMovement::with([
            'product',
            'user',
        ])
            ->where(
                'branch_id',
                session('branch_id')
            )
            ->where(
                'type',
                'IN'
            )
            ->latest()
            ->paginate(10);

        return Inertia::render(
            'Admin/Stockin/Index',
            [
                'stocks' => $stocks,
            ]
        );

    }

    public function create()
    {

        $products = Product::where(
            'branch_id',
            session('branch_id')
        )
            ->latest()
            ->paginate(8);

        return Inertia::render(
            'Admin/Stockin/Create',
            [
                'products' => $products,
            ]
        );

    }

    public function store(Request $request)
    {

        $request->validate([

            'product_id' => 'required',
            'quantity'   => 'required|integer|min:1',
            'reference'  => 'nullable',
            'note'       => 'nullable',

        ]);

        $product = Product::where(
            'branch_id',
            session('branch_id')
        )
            ->findOrFail(
                $request->product_id
            );

/*
 Increase Stock
*/

        $product->increment(
            'quantity',
            $request->quantity
        );

/*
 Save Stock History
*/

        StockMovement::create([

            'product_id' => $product->id,

            'branch_id'  => session('branch_id'),

            'type'       => 'IN',

            'quantity'   => $request->quantity,

            'reference'  => $request->reference,

            'note'       => $request->note,

            'user_id'    => auth()->id(),

        ]);

        return redirect()
            ->route('admin.stockin.index')
            ->with(
                'success',
                'Stock added successfully'
            );

    }

    /*
|--------------------------------------------------------------------------
| Show Stock In
|--------------------------------------------------------------------------
*/

    public function show(StockMovement $stock)
    {

        $stock->load([
            'product',
            'user',
        ]);

        return Inertia::render(
            'Admin/Stockin/Show',
            [
                'stock' => $stock,
            ]
        );

    }

/*
|--------------------------------------------------------------------------
| Edit Stock In
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| Edit Stock In
|--------------------------------------------------------------------------
*/

    public function edit(StockMovement $stock)
    {

        // Security: only current branch stock
        $stock = StockMovement::where(
            'branch_id',
            session('branch_id')
        )
            ->with('product')
            ->findOrFail($stock->id);

        $products = Product::where(
            'branch_id',
            session('branch_id')
        )
            ->latest()
            ->paginate(8);

        return Inertia::render(
            'Admin/Stockin/Edit',
            [

                'stock'    => $stock,

                'products' => $products,

            ]
        );

    }

/*
|--------------------------------------------------------------------------
| Update Stock In
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Update Stock In
|--------------------------------------------------------------------------
*/

    public function update(Request $request, StockMovement $stock)
    {

        $request->validate([

            'product_id' => 'required',

            'quantity'   => 'required|integer|min:1',

            'reference'  => 'nullable',

            'note'       => 'nullable',

        ]);

        /*
    Get old stock record
    */

        $stock = StockMovement::where(
            'branch_id',
            session('branch_id')
        )
            ->findOrFail($stock->id);

        /*
    Remove old quantity
    */

        $oldProduct = Product::find(
            $stock->product_id
        );

        if ($oldProduct) {

            $oldProduct->decrement(

                'quantity',

                $stock->quantity

            );

        }

        /*
    Add new quantity
    */

        $newProduct = Product::where(
            'branch_id',
            session('branch_id')
        )
            ->findOrFail(
                $request->product_id
            );

        $newProduct->increment(

            'quantity',

            $request->quantity

        );

        /*
    Update Stock Movement
    */

        $stock->update([

            'product_id' => $request->product_id,

            'quantity'   => $request->quantity,

            'reference'  => $request->reference,

            'note'       => $request->note,

        ]);

        return redirect()

            ->route('admin.stockin.index')

            ->with(

                'success',

                'Stock updated successfully'

            );

    }

/*
|--------------------------------------------------------------------------
| Delete Stock In
|--------------------------------------------------------------------------
*/

    public function destroy(StockMovement $stock)
    {

        /*
       Reverse quantity before delete
    */

        $product = Product::find(
            $stock->product_id
        );

        if ($product) {

            $product->decrement(
                'quantity',
                $stock->quantity
            );

        }

        $stock->delete();

        return redirect()

            ->route('admin.stockin.index')

            ->with(
                'success',
                'Stock deleted successfully'
            );

    }

    //Stock Index
    /*
|--------------------------------------------------------------------------
| Stock Out Index
|--------------------------------------------------------------------------
*/

public function stockOutIndex()
{


    $stocks = StockMovement::with([
        'product',
        'user',
    ])
    ->where(
        'branch_id',
        session('branch_id')
    )
    ->where(
        'type',
        'OUT'
    )
    ->latest()
    ->paginate(10);



    return Inertia::render(
        'Admin/Stockout/Index',
        [
            'stocks'=>$stocks
        ]
    );


}

//Stock Out Create
    public function stockOutCreate()
{


$products = Product::where(
    'branch_id',
    session('branch_id')
)
->where(
    'quantity',
    '>',
    0
)
->latest()
->paginate(8);



return Inertia::render(
    'Admin/Stockout/Create',
    [
        'products'=>$products
    ]
);


}

/*
|--------------------------------------------------------------------------
| Save Stock Out
|--------------------------------------------------------------------------
*/

public function stockOutStore(Request $request)
{


    $request->validate([

        'product_id' => 'required',

        'quantity' => 'required|integer|min:1',

        'reference' => 'nullable',

        'note' => 'nullable',

    ]);




    // Find product in current branch

    $product = Product::where(
        'branch_id',
        session('branch_id')
    )
    ->findOrFail(
        $request->product_id
    );





    /*
    |--------------------------------------------------------------------------
    | Check Available Stock
    |--------------------------------------------------------------------------
    */


    if($product->quantity < $request->quantity)
    {


        return back()->withErrors([

            'quantity' =>
            'Not enough stock available. Current stock is '
            .$product->quantity

        ]);


    }






    /*
    |--------------------------------------------------------------------------
    | Reduce Product Quantity
    |--------------------------------------------------------------------------
    */


    $product->decrement(

        'quantity',

        $request->quantity

    );







    /*
    |--------------------------------------------------------------------------
    | Save Stock Movement History
    |--------------------------------------------------------------------------
    */


    StockMovement::create([


        'product_id' => $product->id,


        'branch_id' => session('branch_id'),


        'type' => 'OUT',


        'quantity' => $request->quantity,


        'reference' => $request->reference,


        'note' => $request->note,


        'user_id' => auth()->id(),


    ]);






    return redirect()

        ->route(
            'admin.stockout.index'
        )

        ->with(

            'success',

            'Stock removed successfully'

        );

}

/*
|--------------------------------------------------------------------------
| Delete Stock Out
|--------------------------------------------------------------------------
*/

public function stockOutDestroy(StockMovement $stock)
{


    $stock = StockMovement::where(
        'branch_id',
        session('branch_id')
    )
    ->where(
        'type',
        'OUT'
    )
    ->findOrFail($stock->id);



    $product = Product::find(
        $stock->product_id
    );


    if($product)
    {

        // Return stock back

        $product->increment(
            'quantity',
            $stock->quantity
        );

    }



    $stock->delete();



    return redirect()

        ->route(
            'admin.stockout.index'
        )

        ->with(
            'success',
            'Stock Out deleted and quantity restored'
        );


}

/*
|--------------------------------------------------------------------------
| Show Stock Out
|--------------------------------------------------------------------------
*/

public function stockOutShow(StockMovement $stock)
{


    $stock = StockMovement::where(
        'branch_id',
        session('branch_id')
    )
    ->where(
        'type',
        'OUT'
    )
    ->with([
        'product',
        'user'
    ])
    ->findOrFail(
        $stock->id
    );


    return Inertia::render(
        'Admin/Stockout/Show',
        [
            'stock'=>$stock
        ]
    );


}
}

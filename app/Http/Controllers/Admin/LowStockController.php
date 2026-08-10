<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;


class LowStockController extends Controller
{


    public function index()
    {


        $products = Product::where(
            'branch_id',
            session('branch_id')
        )
        ->whereColumn(
            'quantity',
            '<=',
            'low_stock_limit'
        )
        ->latest()
        ->paginate(10);



        return Inertia::render(
            'Admin/Lowstock/Index',
            [

                'products'=>$products

            ]
        );


    }


}
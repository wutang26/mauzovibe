<?php

namespace App\Http\Controllers;

use App\Helpers\BranchHelper;
use App\Models\Sale;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $branch = BranchHelper::current();
        $branchId = BranchHelper::id();

        /*
        |--------------------------------------------------------------------------
        | TODAY
        |--------------------------------------------------------------------------
        */

        $todaySales = Sale::where('branch_id', $branchId)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->sum('total');


        $todayTransactions = Sale::where('branch_id', $branchId)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->count();


        /*
        |--------------------------------------------------------------------------
        | TODAY PROFIT
        |--------------------------------------------------------------------------
        |
        | Profit = selling price - cost price
        |
        | SaleItem -> Product
        |
        */

        $todayProfit = DB::table('sale_items')
            ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
            ->join('products', 'products.id', '=', 'sale_items.product_id')
            ->where('sales.branch_id', $branchId)
            ->whereDate('sales.created_at', today())
            ->where('sales.status', 'completed')
            ->selectRaw(
                'COALESCE(SUM(
                    (sale_items.unit_price - products.cost_price)
                    * sale_items.quantity
                ), 0) as profit'
            )
            ->value('profit');


        /*
        |--------------------------------------------------------------------------
        | PRODUCTS
        |--------------------------------------------------------------------------
        */

        $totalProducts = Product::where('branch_id', $branchId)
            ->count();


        /*
        |--------------------------------------------------------------------------
        | LOW STOCK
        |--------------------------------------------------------------------------
        |
        | Kwa sasa tunatumia quantity <= 5.
        | Tukifika kwenye minimum_stock/reorder_level field,
        | tutabadilisha hapa.
        |
        */

        $lowStock = Product::where('branch_id', $branchId)
            ->where('quantity', '<=', 5)
            ->count();


        /*
        |--------------------------------------------------------------------------
        | CUSTOMERS
        |--------------------------------------------------------------------------
        */

        // $totalCustomers = Customer::where('branch_id', $branchId)
        //     ->count();


        /*
        |--------------------------------------------------------------------------
        | CASH / CREDIT
        |--------------------------------------------------------------------------
        */

        $cashInHand = Sale::where('branch_id', $branchId)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->where('payment_method', 'cash')
            ->sum('paid_amount');


        $creditSales = Sale::where('branch_id', $branchId)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->where('payment_method', 'credit')
            ->sum('total');


        /*
        |--------------------------------------------------------------------------
        | MONTH PROFIT
        |--------------------------------------------------------------------------
        */

        $monthProfit = DB::table('sale_items')
            ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
            ->join('products', 'products.id', '=', 'sale_items.product_id')
            ->where('sales.branch_id', $branchId)
            ->whereMonth('sales.created_at', now()->month)
            ->whereYear('sales.created_at', now()->year)
            ->where('sales.status', 'completed')
            ->selectRaw(
                'COALESCE(SUM(
                    (sale_items.unit_price - products.cost_price)
                    * sale_items.quantity
                ), 0) as profit'
            )
            ->value('profit');


        /*
        |--------------------------------------------------------------------------
        | SALES TREND - LAST 7 DAYS
        |--------------------------------------------------------------------------
        */

        $salesTrend = Sale::where('branch_id', $branchId)
            ->where('status', 'completed')
            ->whereDate(
                'created_at',
                '>=',
                now()->subDays(6)->toDateString()
            )
            ->selectRaw('DATE(created_at) as date')
            ->selectRaw('SUM(total) as total')
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->map(function ($sale) {

                return [
                    'date' => $sale->date,
                    'label' => date(
                        'D',
                        strtotime($sale->date)
                    ),
                    'total' => (float) $sale->total,
                ];

            })
            ->values();


        /*
        |--------------------------------------------------------------------------
        | STOCK ALERTS
        |--------------------------------------------------------------------------
        */

        $stockAlerts = Product::where('branch_id', $branchId)
            ->where('quantity', '<=', 5)
            ->orderBy('quantity')
            ->limit(5)
            ->get([
                'id',
                'name',
                'sku',
                'quantity',
                'image',
            ])
            ->map(function ($product) {

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'quantity' => (float) $product->quantity,
                    'image' => $product->image,
                    'minimum_stock' => 5,
                ];

            })
            ->values();


        /*
        |--------------------------------------------------------------------------
        | RECENT SALES
        |--------------------------------------------------------------------------
        */

        $recentSales = Sale::where('branch_id', $branchId)
            ->where('status', 'completed')
            ->with([
                'items.product',
            ])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($sale) {

                $firstItem = $sale->items->first();

                return [
                    'id' => $sale->id,
                    'invoice_number' => $sale->invoice_number,

                    'product_name' =>
                        $firstItem?->product?->name ?? 'Sale',

                    'quantity' =>
                        $firstItem?->quantity ?? 0,

                    'unit_price' =>
                        $firstItem?->unit_price ?? 0,

                    'total' =>
                        $sale->total,

                    'payment_method' =>
                        $sale->payment_method,

                    'created_at' =>
                        $sale->created_at,
                ];

            })
            ->values();


        /*
        |--------------------------------------------------------------------------
        | DASHBOARD RESPONSE
        |--------------------------------------------------------------------------
        */

        return Inertia::render('Dashboard', [

            'branch' => $branch,

            'stats' => [

                'todaySales' =>
                    (float) $todaySales,

                'todayProfit' =>
                    (float) $todayProfit,

                'totalProducts' =>
                    $totalProducts,

                'lowStock' =>
                    $lowStock,

                // 'totalCustomers' =>
                //     $totalCustomers,

                'todayTransactions' =>
                    $todayTransactions,

                'cashInHand' =>
                    (float) $cashInHand,

                'creditSales' =>
                    (float) $creditSales,

                'monthProfit' =>
                    (float) $monthProfit,

            ],

            'salesTrend' =>
                $salesTrend,

            'stockAlerts' =>
                $stockAlerts,

            'recentSales' =>
                $recentSales,

            'debtors' => [

                // 'totalCustomers' => 0,
                'totalDebt' => 0,
                'current' => 0,
                'overdue' => 0,
                'critical' => 0,

            ],

            'quickStats' => [

                'totalProducts' =>
                    $totalProducts,

                // 'totalCustomers' =>
                //     $totalCustomers,

                'todayTransactions' =>
                    $todayTransactions,

                'cashInHand' =>
                    (float) $cashInHand,

                'creditSales' =>
                    (float) $creditSales,

                'monthProfit' =>
                    (float) $monthProfit,

            ],

        ]);
    }
}
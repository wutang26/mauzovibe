<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Daily Sales Report
     */
   public function daily(Request $request)
{
    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Report Date
    |--------------------------------------------------------------------------
    */

    $date = $request->input(
        'date',
        now()->toDateString()
    );

    /*
    |--------------------------------------------------------------------------
    | Get Completed Sales
    |--------------------------------------------------------------------------
    */

    $sales = Sale::with([
        'user:id,name',
        'customer:id,name',
        'items.product:id,name,sku',
    ])
        ->where('branch_id', $branchId)
        ->where('status', 'completed')
        ->whereDate('created_at', $date)
        ->latest()
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Sales Summary
    |--------------------------------------------------------------------------
    */

    // Total before discounts
    $grossRevenue = $sales->sum('subtotal');

    // Total discounts given
    $totalDiscount = $sales->sum('discount');

    // Actual sales revenue after discounts
    $netSales = $sales->sum('total');

    // Total amount actually collected
        $totalPaid = $sales->sum(function ($sale) {
        return max(
            0,
            (float) $sale->paid_amount - (float) $sale->change_amount
        );
    });

    //Change Amount
    $totalChange = $sales->sum('change_amount');

    // Amount still outstanding
    $totalOutstanding = max(
        0,
        $netSales - $totalPaid
    );

    // Number of completed transactions
    $totalTransactions = $sales->count();

    /*
    |--------------------------------------------------------------------------
    | Cost Of Goods Sold & Gross Profit
    |--------------------------------------------------------------------------
    */

    $totalCost = 0;

    foreach ($sales as $sale) {
        foreach ($sale->items as $item) {

            $quantity = (float) $item->quantity;
            $costPrice = (float) $item->cost_price;

            $totalCost += $quantity * $costPrice;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Gross Profit
    |--------------------------------------------------------------------------
    |
    | Gross Profit = Net Sales - Cost Of Goods Sold
    |
    */

    $totalProfit = $netSales - $totalCost;

    /*
    |--------------------------------------------------------------------------
    | Gross Profit Margin
    |--------------------------------------------------------------------------
    */

    $profitMargin = $netSales > 0
        ? ($totalProfit / $netSales) * 100
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Total Items Sold
    |--------------------------------------------------------------------------
    */

    $totalItemsSold = 0;

    foreach ($sales as $sale) {
        $totalItemsSold += $sale->items->sum('quantity');
    }

    /*
    |--------------------------------------------------------------------------
    | Payment Method Summary
    |--------------------------------------------------------------------------
    */

        $cashSales = $sales
        ->where('payment_method', 'cash')
        ->sum(function ($sale) {
            return max(
                0,
                (float) $sale->paid_amount - (float) $sale->change_amount
            );
        });

    $mobileMoneySales = $sales
        ->where('payment_method', 'mobile_money')
        ->sum(function ($sale) {
            return max(
                0,
                (float) $sale->paid_amount - (float) $sale->change_amount
            );
        });

    $bankSales = $sales
        ->where('payment_method', 'bank')
        ->sum(function ($sale) {
            return max(
                0,
                (float) $sale->paid_amount - (float) $sale->change_amount
            );
        });

    $creditSales = $sales
        ->where('payment_method', 'credit')
        ->sum(function ($sale) {
            return max(
                0,
                (float) $sale->paid_amount - (float) $sale->change_amount
            );
        });

    /*
    |--------------------------------------------------------------------------
    | Sales List
    |--------------------------------------------------------------------------
    */

    $salesData = $sales->map(function ($sale) {

        return [
            'id' => $sale->id,

            'invoice_number' => $sale->invoice_number,

            'time' => $sale->created_at?->format('H:i'),

            'customer' => $sale->customer?->name
                ?? 'Walk-in Customer',

            'cashier' => $sale->user?->name
                ?? 'Unknown',

            'subtotal' => (float) $sale->subtotal,

            'discount' => (float) $sale->discount,

            'total' => (float) $sale->total,

            'payment_method' => $sale->payment_method,

            'payment_status' => $sale->payment_status,

            'paid_amount' => (float) $sale->paid_amount,

            'outstanding' => max(
                0,
                (float) $sale->total - (float) $sale->paid_amount
            ),

            'change_amount' => (float) $sale->change_amount,

            'items_count' => $sale->items->sum('quantity'),
        ];
    })->values();

    /*
    |--------------------------------------------------------------------------
    | Return Report
    |--------------------------------------------------------------------------
    */

    return Inertia::render('Admin/Reports/Daily', [

        'reportDate' => $date,

        'summary' => [

            'grossRevenue' => round(
                $grossRevenue,
                2
            ),

            'totalDiscount' => round(
                $totalDiscount,
                2
            ),

            'netSales' => round(
                $netSales,
                2
            ),

            'totalCost' => round(
                $totalCost,
                2
            ),

            'totalProfit' => round(
                $totalProfit,
                2
            ),

            'profitMargin' => round(
                $profitMargin,
                2
            ),

            'totalPaid' => round(
                $totalPaid,
                2
                            ),
                            'totalChange' => round(
                    $totalChange,
                    2
                ),

            'totalOutstanding' => round(
                $totalOutstanding,
                2
            ),

            'totalTransactions' => $totalTransactions,

            'totalItemsSold' => round(
                $totalItemsSold,
                2
            ),
        ],

        'paymentMethods' => [

            'cash' => round(
                $cashSales,
                2
            ),

            'mobileMoney' => round(
                $mobileMoneySales,
                2
            ),

            'bank' => round(
                $bankSales,
                2
            ),

            'credit' => round(
                $creditSales,
                2
            ),
        ],

        'sales' => $salesData,
    ]);
}

    /**
 * Weekly Sales Report
 */
public function weekly(Request $request)
{
    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Selected Date
    |--------------------------------------------------------------------------
    */

    $selectedDate = $request->input(
        'date',
        now()->toDateString()
    );

    /*
    |--------------------------------------------------------------------------
    | Calculate Week
    |--------------------------------------------------------------------------
    | Monday - Sunday
    |--------------------------------------------------------------------------
    */

    $date = \Carbon\Carbon::parse($selectedDate);

    $startDate = $date->copy()->startOfWeek(
        \Carbon\Carbon::MONDAY
    );

    $endDate = $date->copy()->endOfWeek(
        \Carbon\Carbon::SUNDAY
    );

    /*
    |--------------------------------------------------------------------------
    | Get Completed Sales
    |--------------------------------------------------------------------------
    */

    $sales = Sale::with([
        'user:id,name',
        'customer:id,name',
        'items.product:id,name,sku',
    ])
        ->where('branch_id', $branchId)
        ->where('status', 'completed')
        ->whereBetween('created_at', [
            $startDate->copy()->startOfDay(),
            $endDate->copy()->endOfDay(),
        ])
        ->latest()
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Financial Summary
    |--------------------------------------------------------------------------
    */

    // Sales before discounts
    $grossRevenue = $sales->sum('subtotal');

    // Total discounts
    $totalDiscount = $sales->sum('discount');

    // Sales after discounts
    $netSales = $sales->sum('total');

    /*
    |--------------------------------------------------------------------------
    | Amount Collected
    |--------------------------------------------------------------------------
    */

    $totalPaid = $sales->sum(function ($sale) {
        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Change Given
    |--------------------------------------------------------------------------
    */

    $totalChange = $sales->sum('change_amount');

    /*
    |--------------------------------------------------------------------------
    | Outstanding
    |--------------------------------------------------------------------------
    */

    $totalOutstanding = max(
        0,
        $netSales - $totalPaid
    );

    /*
    |--------------------------------------------------------------------------
    | Transactions
    |--------------------------------------------------------------------------
    */

    $totalTransactions = $sales->count();

    /*
    |--------------------------------------------------------------------------
    | Cost Of Goods Sold
    |--------------------------------------------------------------------------
    */

    $totalCost = 0;

    foreach ($sales as $sale) {
        foreach ($sale->items as $item) {

            $quantity = (float) $item->quantity;
            $costPrice = (float) $item->cost_price;

            $totalCost += $quantity * $costPrice;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Gross Profit
    |--------------------------------------------------------------------------
    */

    $totalProfit = $netSales - $totalCost;

    /*
    |--------------------------------------------------------------------------
    | Profit Margin
    |--------------------------------------------------------------------------
    */

    $profitMargin = $netSales > 0
        ? ($totalProfit / $netSales) * 100
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Items Sold
    |--------------------------------------------------------------------------
    */

    $totalItemsSold = 0;

    foreach ($sales as $sale) {
        $totalItemsSold += $sale->items->sum('quantity');
    }

    /*
    |--------------------------------------------------------------------------
    | Payment Methods
    |--------------------------------------------------------------------------
    */

    $paymentAmount = function ($sale) {
        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    };

    $cashSales = $sales
        ->where('payment_method', 'cash')
        ->sum($paymentAmount);

    $mobileMoneySales = $sales
        ->whereIn('payment_method', [
            'mobile_money',
            'mobileMoney',
        ])
        ->sum($paymentAmount);

    $bankSales = $sales
        ->where('payment_method', 'bank')
        ->sum($paymentAmount);

    $creditSales = $sales
        ->where('payment_method', 'credit')
        ->sum($paymentAmount);

    /*
    |--------------------------------------------------------------------------
    | Daily Breakdown
    |--------------------------------------------------------------------------
    */

    $dailyBreakdown = collect();

    for ($i = 0; $i < 7; $i++) {

        $day = $startDate->copy()->addDays($i);

        $daySales = $sales->filter(function ($sale) use ($day) {
            return $sale->created_at->isSameDay($day);
        });

        $dayRevenue = $daySales->sum('subtotal');
        $dayDiscount = $daySales->sum('discount');
        $dayNetSales = $daySales->sum('total');

        $dayPaid = $daySales->sum(function ($sale) {
            return max(
                0,
                (float) $sale->paid_amount -
                (float) $sale->change_amount
            );
        });

        $dayChange = $daySales->sum('change_amount');

        $dayCost = 0;

        foreach ($daySales as $sale) {
            foreach ($sale->items as $item) {

                $dayCost +=
                    (float) $item->quantity *
                    (float) $item->cost_price;
            }
        }

        $dayProfit = $dayNetSales - $dayCost;

        $dailyBreakdown->push([
            'date' => $day->toDateString(),

            'day' => $day->format('l'),

            'shortDay' => $day->format('D'),

            'transactions' => $daySales->count(),

            'grossRevenue' => round(
                $dayRevenue,
                2
            ),

            'discount' => round(
                $dayDiscount,
                2
            ),

            'netSales' => round(
                $dayNetSales,
                2
            ),

            'cost' => round(
                $dayCost,
                2
            ),

            'profit' => round(
                $dayProfit,
                2
            ),

            'paid' => round(
                $dayPaid,
                2
            ),

            'change' => round(
                $dayChange,
                2
            ),

            'items' => $daySales->sum(
                fn ($sale) =>
                    $sale->items->sum('quantity')
            ),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Sales Data
    |--------------------------------------------------------------------------
    */

    $salesData = $sales->map(function ($sale) {

        return [
            'id' => $sale->id,

            'invoice_number' => $sale->invoice_number,

            'date' => $sale->created_at?->format('d M Y'),

            'time' => $sale->created_at?->format('H:i'),

            'customer' => $sale->customer?->name
                ?? 'Walk-in Customer',

            'cashier' => $sale->user?->name
                ?? 'Unknown',

            'subtotal' => (float) $sale->subtotal,

            'discount' => (float) $sale->discount,

            'total' => (float) $sale->total,

            'payment_method' => $sale->payment_method,

            'payment_status' => $sale->payment_status,

            'paid_amount' => (float) $sale->paid_amount,

            'outstanding' => max(
                0,
                (float) $sale->total -
                (float) $sale->paid_amount
            ),

            'change_amount' => (float) $sale->change_amount,

            'items_count' => $sale->items->sum(
                'quantity'
            ),
        ];
    })->values();

    /*
    |--------------------------------------------------------------------------
    | Return Weekly Report
    |--------------------------------------------------------------------------
    */

  
return Inertia::render(
    'Admin/Reports/Weekly',
    [
        /*
        |--------------------------------------------------------------------------
        | Week Information
        |--------------------------------------------------------------------------
        */

        'weekStart' => $startDate->toDateString(),

        'weekEnd' => $endDate->toDateString(),

        /*
        |--------------------------------------------------------------------------
        | Summary
        |--------------------------------------------------------------------------
        */

        'summary' => [

            'grossRevenue' => round(
                $grossRevenue,
                2
            ),

            'totalDiscount' => round(
                $totalDiscount,
                2
            ),

            'netSales' => round(
                $netSales,
                2
            ),

            'totalCost' => round(
                $totalCost,
                2
            ),

            'totalProfit' => round(
                $totalProfit,
                2
            ),

            'profitMargin' => round(
                $profitMargin,
                2
            ),

            'totalPaid' => round(
                $totalPaid,
                2
            ),

            'totalOutstanding' => round(
                $totalOutstanding,
                2
            ),

            'totalChange' => round(
                $totalChange,
                2
            ),

            'totalTransactions' => $totalTransactions,

            'totalItemsSold' => round(
                $totalItemsSold,
                2
            ),
        ],

        /*
        |--------------------------------------------------------------------------
        | Payment Methods
        |--------------------------------------------------------------------------
        */

        'paymentMethods' => [

            'cash' => round(
                $cashSales,
                2
            ),

            'mobileMoney' => round(
                $mobileMoneySales,
                2
            ),

            'bank' => round(
                $bankSales,
                2
            ),

            'credit' => round(
                $creditSales,
                2
            ),
        ],

        /*
        |--------------------------------------------------------------------------
        | Daily Sales
        |--------------------------------------------------------------------------
        */

        'dailySales' => $dailyBreakdown->map(function ($day) {

            $revenue = (float) $day['netSales'];
            $profit = (float) $day['profit'];

            $margin = $revenue > 0
                ? ($profit / $revenue) * 100
                : 0;

            return [

                'date' => $day['date'],

                'day' => $day['day'],

                'shortDay' => $day['shortDay'],

                'transactions' => $day['transactions'],

                'itemsSold' => $day['items'],

                'revenue' => round(
                    $revenue,
                    2
                ),

                'profit' => round(
                    $profit,
                    2
                ),

                'margin' => round(
                    $margin,
                    2
                ),
            ];

        })->values(),

        /*
        |--------------------------------------------------------------------------
        | Sales
        |--------------------------------------------------------------------------
        */

        'sales' => $salesData,
    ]
);


}

/**
 * Monthly Sales Report
 */
public function monthly(Request $request)
{
    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Selected Date
    |--------------------------------------------------------------------------
    */

    $selectedDate = $request->input(
        'date',
        now()->toDateString()
    );

    /*
    |--------------------------------------------------------------------------
    | Calculate Month
    |--------------------------------------------------------------------------
    */

    $date = Carbon::parse($selectedDate);

    $startDate = $date->copy()->startOfMonth();
    $endDate = $date->copy()->endOfMonth();

    /*
    |--------------------------------------------------------------------------
    | Get Completed Sales
    |--------------------------------------------------------------------------
    */

    $sales = Sale::with([
        'user:id,name',
        'customer:id,name',
        'items.product:id,name,sku',
    ])
        ->where('branch_id', $branchId)
        ->where('status', 'completed')
        ->whereBetween('created_at', [
            $startDate->copy()->startOfDay(),
            $endDate->copy()->endOfDay(),
        ])
        ->latest()
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Financial Summary
    |--------------------------------------------------------------------------
    */

    // Sales before discounts
    $grossRevenue = $sales->sum('subtotal');

    // Total discounts
    $totalDiscount = $sales->sum('discount');

    // Sales after discounts
    $netSales = $sales->sum('total');

    /*
    |--------------------------------------------------------------------------
    | Amount Collected
    |--------------------------------------------------------------------------
    */

    $totalPaid = $sales->sum(function ($sale) {
        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Change Given
    |--------------------------------------------------------------------------
    */

    $totalChange = $sales->sum('change_amount');

    /*
    |--------------------------------------------------------------------------
    | Outstanding
    |--------------------------------------------------------------------------
    */

    $totalOutstanding = max(
        0,
        $netSales - $totalPaid
    );

    /*
    |--------------------------------------------------------------------------
    | Transactions
    |--------------------------------------------------------------------------
    */

    $totalTransactions = $sales->count();

    /*
    |--------------------------------------------------------------------------
    | Cost Of Goods Sold
    |--------------------------------------------------------------------------
    */

    $totalCost = 0;

    foreach ($sales as $sale) {
        foreach ($sale->items as $item) {

            $quantity = (float) $item->quantity;
            $costPrice = (float) $item->cost_price;

            $totalCost += $quantity * $costPrice;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Gross Profit
    |--------------------------------------------------------------------------
    */

    $totalProfit = $netSales - $totalCost;

    /*
    |--------------------------------------------------------------------------
    | Profit Margin
    |--------------------------------------------------------------------------
    */

    $profitMargin = $netSales > 0
        ? ($totalProfit / $netSales) * 100
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Total Items Sold
    |--------------------------------------------------------------------------
    */

    $totalItemsSold = 0;

    foreach ($sales as $sale) {
        $totalItemsSold += $sale->items->sum('quantity');
    }

    /*
    |--------------------------------------------------------------------------
    | Payment Methods
    |--------------------------------------------------------------------------
    */

    $paymentAmount = function ($sale) {
        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    };

    $cashSales = $sales
        ->where('payment_method', 'cash')
        ->sum($paymentAmount);

    $mobileMoneySales = $sales
        ->whereIn('payment_method', [
            'mobile_money',
            'mobileMoney',
        ])
        ->sum($paymentAmount);

    $bankSales = $sales
        ->where('payment_method', 'bank')
        ->sum($paymentAmount);

    $creditSales = $sales
        ->where('payment_method', 'credit')
        ->sum($paymentAmount);

    /*
    |--------------------------------------------------------------------------
    | Daily Breakdown
    |--------------------------------------------------------------------------
    */

    $dailyBreakdown = collect();

    $daysInMonth = $startDate->daysInMonth;

    for ($i = 0; $i < $daysInMonth; $i++) {

        $day = $startDate->copy()->addDays($i);

        $daySales = $sales->filter(function ($sale) use ($day) {
            return $sale->created_at->isSameDay($day);
        });

        $dayRevenue = $daySales->sum('subtotal');

        $dayDiscount = $daySales->sum('discount');

        $dayNetSales = $daySales->sum('total');

        /*
        |----------------------------------------------------------------------
        | Daily Paid
        |----------------------------------------------------------------------
        */

        $dayPaid = $daySales->sum(function ($sale) {
            return max(
                0,
                (float) $sale->paid_amount -
                (float) $sale->change_amount
            );
        });

        /*
        |----------------------------------------------------------------------
        | Daily Change
        |----------------------------------------------------------------------
        */

        $dayChange = $daySales->sum('change_amount');

        /*
        |----------------------------------------------------------------------
        | Daily Cost
        |----------------------------------------------------------------------
        */

        $dayCost = 0;

        foreach ($daySales as $sale) {

            foreach ($sale->items as $item) {

                $dayCost +=
                    (float) $item->quantity *
                    (float) $item->cost_price;
            }
        }

        /*
        |----------------------------------------------------------------------
        | Daily Profit
        |----------------------------------------------------------------------
        */

        $dayProfit = $dayNetSales - $dayCost;

        /*
        |----------------------------------------------------------------------
        | Daily Items
        |----------------------------------------------------------------------
        */

        $dayItems = $daySales->sum(
            fn ($sale) =>
                $sale->items->sum('quantity')
        );

        /*
        |----------------------------------------------------------------------
        | Daily Margin
        |----------------------------------------------------------------------
        */

        $dayMargin = $dayNetSales > 0
            ? ($dayProfit / $dayNetSales) * 100
            : 0;

        /*
        |----------------------------------------------------------------------
        | Push Daily Data
        |----------------------------------------------------------------------
        */

        $dailyBreakdown->push([

            'date' => $day->toDateString(),

            'day' => $day->format('l'),

            'shortDay' => $day->format('D'),

            'transactions' => $daySales->count(),

            'itemsSold' => $dayItems,

            'grossRevenue' => round(
                $dayRevenue,
                2
            ),

            'discount' => round(
                $dayDiscount,
                2
            ),

            'netSales' => round(
                $dayNetSales,
                2
            ),

            'cost' => round(
                $dayCost,
                2
            ),

            'profit' => round(
                $dayProfit,
                2
            ),

            'paid' => round(
                $dayPaid,
                2
            ),

            'change' => round(
                $dayChange,
                2
            ),

            'margin' => round(
                $dayMargin,
                2
            ),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Sales Data
    |--------------------------------------------------------------------------
    */

    $salesData = $sales->map(function ($sale) {

        return [

            'id' => $sale->id,

            'invoice_number' => $sale->invoice_number,

            'date' => $sale->created_at?->format('d M Y'),

            'time' => $sale->created_at?->format('H:i'),

            'customer' => $sale->customer?->name
                ?? 'Walk-in Customer',

            'cashier' => $sale->user?->name
                ?? 'Unknown',

            'subtotal' => (float) $sale->subtotal,

            'discount' => (float) $sale->discount,

            'total' => (float) $sale->total,

            'payment_method' => $sale->payment_method,

            'payment_status' => $sale->payment_status,

            'paid_amount' => (float) $sale->paid_amount,

            'outstanding' => max(
                0,
                (float) $sale->total -
                (float) $sale->paid_amount
            ),

            'change_amount' => (float) $sale->change_amount,

            'items_count' => $sale->items->sum(
                'quantity'
            ),
        ];
    })->values();

    /*
    |--------------------------------------------------------------------------
    | Return Monthly Report
    |--------------------------------------------------------------------------
    */

    return Inertia::render(
        'Admin/Reports/Monthly',
        [

            /*
            |--------------------------------------------------------------------------
            | Month Information
            |--------------------------------------------------------------------------
            */

            'monthStart' => $startDate->toDateString(),

            'monthEnd' => $endDate->toDateString(),

            'month' => $date->format('F'),

            'year' => $date->format('Y'),

            /*
            |--------------------------------------------------------------------------
            | Summary
            |--------------------------------------------------------------------------
            */

            'summary' => [

                'grossRevenue' => round(
                    $grossRevenue,
                    2
                ),

                'totalDiscount' => round(
                    $totalDiscount,
                    2
                ),

                'netSales' => round(
                    $netSales,
                    2
                ),

                'totalCost' => round(
                    $totalCost,
                    2
                ),

                'totalProfit' => round(
                    $totalProfit,
                    2
                ),

                'profitMargin' => round(
                    $profitMargin,
                    2
                ),

                'totalPaid' => round(
                    $totalPaid,
                    2
                ),

                'totalOutstanding' => round(
                    $totalOutstanding,
                    2
                ),

                'totalChange' => round(
                    $totalChange,
                    2
                ),

                'totalTransactions' =>
                    $totalTransactions,

                'totalItemsSold' => round(
                    $totalItemsSold,
                    2
                ),
            ],

            /*
            |--------------------------------------------------------------------------
            | Payment Methods
            |--------------------------------------------------------------------------
            */

            'paymentMethods' => [

                'cash' => round(
                    $cashSales,
                    2
                ),

                'mobileMoney' => round(
                    $mobileMoneySales,
                    2
                ),

                'bank' => round(
                    $bankSales,
                    2
                ),

                'credit' => round(
                    $creditSales,
                    2
                ),
            ],

            /*
            |--------------------------------------------------------------------------
            | Daily Sales
            |--------------------------------------------------------------------------
            */

            'dailySales' => $dailyBreakdown
                ->values(),

            /*
            |--------------------------------------------------------------------------
            | Sales
            |--------------------------------------------------------------------------
            */

            'sales' => $salesData,
        ]
    );

    //Yearly Report
    
}

//Yearly Report

/**
 * Yearly Sales Report
 */
public function yearly(Request $request)
{
    /*
    |--------------------------------------------------------------------------
    | Active Branch
    |--------------------------------------------------------------------------
    */

    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Selected Year
    |--------------------------------------------------------------------------
    */

    $year = (int) $request->input(
        'year',
        now()->year
    );

    /*
    |--------------------------------------------------------------------------
    | Year Range
    |--------------------------------------------------------------------------
    */

    $startDate = Carbon::create(
        $year,
        1,
        1
    )->startOfYear();

    $endDate = Carbon::create(
        $year,
        12,
        31
    )->endOfYear();

    /*
    |--------------------------------------------------------------------------
    | Get Completed Sales
    |--------------------------------------------------------------------------
    */

    $sales = Sale::with([
        'user:id,name',
        'customer:id,name',
        'items.product:id,name,sku',
    ])
        ->where('branch_id', $branchId)
        ->where('status', 'completed')
        ->whereBetween('created_at', [
            $startDate->copy()->startOfDay(),
            $endDate->copy()->endOfDay(),
        ])
        ->latest()
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Financial Summary
    |--------------------------------------------------------------------------
    */

    // Sales before discounts
    $grossRevenue = $sales->sum('subtotal');

    // Total discounts
    $totalDiscount = $sales->sum('discount');

    // Sales after discounts
    $netSales = $sales->sum('total');

    /*
    |--------------------------------------------------------------------------
    | Amount Collected
    |--------------------------------------------------------------------------
    */

    $totalPaid = $sales->sum(function ($sale) {
        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Change Given
    |--------------------------------------------------------------------------
    */

    $totalChange = $sales->sum('change_amount');

    /*
    |--------------------------------------------------------------------------
    | Outstanding
    |--------------------------------------------------------------------------
    */

    $totalOutstanding = max(
        0,
        $netSales - $totalPaid
    );

    /*
    |--------------------------------------------------------------------------
    | Transactions
    |--------------------------------------------------------------------------
    */

    $totalTransactions = $sales->count();

    /*
    |--------------------------------------------------------------------------
    | Cost Of Goods Sold
    |--------------------------------------------------------------------------
    */

    $totalCost = 0;

    foreach ($sales as $sale) {

        foreach ($sale->items as $item) {

            $totalCost +=
                (float) $item->quantity *
                (float) $item->cost_price;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Gross Profit
    |--------------------------------------------------------------------------
    */

    $totalProfit = $netSales - $totalCost;

    /*
    |--------------------------------------------------------------------------
    | Profit Margin
    |--------------------------------------------------------------------------
    */

    $profitMargin = $netSales > 0
        ? ($totalProfit / $netSales) * 100
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Total Items Sold
    |--------------------------------------------------------------------------
    */

    $totalItemsSold = $sales->sum(function ($sale) {
        return $sale->items->sum('quantity');
    });

    /*
    |--------------------------------------------------------------------------
    | Payment Methods
    |--------------------------------------------------------------------------
    */

    $paymentAmount = function ($sale) {

        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    };

    $cashSales = $sales
        ->where('payment_method', 'cash')
        ->sum($paymentAmount);

    $mobileMoneySales = $sales
        ->whereIn('payment_method', [
            'mobile_money',
            'mobileMoney',
        ])
        ->sum($paymentAmount);

    $bankSales = $sales
        ->where('payment_method', 'bank')
        ->sum($paymentAmount);

    $creditSales = $sales
        ->where('payment_method', 'credit')
        ->sum($paymentAmount);

    /*
    |--------------------------------------------------------------------------
    | Monthly Performance
    |--------------------------------------------------------------------------
    */

    $monthlyPerformance = collect();

    for ($month = 1; $month <= 12; $month++) {

        $monthStart = Carbon::create(
            $year,
            $month,
            1
        )->startOfMonth();

        $monthEnd = $monthStart
            ->copy()
            ->endOfMonth();

        $monthSales = $sales->filter(function ($sale) use (
            $monthStart,
            $monthEnd
        ) {

            return $sale->created_at->between(
                $monthStart,
                $monthEnd
            );
        });

        /*
        |--------------------------------------------------------------------------
        | Monthly Financials
        |--------------------------------------------------------------------------
        */

        $monthGrossRevenue = $monthSales->sum(
            'subtotal'
        );

        $monthDiscount = $monthSales->sum(
            'discount'
        );

        $monthNetSales = $monthSales->sum(
            'total'
        );

        /*
        |--------------------------------------------------------------------------
        | Monthly Cost
        |--------------------------------------------------------------------------
        */

        $monthCost = 0;

        foreach ($monthSales as $sale) {

            foreach ($sale->items as $item) {

                $monthCost +=
                    (float) $item->quantity *
                    (float) $item->cost_price;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Monthly Profit
        |--------------------------------------------------------------------------
        */

        $monthProfit =
            $monthNetSales -
            $monthCost;

        /*
        |--------------------------------------------------------------------------
        | Monthly Margin
        |--------------------------------------------------------------------------
        */

        $monthMargin = $monthNetSales > 0
            ? (
                $monthProfit /
                $monthNetSales
            ) * 100
            : 0;

        /*
        |--------------------------------------------------------------------------
        | Monthly Items
        |--------------------------------------------------------------------------
        */

        $monthItems = $monthSales->sum(function ($sale) {

            return $sale->items->sum(
                'quantity'
            );
        });

        /*
        |--------------------------------------------------------------------------
        | Monthly Paid
        |--------------------------------------------------------------------------
        */

        $monthPaid = $monthSales->sum(function ($sale) {

            return max(
                0,
                (float) $sale->paid_amount -
                (float) $sale->change_amount
            );
        });

        /*
        |--------------------------------------------------------------------------
        | Monthly Outstanding
        |--------------------------------------------------------------------------
        */

        $monthOutstanding = max(
            0,
            $monthNetSales -
            $monthPaid
        );

        /*
        |--------------------------------------------------------------------------
        | Push Monthly Data
        |--------------------------------------------------------------------------
        */

        $monthlyPerformance->push([

            'month' => $month,

            'monthName' => $monthStart->format(
                'F'
            ),

            'shortMonth' => $monthStart->format(
                'M'
            ),

            'transactions' =>
                $monthSales->count(),

            'itemsSold' =>
                $monthItems,

            'grossRevenue' =>
                round(
                    $monthGrossRevenue,
                    2
                ),

            'discount' =>
                round(
                    $monthDiscount,
                    2
                ),

            'netSales' =>
                round(
                    $monthNetSales,
                    2
                ),

            'cost' =>
                round(
                    $monthCost,
                    2
                ),

            'profit' =>
                round(
                    $monthProfit,
                    2
                ),

            'margin' =>
                round(
                    $monthMargin,
                    2
                ),

            'paid' =>
                round(
                    $monthPaid,
                    2
                ),

            'outstanding' =>
                round(
                    $monthOutstanding,
                    2
                ),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Return Yearly Report
    |--------------------------------------------------------------------------
    */

    return Inertia::render(
        'Admin/Reports/Yearly',
        [

            /*
            |--------------------------------------------------------------------------
            | Year Information
            |--------------------------------------------------------------------------
            */

            'year' => $year,

            'startDate' =>
                $startDate->toDateString(),

            'endDate' =>
                $endDate->toDateString(),

            /*
            |--------------------------------------------------------------------------
            | Summary
            |--------------------------------------------------------------------------
            */

            'summary' => [

                'grossRevenue' =>
                    round(
                        $grossRevenue,
                        2
                    ),

                'totalDiscount' =>
                    round(
                        $totalDiscount,
                        2
                    ),

                'netSales' =>
                    round(
                        $netSales,
                        2
                    ),

                'totalCost' =>
                    round(
                        $totalCost,
                        2
                    ),

                'totalProfit' =>
                    round(
                        $totalProfit,
                        2
                    ),

                'profitMargin' =>
                    round(
                        $profitMargin,
                        2
                    ),

                'totalPaid' =>
                    round(
                        $totalPaid,
                        2
                    ),

                'totalOutstanding' =>
                    round(
                        $totalOutstanding,
                        2
                    ),

                'totalChange' =>
                    round(
                        $totalChange,
                        2
                    ),

                'totalTransactions' =>
                    $totalTransactions,

                'totalItemsSold' =>
                    round(
                        $totalItemsSold,
                        2
                    ),
            ],

            /*
            |--------------------------------------------------------------------------
            | Payment Methods
            |--------------------------------------------------------------------------
            */

            'paymentMethods' => [

                'cash' =>
                    round(
                        $cashSales,
                        2
                    ),

                'mobileMoney' =>
                    round(
                        $mobileMoneySales,
                        2
                    ),

                'bank' =>
                    round(
                        $bankSales,
                        2
                    ),

                'credit' =>
                    round(
                        $creditSales,
                        2
                    ),
            ],

            /*
            |--------------------------------------------------------------------------
            | Monthly Performance
            |--------------------------------------------------------------------------
            */

            'monthlyPerformance' =>
                $monthlyPerformance->values(),
        ]
    );
}

/**
 * Profit Report
 */
public function profit(Request $request)
{
    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Selected Date Range
    |--------------------------------------------------------------------------
    */

    $startDate = $request->input(
        'start_date',
        now()->startOfMonth()->toDateString()
    );

    $endDate = $request->input(
        'end_date',
        now()->toDateString()
    );

    /*
    |--------------------------------------------------------------------------
    | Get Completed Sales
    |--------------------------------------------------------------------------
    */

    $sales = Sale::with([
        'user:id,name',
        'customer:id,name',
        'items.product:id,name,sku',
    ])
        ->where('branch_id', $branchId)
        ->where('status', 'completed')
        ->whereBetween('created_at', [
            Carbon::parse($startDate)->startOfDay(),
            Carbon::parse($endDate)->endOfDay(),
        ])
        ->latest()
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Profit Calculations
    |--------------------------------------------------------------------------
    */

    $grossRevenue = 0;
    $totalDiscount = 0;
    $netSales = 0;
    $totalCost = 0;
    $totalProfit = 0;
    $totalItemsSold = 0;

    foreach ($sales as $sale) {

        $grossRevenue += (float) $sale->subtotal;

        $totalDiscount += (float) $sale->discount;

        $netSales += (float) $sale->total;

        foreach ($sale->items as $item) {

            $quantity = (float) $item->quantity;
            $costPrice = (float) $item->cost_price;
            $itemTotal = (float) $item->total;

            $totalCost += $quantity * $costPrice;

            $totalItemsSold += $quantity;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Gross Profit
    |--------------------------------------------------------------------------
    */

    $totalProfit = $netSales - $totalCost;

    /*
    |--------------------------------------------------------------------------
    | Profit Margin
    |--------------------------------------------------------------------------
    */

    $profitMargin = $netSales > 0
        ? ($totalProfit / $netSales) * 100
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Payment
    |--------------------------------------------------------------------------
    */

    $totalPaid = $sales->sum(function ($sale) {

        return max(
            0,
            (float) $sale->paid_amount -
            (float) $sale->change_amount
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Outstanding
    |--------------------------------------------------------------------------
    */

    $totalOutstanding = max(
        0,
        $netSales - $totalPaid
    );

    /*
    |--------------------------------------------------------------------------
    | Product Profit Breakdown
    |--------------------------------------------------------------------------
    */

    $productProfits = collect();

    foreach ($sales as $sale) {

        foreach ($sale->items as $item) {

            $quantity = (float) $item->quantity;
            $costPrice = (float) $item->cost_price;
            $sellingPrice = (float) $item->unit_price;

            $revenue = $quantity * $sellingPrice;
            $cost = $quantity * $costPrice;
            $profit = $revenue - $cost;

            $productId = $item->product_id;

            if (!$productProfits->has($productId)) {

                $productProfits->put($productId, [
                    'product_id' => $productId,
                    'product' => $item->product?->name ?? 'Unknown Product',
                    'sku' => $item->product?->sku ?? '-',
                    'quantity' => 0,
                    'revenue' => 0,
                    'cost' => 0,
                    'profit' => 0,
                ]);
            }

            $product = $productProfits->get($productId);

            $product['quantity'] += $quantity;
            $product['revenue'] += $revenue;
            $product['cost'] += $cost;
            $product['profit'] += $profit;

            $productProfits->put($productId, $product);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Format Product Profit Data
    |--------------------------------------------------------------------------
    */

    $productProfits = $productProfits
        ->map(function ($product) {

            $margin = $product['revenue'] > 0
                ? (
                    $product['profit'] /
                    $product['revenue']
                ) * 100
                : 0;

            return [
                'product_id' => $product['product_id'],

                'product' => $product['product'],

                'sku' => $product['sku'],

                'quantity' => round(
                    $product['quantity'],
                    2
                ),

                'revenue' => round(
                    $product['revenue'],
                    2
                ),

                'cost' => round(
                    $product['cost'],
                    2
                ),

                'profit' => round(
                    $product['profit'],
                    2
                ),

                'margin' => round(
                    $margin,
                    2
                ),
            ];
        })
        ->sortByDesc('profit')
        ->values();

    /*
    |--------------------------------------------------------------------------
    | Sales Profit Breakdown
    |--------------------------------------------------------------------------
    */

    $salesData = $sales->map(function ($sale) {

        $cost = $sale->items->sum(function ($item) {

            return
                (float) $item->quantity *
                (float) $item->cost_price;
        });

        $profit = (float) $sale->total - $cost;

        $margin = (float) $sale->total > 0
            ? (
                $profit /
                (float) $sale->total
            ) * 100
            : 0;

        return [
            'id' => $sale->id,

            'invoice_number' =>
                $sale->invoice_number,

            'date' =>
                $sale->created_at?->format('d M Y'),

            'time' =>
                $sale->created_at?->format('H:i'),

            'customer' =>
                $sale->customer?->name
                ?? 'Walk-in Customer',

            'cashier' =>
                $sale->user?->name
                ?? 'Unknown',

            'sales' =>
                (float) $sale->total,

            'cost' =>
                round($cost, 2),

            'profit' =>
                round($profit, 2),

            'margin' =>
                round($margin, 2),
        ];
    })->values();

    /*
    |--------------------------------------------------------------------------
    | Return Profit Report
    |--------------------------------------------------------------------------
    */

    return Inertia::render(
        'Admin/Reports/Profit',
        [

            'startDate' => $startDate,

            'endDate' => $endDate,

            'summary' => [

                'grossRevenue' =>
                    round($grossRevenue, 2),

                'totalDiscount' =>
                    round($totalDiscount, 2),

                'netSales' =>
                    round($netSales, 2),

                'totalCost' =>
                    round($totalCost, 2),

                'totalProfit' =>
                    round($totalProfit, 2),

                'profitMargin' =>
                    round($profitMargin, 2),

                'totalPaid' =>
                    round($totalPaid, 2),

                'totalOutstanding' =>
                    round($totalOutstanding, 2),

                'totalTransactions' =>
                    $sales->count(),

                'totalItemsSold' =>
                    round($totalItemsSold, 2),
            ],

            'products' =>
                $productProfits,

            'sales' =>
                $salesData,
        ]
    );
}

/**
 * Stock Report
 */
public function stock(Request $request)
{
    /*
    |--------------------------------------------------------------------------
    | Active Branch
    |--------------------------------------------------------------------------
    */

    $branchId = session('branch_id');

    if (!$branchId) {
        abort(403, 'No active branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Get Branch Products
    |--------------------------------------------------------------------------
    */

    $products = \App\Models\Product::with([
        'category:id,name',
    ])
        ->where('branch_id', $branchId)
        ->where('status', 'active')
        ->orderBy('name')
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Stock Summary
    |--------------------------------------------------------------------------
    */

    $totalProducts = $products->count();

    $totalQuantity = $products->sum(function ($product) {
        return (float) $product->quantity;
    });

    /*
    |--------------------------------------------------------------------------
    | Stock Cost Value
    |--------------------------------------------------------------------------
    */

    $totalCostValue = $products->sum(function ($product) {
        return
            (float) $product->quantity *
            (float) $product->cost_price;
    });

    /*
    |--------------------------------------------------------------------------
    | Stock Selling Value
    |--------------------------------------------------------------------------
    */

    $totalSellingValue = $products->sum(function ($product) {
        return
            (float) $product->quantity *
            (float) $product->selling_price;
    });

    /*
    |--------------------------------------------------------------------------
    | Expected Profit
    |--------------------------------------------------------------------------
    */

    $expectedProfit =
        $totalSellingValue -
        $totalCostValue;

    /*
    |--------------------------------------------------------------------------
    | Profit Margin
    |--------------------------------------------------------------------------
    */

    $profitMargin = $totalSellingValue > 0
        ? ($expectedProfit / $totalSellingValue) * 100
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Low Stock
    |--------------------------------------------------------------------------
    */

    $lowStockProducts = $products->filter(function ($product) {

        return
            (float) $product->quantity > 0 &&
            (float) $product->quantity <=
            (float) $product->low_stock_limit;

    });

    /*
    |--------------------------------------------------------------------------
    | Out Of Stock
    |--------------------------------------------------------------------------
    */

    $outOfStockProducts = $products->filter(function ($product) {

        return (float) $product->quantity <= 0;

    });

    /*
    |--------------------------------------------------------------------------
    | Stock Value By Product
    |--------------------------------------------------------------------------
    */

    $stockData = $products->map(function ($product) {

        $quantity = (float) $product->quantity;
        $costPrice = (float) $product->cost_price;
        $sellingPrice = (float) $product->selling_price;

        $costValue = $quantity * $costPrice;

        $sellingValue = $quantity * $sellingPrice;

        $expectedProfit =
            $sellingValue - $costValue;

        $margin = $sellingValue > 0
            ? ($expectedProfit / $sellingValue) * 100
            : 0;

        /*
        |--------------------------------------------------------------------------
        | Stock Status
        |--------------------------------------------------------------------------
        */

        if ($quantity <= 0) {

            $stockStatus = 'out_of_stock';

        } elseif (
            $quantity <=
            (float) $product->low_stock_limit
        ) {

            $stockStatus = 'low_stock';

        } else {

            $stockStatus = 'in_stock';
        }

        return [

            'id' => $product->id,

            'name' => $product->name,

            'sku' => $product->sku,

            'barcode' => $product->barcode,

            'category' =>
                $product->category?->name ??
                'Uncategorized',

            'quantity' => $quantity,

            'unit' => $product->unit,

            'costPrice' => $costPrice,

            'sellingPrice' => $sellingPrice,

            'costValue' =>
                round($costValue, 2),

            'sellingValue' =>
                round($sellingValue, 2),

            'expectedProfit' =>
                round($expectedProfit, 2),

            'margin' =>
                round($margin, 2),

            'lowStockLimit' =>
                (float) $product->low_stock_limit,

            'status' => $stockStatus,
        ];

    })->values();

    /*
    |--------------------------------------------------------------------------
    | Stock Movements
    |--------------------------------------------------------------------------
    */

    $movements = \App\Models\StockMovement::with([
        'product:id,name,sku',
        'user:id,name',
    ])
        ->where('branch_id', $branchId)
        ->latest()
        ->limit(100)
        ->get();

    /*
    |--------------------------------------------------------------------------
    | Movement Summary
    |--------------------------------------------------------------------------
    */

    $stockIn = $movements
        ->whereIn('type', [
            'in',
            'stock_in',
            'purchase',
        ])
        ->sum(function ($movement) {

            return (float) $movement->quantity;

        });

    $stockOut = $movements
        ->whereIn('type', [
            'out',
            'stock_out',
            'sale',
        ])
        ->sum(function ($movement) {

            return (float) $movement->quantity;

        });

    /*
    |--------------------------------------------------------------------------
    | Movement Data
    |--------------------------------------------------------------------------
    */

    $movementData = $movements->map(function ($movement) {

        return [

            'id' => $movement->id,

            'product' =>
                $movement->product?->name ??
                'Unknown Product',

            'sku' =>
                $movement->product?->sku,

            'type' =>
                $movement->type,

            'quantity' =>
                (float) $movement->quantity,

            'reference' =>
                $movement->reference,

            'note' =>
                $movement->note,

            'user' =>
                $movement->user?->name ??
                'Unknown',

            'date' =>
                $movement->created_at?->format(
                    'd M Y'
                ),

            'time' =>
                $movement->created_at?->format(
                    'H:i'
                ),
        ];

    })->values();

    /*
    |--------------------------------------------------------------------------
    | Return Stock Report
    |--------------------------------------------------------------------------
    */

    return Inertia::render(
        'Admin/Reports/Stock',
        [

            /*
            |--------------------------------------------------------------------------
            | Summary
            |--------------------------------------------------------------------------
            */

            'summary' => [

                'totalProducts' =>
                    $totalProducts,

                'totalQuantity' =>
                    round(
                        $totalQuantity,
                        2
                    ),

                'totalCostValue' =>
                    round(
                        $totalCostValue,
                        2
                    ),

                'totalSellingValue' =>
                    round(
                        $totalSellingValue,
                        2
                    ),

                'expectedProfit' =>
                    round(
                        $expectedProfit,
                        2
                    ),

                'profitMargin' =>
                    round(
                        $profitMargin,
                        2
                    ),

                'lowStock' =>
                    $lowStockProducts->count(),

                'outOfStock' =>
                    $outOfStockProducts->count(),

                'stockIn' =>
                    round(
                        $stockIn,
                        2
                    ),

                'stockOut' =>
                    round(
                        $stockOut,
                        2
                    ),
            ],

            /*
            |--------------------------------------------------------------------------
            | Products
            |--------------------------------------------------------------------------
            */

            'products' =>
                $stockData,

            /*
            |--------------------------------------------------------------------------
            | Low Stock Products
            |--------------------------------------------------------------------------
            */

            'lowStockProducts' =>
                $stockData
                    ->where(
                        'status',
                        'low_stock'
                    )
                    ->values(),

            /*
            |--------------------------------------------------------------------------
            | Out Of Stock Products
            |--------------------------------------------------------------------------
            */

            'outOfStockProducts' =>
                $stockData
                    ->where(
                        'status',
                        'out_of_stock'
                    )
                    ->values(),

            /*
            |--------------------------------------------------------------------------
            | Movements
            |--------------------------------------------------------------------------
            */

            'movements' =>
                $movementData,
        ]
    );
}

}

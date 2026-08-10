<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\BranchHelper;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebtorController extends Controller
{
    /**
     * Display debtors.
     */
    public function index(Request $request)
    {
        $branch = BranchHelper::current();

        $search = $request->input('search');

        $debtors = Sale::with([
                'customer',
                'user',
            ])
            ->where('branch_id', $branch->id)
            ->where('payment_method', 'credit')
            ->whereIn('payment_status', ['unpaid', 'partial'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {

                    $q->where('invoice_number', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($customerQuery) use ($search) {
                            $customerQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('phone', 'like', "%{$search}%");
                        });

                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        /*
        |--------------------------------------------------------------------------
        | Summary
        |--------------------------------------------------------------------------
        */

        $summaryQuery = Sale::query()
            ->where('branch_id', $branch->id)
            ->where('payment_method', 'credit')
            ->whereIn('payment_status', ['unpaid', 'partial']);

        $totalDebt = (clone $summaryQuery)
            ->get()
            ->sum(function ($sale) {
                return $sale->total - $sale->paid_amount;
            });

        $totalCreditSales = (clone $summaryQuery)->count();

        $totalPaid = (clone $summaryQuery)->sum('paid_amount');

        $totalCreditAmount = (clone $summaryQuery)->sum('total');

        return Inertia::render('Admin/Debtors/Index', [

            'debtors' => $debtors,

            'branch' => $branch,

            'summary' => [
                'totalDebt' => $totalDebt,
                'totalCreditSales' => $totalCreditSales,
                'totalPaid' => $totalPaid,
                'totalCreditAmount' => $totalCreditAmount,
            ],

            'filters' => [
                'search' => $search,
            ],

        ]);
    }

    /**
     * Display debtor details.
     */
    public function show(Sale $sale)
    {
        $branch = BranchHelper::current();

        abort_if(
            $sale->branch_id !== $branch->id,
            403
        );

        abort_if(
            $sale->payment_method !== 'credit',
            404
        );

        $sale->load([
            'customer',
            'user',
            'items.product',
        ]);

        $balance = $sale->total - $sale->paid_amount;

        return Inertia::render('Admin/Debtors/Show', [
            'sale' => $sale,
            'branch' => $branch,
            'balance' => $balance,
        ]);
    }
}
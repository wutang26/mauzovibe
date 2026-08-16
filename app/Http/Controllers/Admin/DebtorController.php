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
     *
     * Normal users:
     * - See debtors from their current branch.
     *
     * Admin / Super Admin:
     * - See debtors from all branches.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $branch = BranchHelper::current();

        $isAdmin = $user->hasAnyRole([
            'Admin',
            'Super Admin',
        ]);

        $search = $request->input('search');

        /*
        |--------------------------------------------------------------------------
        | Debtors Query
        |--------------------------------------------------------------------------
        */

        $debtorsQuery = Sale::with([
            'customer',
            'user',
        ])
            ->where('payment_method', 'credit')
            ->whereIn('payment_status', ['unpaid', 'partial']);

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        |
        | Normal users must have a branch.
        |
        */

        if (!$isAdmin) {

            abort_if(!$branch, 403, 'No active branch selected.');

            $debtorsQuery->where(
                'branch_id',
                $branch->id
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        $debtorsQuery->when($search, function ($query) use ($search) {

            $query->where(function ($q) use ($search) {

                $q->where(
                    'invoice_number',
                    'like',
                    "%{$search}%"
                )

                ->orWhereHas('customer', function ($customerQuery) use ($search) {

                    $customerQuery
                        ->where(
                            'name',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'phone',
                            'like',
                            "%{$search}%"
                        );

                });

            });

        });

        $debtors = $debtorsQuery
            ->latest()
            ->paginate(15)
            ->withQueryString();


        /*
        |--------------------------------------------------------------------------
        | Summary Query
        |--------------------------------------------------------------------------
        */

        $summaryQuery = Sale::query()
            ->where('payment_method', 'credit')
            ->whereIn('payment_status', ['unpaid', 'partial']);

        /*
        |--------------------------------------------------------------------------
        | Normal User Summary
        |--------------------------------------------------------------------------
        */

        if (!$isAdmin) {

            $summaryQuery->where(
                'branch_id',
                $branch->id
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Summary
        |--------------------------------------------------------------------------
        */

        $totalDebt = (clone $summaryQuery)
            ->get()
            ->sum(function ($sale) {

                return $sale->total - $sale->paid_amount;

            });

        $totalCreditSales = (clone $summaryQuery)
            ->count();

        $totalPaid = (clone $summaryQuery)
            ->sum('paid_amount');

        $totalCreditAmount = (clone $summaryQuery)
            ->sum('total');


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/Debtors/Index',
            [

                'debtors' => $debtors,

                /*
                | Admin/Super Admin don't have a current branch.
                | Therefore branch can be null.
                */

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

            ]
        );
    }


    /**
     * Display debtor details.
     */
    public function show(Request $request, Sale $sale)
    {
        $user = $request->user();

        $branch = BranchHelper::current();

        $isAdmin = $user->hasAnyRole([
            'Admin',
            'Super Admin',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Normal User Access
        |--------------------------------------------------------------------------
        |
        | Normal users can only see debtors belonging to
        | their current branch.
        |
        */

        if (!$isAdmin) {

            abort_if(
                !$branch,
                403,
                'No active branch selected.'
            );

            abort_if(
                $sale->branch_id !== $branch->id,
                403
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Make sure this is actually a credit sale
        |--------------------------------------------------------------------------
        */

        abort_if(
            $sale->payment_method !== 'credit',
            404
        );


        /*
        |--------------------------------------------------------------------------
        | Load relationships
        |--------------------------------------------------------------------------
        */

        $sale->load([
            'customer',
            'user',
            'items.product',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Balance
        |--------------------------------------------------------------------------
        */

        $balance = $sale->total - $sale->paid_amount;


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/Debtors/Show',
            [

                'sale' => $sale,

                /*
                | Can be null for Admin/Super Admin.
                */

                'branch' => $branch,

                'balance' => $balance,

            ]
        );
    }
}
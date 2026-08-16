<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Helpers\BranchHelper;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CreditSaleController extends Controller
{
    /**
     * Display credit sales.
     *
     * Normal users:
     * - See credit sales from their current branch.
     *
     * Admin / Super Admin:
     * - See credit sales from all branches.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $branch = BranchHelper::current();

        $isAdmin = $user->hasAnyRole([
            'Admin',
            'Super Admin',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Credit Sales Query
        |--------------------------------------------------------------------------
        */

        $query = Sale::with([
            'customer',
            'user',
        ])
            ->where('payment_method', 'credit')
            ->whereIn('payment_status', [
                'unpaid',
                'partial',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        |
        | Normal users must have an active branch.
        |
        */

        if (!$isAdmin) {

            abort_if(
                !$branch,
                403,
                'No active branch selected.'
            );

            $query->where(
                'branch_id',
                $branch->id
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if ($request->filled('search')) {

            $search = $request->search;

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
        }

        /*
        |--------------------------------------------------------------------------
        | Get Credit Sales
        |--------------------------------------------------------------------------
        */

        $creditSales = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/CreditSales/Index',
            [
                'creditSales' => $creditSales,

                /*
                | Admin/Super Admin can have null branch.
                */

                'branch' => $branch,

                'filters' => [
                    'search' => $request->search,
                ],
            ]
        );
    }
}
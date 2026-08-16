<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\BranchHelper;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentHistoryController extends Controller
{
    /**
     * Display payment history.
     *
     * Normal users:
     * - See payments from their current branch.
     *
     * Admin / Super Admin:
     * - See payments from all branches.
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
        | Payments Query
        |--------------------------------------------------------------------------
        */

        $paymentsQuery = Payment::with([
            'customer',
            'sale',
            'user',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        */

        if (!$isAdmin) {

            abort_if(
                !$branch,
                403,
                'No active branch selected.'
            );

            $paymentsQuery->where(
                'branch_id',
                $branch->id
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        $paymentsQuery->when($search, function ($query) use ($search) {

            $query->where(function ($q) use ($search) {

                $q->where(
                    'reference',
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

                })

                ->orWhereHas('sale', function ($saleQuery) use ($search) {

                    $saleQuery->where(
                        'invoice_number',
                        'like',
                        "%{$search}%"
                    );

                });

            });

        });

        /*
        |--------------------------------------------------------------------------
        | Get Payments
        |--------------------------------------------------------------------------
        */

        $payments = $paymentsQuery
            ->latest()
            ->paginate(15)
            ->withQueryString();


        /*
        |--------------------------------------------------------------------------
        | Summary Query
        |--------------------------------------------------------------------------
        */

        $summaryQuery = Payment::query();

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

        $totalPayments = (clone $summaryQuery)
            ->count();

        $totalAmount = (clone $summaryQuery)
            ->sum('amount');

        $cashPayments = (clone $summaryQuery)
            ->where(
                'payment_method',
                'cash'
            )
            ->sum('amount');

        $mobileMoneyPayments = (clone $summaryQuery)
            ->where(
                'payment_method',
                'mobile_money'
            )
            ->sum('amount');

        $bankPayments = (clone $summaryQuery)
            ->where(
                'payment_method',
                'bank'
            )
            ->sum('amount');


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/Payments/Index',
            [

                'payments' => $payments,

                /*
                | Admin/Super Admin can have null branch.
                */

                'branch' => $branch,

                'summary' => [
                    'totalPayments' => $totalPayments,
                    'totalAmount' => $totalAmount,
                    'cashPayments' => $cashPayments,
                    'mobileMoneyPayments' => $mobileMoneyPayments,
                    'bankPayments' => $bankPayments,
                ],

                'filters' => [
                    'search' => $search,
                ],

            ]
        );
    }


    /**
     * Display payment details.
     */
    public function show(Request $request, Payment $payment)
    {
        $user = $request->user();

        $branch = BranchHelper::current();

        $isAdmin = $user->hasAnyRole([
            'Admin',
            'Super Admin',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Security
        |--------------------------------------------------------------------------
        |
        | Normal users can only view payments from their branch.
        |
        | Admin / Super Admin can view payments from any branch.
        |
        */

        if (!$isAdmin) {

            abort_if(
                !$branch,
                403,
                'No active branch selected.'
            );

            abort_if(
                $payment->branch_id !== $branch->id,
                403
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Load Relationships
        |--------------------------------------------------------------------------
        */

        $payment->load([
            'customer',
            'sale',
            'user',
            'branch',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/Payments/Show',
            [

                'payment' => $payment,

                'branch' => $branch,

            ]
        );
    }
}
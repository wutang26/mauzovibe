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
     */
    public function index(Request $request)
    {
        $branch = BranchHelper::current();

        $search = $request->input('search');

        $payments = Payment::with([
                'customer',
                'sale',
                'user',
            ])
            ->where('branch_id', $branch->id)

            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {

                    $q->where('reference', 'like', "%{$search}%")

                        ->orWhereHas('customer', function ($customerQuery) use ($search) {
                            $customerQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('phone', 'like', "%{$search}%");
                        })

                        ->orWhereHas('sale', function ($saleQuery) use ($search) {
                            $saleQuery->where(
                                'invoice_number',
                                'like',
                                "%{$search}%"
                            );
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

        $summaryQuery = Payment::query()
            ->where('branch_id', $branch->id);


        $totalPayments = (clone $summaryQuery)->count();

        $totalAmount = (clone $summaryQuery)->sum('amount');

        $cashPayments = (clone $summaryQuery)
            ->where('payment_method', 'cash')
            ->sum('amount');

        $mobileMoneyPayments = (clone $summaryQuery)
            ->where('payment_method', 'mobile_money')
            ->sum('amount');

        $bankPayments = (clone $summaryQuery)
            ->where('payment_method', 'bank')
            ->sum('amount');


        return Inertia::render('Admin/Payments/Index', [

            'payments' => $payments,

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

        ]);
    }


    /**
     * Display payment details.
     */
    public function show(Payment $payment)
    {
        $branch = BranchHelper::current();

        /*
        |--------------------------------------------------------------------------
        | Security
        |--------------------------------------------------------------------------
        */

        abort_if(
            $payment->branch_id !== $branch->id,
            403
        );


        $payment->load([
            'customer',
            'sale',
            'user',
            'branch',
        ]);


        return Inertia::render('Admin/Payments/Show', [

            'payment' => $payment,

            'branch' => $branch,

        ]);
    }
}
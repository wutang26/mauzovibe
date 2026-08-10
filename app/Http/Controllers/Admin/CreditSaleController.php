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
     */
    public function index(Request $request)
    {
        $branch = BranchHelper::current();

        $query = Sale::with([
            'customer',
            'user',
        ])
            ->where('branch_id', $branch->id)
            ->where('payment_method', 'credit')
            ->whereIn('payment_status', [
                'unpaid',
                'partial',
            ]);

        // Search
        if ($request->filled('search')) {

            $search = $request->search;

            $query->where(function ($q) use ($search) {

                $q->where('invoice_number', 'like', "%{$search}%")

                    ->orWhereHas('customer', function ($customerQuery) use ($search) {

                        $customerQuery
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");

                    });

            });
        }

        $creditSales = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/CreditSales/Index', [
            'creditSales' => $creditSales,
            'branch' => $branch,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }
}
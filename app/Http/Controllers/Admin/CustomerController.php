<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\BranchHelper;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display customer list.
     */
    public function index()
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        | They manage customers from all branches.
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            $customers = Customer::with('branch')
                ->latest()
                ->paginate(10)
                ->withQueryString();

            return Inertia::render('Admin/Customers/Index', [
                'customers' => $customers,
                'branch' => null,
                'isAdmin' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        | Normal users only see customers from their current branch.
        |--------------------------------------------------------------------------
        */
        $branch = BranchHelper::current();

        abort_unless($branch, 403, 'No active branch selected.');

        $customers = Customer::where('branch_id', $branch->id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'branch' => $branch,
            'isAdmin' => false,
        ]);
    }

    /**
     * Show create customer form.
     */
    public function create()
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        | They can create a customer, but they must select the branch.
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            return Inertia::render('Admin/Customers/Create', [
                'branch' => null,
                'isAdmin' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        */
        $branch = BranchHelper::current();

        abort_unless($branch, 403, 'No active branch selected.');

        return Inertia::render('Admin/Customers/Create', [
            'branch' => $branch,
            'isAdmin' => false,
        ]);
    }

    /**
     * Store a new customer.
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        | They need to specify which branch the customer belongs to.
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            $request->validate([
                'branch_id' => 'required|exists:branches,id',
            ]);

            $branchId = $request->branch_id;

        } else {

            /*
            |--------------------------------------------------------------------------
            | Normal User
            |--------------------------------------------------------------------------
            */
            $branch = BranchHelper::current();

            abort_unless($branch, 403, 'No active branch selected.');

            $branchId = $branch->id;
        }

        Customer::create([
            'branch_id' => $branchId,
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()
            ->route('admin.customers.index')
            ->with('success', 'Customer created successfully.');
    }

    /**
     * Display customer details.
     */
    public function show(Customer $customer)
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        | They can view customers from any branch.
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            $customer->load([
                'sales' => function ($query) {
                    $query->latest();
                },
                'branch',
            ]);

            return Inertia::render('Admin/Customers/Show', [
                'customer' => $customer,
                'branch' => $customer->branch,
                'isAdmin' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        */
        $branch = BranchHelper::current();

        abort_unless($branch, 403, 'No active branch selected.');

        abort_unless(
            $customer->branch_id === $branch->id,
            403
        );

        $customer->load([
            'sales' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer,
            'branch' => $branch,
            'isAdmin' => false,
        ]);
    }

    /**
     * Show edit customer form.
     */
    public function edit(Customer $customer)
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            return Inertia::render('Admin/Customers/Edit', [
                'customer' => $customer,
                'branch' => $customer->branch,
                'isAdmin' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        */
        $branch = BranchHelper::current();

        abort_unless($branch, 403, 'No active branch selected.');

        abort_unless(
            $customer->branch_id === $branch->id,
            403
        );

        return Inertia::render('Admin/Customers/Edit', [
            'customer' => $customer,
            'branch' => $branch,
            'isAdmin' => false,
        ]);
    }

    /**
     * Update customer.
     */
    public function update(Request $request, Customer $customer)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            $request->validate([
                'branch_id' => 'required|exists:branches,id',
            ]);

            $customer->update([
                'branch_id' => $request->branch_id,
                'name' => $validated['name'],
                'phone' => $validated['phone'] ?? null,
                'email' => $validated['email'] ?? null,
                'address' => $validated['address'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]);

        } else {

            /*
            |--------------------------------------------------------------------------
            | Normal User
            |--------------------------------------------------------------------------
            */
            $branch = BranchHelper::current();

            abort_unless($branch, 403, 'No active branch selected.');

            abort_unless(
                $customer->branch_id === $branch->id,
                403
            );

            $customer->update($validated);
        }

        return redirect()
            ->route('admin.customers.index')
            ->with('success', 'Customer updated successfully.');
    }

    /**
     * Delete customer.
     */
    public function destroy(Customer $customer)
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Admin & Super Admin
        |--------------------------------------------------------------------------
        */
        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {

            $customer->delete();

            return redirect()
                ->route('admin.customers.index')
                ->with('success', 'Customer deleted successfully.');
        }

        /*
        |--------------------------------------------------------------------------
        | Normal User
        |--------------------------------------------------------------------------
        */
        $branch = BranchHelper::current();

        abort_unless($branch, 403, 'No active branch selected.');

        abort_unless(
            $customer->branch_id === $branch->id,
            403
        );

        $customer->delete();

        return redirect()
            ->route('admin.customers.index')
            ->with('success', 'Customer deleted successfully.');
    }
}
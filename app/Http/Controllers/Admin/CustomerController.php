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
        $branch = BranchHelper::current();

        $customers = Customer::where('branch_id', $branch->id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'branch' => $branch,
        ]);
    }

    /**
     * Show create customer form.
     */
    public function create()
    {
        $branch = BranchHelper::current();

        return Inertia::render('Admin/Customers/Create', [
            'branch' => $branch,
        ]);
    }

    /**
     * Store a new customer.
     */
    public function store(Request $request)
    {
        $branch = BranchHelper::current();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        Customer::create([
            'branch_id' => $branch->id,
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
        $branch = BranchHelper::current();

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
        ]);
    }

    /**
     * Show edit customer form.
     */
    public function edit(Customer $customer)
    {
        $branch = BranchHelper::current();

        abort_unless(
            $customer->branch_id === $branch->id,
            403
        );

        return Inertia::render('Admin/Customers/Edit', [
            'customer' => $customer,
            'branch' => $branch,
        ]);
    }

    /**
     * Update customer.
     */
    public function update(Request $request, Customer $customer)
    {
        $branch = BranchHelper::current();

        abort_unless(
            $customer->branch_id === $branch->id,
            403
        );

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $customer->update($validated);

        return redirect()
            ->route('admin.customers.index')
            ->with('success', 'Customer updated successfully.');
    }

    /**
     * Delete customer.
     */
    public function destroy(Customer $customer)
    {
        $branch = BranchHelper::current();

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
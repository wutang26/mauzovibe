<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class BranchController extends Controller
{
    /**
     * Display branches with subscription countdown information.
     */
    public function index()
    {
        $user = auth()->user();

        // Base query: load users, roles, subscription and users count.
        $query = Branch::with([
            'users.roles',
            'subscription',
        ])->withCount('users');

        // Super Admin sees all branches.
        if ($user->hasRole('Super Admin')) {
            $branches = $query
                ->latest('created_at')
                ->get();
        }

        // Admin sees branches belonging to their business.
        elseif ($user->hasRole('Admin') && $user->business_id) {
            $branches = $query
                ->where('business_id', $user->business_id)
                ->latest('created_at')
                ->get();
        }

        // Other users see only branches assigned to them.
        else {
            $branches = $user->branches()
                ->with([
                    'users.roles',
                    'subscription',
                ])
                ->withCount('users')
                ->latest('branches.created_at')
                ->get();
        }

        $now = now();

        // Calculate subscription information for every branch.
        $branches->each(function ($branch) use ($now) {
            $subscription = $branch->subscription;

            if (!$subscription) {
                $branch->setAttribute('subscription_info', null);
                return;
            }

            $status = $subscription->status;
            $plan = $subscription->plan;

            $info = [
                'status' => $status,
                'plan' => $plan,
                'days_left' => null,
                'in_grace_period' => false,
                'grace_days_left' => null,
            ];

            /*
             * FREE TRIAL
             * Trial has no grace period.
             */
            if ($status === 'trial') {
                $info['is_trial'] = true;

                if ($subscription->trial_ends_at) {
                    $trialEndsAt = Carbon::parse(
                        $subscription->trial_ends_at
                    );

                    if ($now->greaterThanOrEqualTo($trialEndsAt)) {
                        $info['status'] = 'expired';
                        $info['days_left'] = 0;
                    } else {
                        $info['days_left'] = $this->calculateDaysLeft(
                            $now,
                            $trialEndsAt
                        );
                    }
                }

                $branch->setAttribute('subscription_info', $info);
                return;
            }

            /*
             * PAID SUBSCRIPTION
             * Active subscription receives a 7-day grace period.
             */
            if ($status === 'active') {
                $info['is_trial'] = false;

                if ($subscription->ends_at) {
                    $endsAt = Carbon::parse($subscription->ends_at);

                    // Subscription is still active.
                    if ($now->lessThan($endsAt)) {
                        $info['days_left'] = $this->calculateDaysLeft(
                            $now,
                            $endsAt
                        );
                    } else {
                        // Subscription has ended. Check the 7-day grace period.
                        $graceEndsAt = $endsAt->copy()->addDays(7);

                        if ($now->lessThanOrEqualTo($graceEndsAt)) {
                            $info['status'] = 'grace_period';
                            $info['in_grace_period'] = true;

                            $info['grace_days_left'] = $this->calculateDaysLeft(
                                $now,
                                $graceEndsAt
                            );
                        } else {
                            $info['status'] = 'expired';
                            $info['days_left'] = 0;
                        }
                    }
                }

                $branch->setAttribute('subscription_info', $info);
                return;
            }

            /*
             * Other statuses:
             * pending, cancelled, expired, suspended, etc.
             */
            $info['is_trial'] = false;

            if ($status === 'expired') {
                $info['days_left'] = 0;
            }

            $branch->setAttribute('subscription_info', $info);
        });

        return Inertia::render('Admin/Branches/Index', [
            'branches' => $branches,
        ]);
    }


    /**
     * Calculate remaining days using server time.
     * Uses ceil so even a partial remaining day counts as one day.
     */
    private function calculateDaysLeft(Carbon $now, Carbon $endDate): int
    {
        $secondsLeft = $endDate->getTimestamp() - $now->getTimestamp();

        if ($secondsLeft <= 0) {
            return 0;
        }

        return (int) ceil($secondsLeft / 86400);
    }


    /**
     * Show create branch page.
     */
    public function create()
    {
        return Inertia::render('Admin/Branches/Create');
    }


    /**
     * Store a new branch.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $user = Auth::user();

        Branch::create([
            'business_id' => $user->business_id,
            'name' => $validated['name'],
            'location' => $validated['location'] ?? null,
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()
            ->route('admin.branches.index')
            ->with('success', 'Branch created successfully.');
    }


    /**
     * Show edit branch page.
     */
    public function edit(Branch $branch)
    {
        return Inertia::render('Admin/Branches/Edit', [
            'branch' => $branch,
        ]);
    }


    /**
     * Update branch.
     */
    public function update(Request $request, Branch $branch)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $branch->update($validated);

        return redirect()
            ->route('admin.branches.index')
            ->with('success', 'Branch updated successfully.');
    }


    /**
     * Delete branch.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return back()->with('success', 'Branch deleted successfully.');
    }


    /**
     * Display users available for branch assignment.
     */
    public function assignUser(Branch $branch)
    {
        $users = User::whereDoesntHave('branches', function ($query) use ($branch) {
            $query->where('branches.id', $branch->id);
        })
            ->with('roles')
            ->get();

        $roles = Role::all();

        return Inertia::render('Admin/Branches/AssignUser', [
            'branch' => $branch,
            'users' => $users,
            'roles' => $roles,
        ]);
    }


    /**
     * Assign user to branch and assign role.
     */
    public function storeAssignedUser(Request $request, Branch $branch)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::findOrFail($validated['user_id']);

        // Attach branch without removing existing branch assignments.
        $user->branches()->syncWithoutDetaching([
            $branch->id => [
                'is_default' => false,
            ],
        ]);

        // Assign role if user does not already have it.
        if (!$user->hasRole($validated['role'])) {
            $user->assignRole($validated['role']);
        }

        return redirect()
            ->route('admin.branches.index')
            ->with('success', 'User assigned successfully.');
    }


    /**
     * Show branch and assigned users.
     */
    public function show(Branch $branch)
    {
        $branch->load([
            'users.roles',
            'subscription',
        ]);

        $branch->loadCount('users');

        return Inertia::render('Admin/Branches/Show', [
            'branch' => $branch,
        ]);
    }


    /**
     * Switch active branch.
     */
    public function switchBranch(Branch $branch)
    {
        $user = auth()->user();

        // Super Admin can switch to any branch.
        if ($user->hasRole('Super Admin')) {
            session([
                'branch_id' => $branch->id,
            ]);

            return back()->with(
                'success',
                'Branch imebadilishwa kikamilifu.'
            );
        }

        // Admin can switch only to branches belonging to their business.
        if ($user->hasRole('Admin')) {
            if (
                !$user->business_id ||
                $branch->business_id != $user->business_id
            ) {
                abort(403, 'Huna ruhusa ya kutumia branch hii.');
            }

            session([
                'branch_id' => $branch->id,
            ]);

            return back()->with(
                'success',
                'Branch imebadilishwa kikamilifu.'
            );
        }

        // Other users must be assigned to the branch.
        $belongsToBranch = $user->branches()
            ->where('branches.id', $branch->id)
            ->exists();

        if (!$belongsToBranch) {
            abort(403, 'Huna ruhusa ya kutumia branch hii.');
        }

        session([
            'branch_id' => $branch->id,
        ]);

        return back()->with(
            'success',
            'Branch imebadilishwa kikamilifu.'
        );
    }


    /**
     * Show register another branch page.
     */
    public function register()
    {
        return Inertia::render('Admin/Branches/Register');
    }


    /**
     * Register another branch under the user's existing business.
     * Automatically creates a 14-day free trial.
     */
    public function storeRegisteredBranch(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        $user = Auth::user();

        DB::transaction(function () use ($user, $validated) {

            // Find an existing branch belonging to this user.
            $currentBranch = $user->branches()
                ->with('business')
                ->firstOrFail();

            $business = $currentBranch->business;

            if (!$business) {
                abort(422, 'Business haijapatikana kwa branch hii.');
            }

            // Create new branch under the same business.
            $branch = Branch::create([
                'business_id' => $business->id,
                'name' => $validated['name'],
                'location' => $validated['location'] ?? null,
            ]);

            // Assign the new branch to the logged-in user.
            $user->branches()->attach($branch->id, [
                'is_default' => false,
            ]);

            // Start a 14-day free trial.
            $trialStartedAt = now();
            $trialEndsAt = $trialStartedAt->copy()->addDays(14);

            $branch->subscription()->create([
                'plan' => 'trial',
                'amount' => 0,
                'status' => 'trial',
                'trial_started_at' => $trialStartedAt,
                'trial_ends_at' => $trialEndsAt,
            ]);

            // Make the newly registered branch active.
            session([
                'branch_id' => $branch->id,
            ]);
        });

        return redirect()
            ->route('dashboard')
            ->with(
                'success',
                'Branch imeongezwa na trial ya siku 14 imeanza.'
            );
    }
}
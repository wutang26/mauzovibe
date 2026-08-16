<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Get the currently active branch for the logged-in user.
     *
     * Priority:
     * 1. Branch stored in session
     * 2. User's direct branch_id
     * 3. First branch belonging to the user
     *
     * @return \App\Models\Branch|null
     */
    private function getActiveBranch(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return null;
        }

        /*
        |--------------------------------------------------------------------------
        | 1. Try branch from session
        |--------------------------------------------------------------------------
        */

        $branchId = session('branch_id');

        if ($branchId) {

            $branch = $user->branches()
                ->where('branches.id', $branchId)
                ->with('subscription')
                ->first();

            if ($branch) {
                return $branch;
            }

            // Session contains an invalid branch
            session()->forget('branch_id');
        }

        /*
        |--------------------------------------------------------------------------
        | 2. Try user's direct branch_id
        |--------------------------------------------------------------------------
        */

        if ($user->branch_id) {

            $branch = $user->branches()
                ->where('branches.id', $user->branch_id)
                ->with('subscription')
                ->first();

            if ($branch) {

                session()->put('branch_id', $branch->id);

                return $branch;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | 3. Use first branch belonging to the user
        |--------------------------------------------------------------------------
        */

        $branch = $user->branches()
            ->with('subscription')
            ->orderBy('branches.id')
            ->first();

        if ($branch) {

            session()->put('branch_id', $branch->id);

            return $branch;
        }

        /*
        |--------------------------------------------------------------------------
        | No branch available
        |--------------------------------------------------------------------------
        */

        return null;
    }


    /**
     * Show subscription information
     * for the currently selected branch.
     */
    public function index(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Get active branch
        |--------------------------------------------------------------------------
        */

        $branch = $this->getActiveBranch($request);

        if (!$branch) {
            return redirect()
                ->route('admin.branches.index')
                ->with(
                    'error',
                    'No branch is available for your account.'
                );
        }

        /*
        |--------------------------------------------------------------------------
        | Get subscription
        |--------------------------------------------------------------------------
        */

        $subscription = $branch->subscription;


        /*
        |--------------------------------------------------------------------------
        | Calculate trial days
        |--------------------------------------------------------------------------
        */

        $trialDaysLeft = 0;

        if (
            $subscription &&
            $subscription->status === 'trial' &&
            $subscription->trial_ends_at
        ) {
            $trialDaysLeft = max(
                0,
                now()->startOfDay()->diffInDays(
                    $subscription->trial_ends_at->startOfDay(),
                    false
                )
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Calculate active subscription days
        |--------------------------------------------------------------------------
        */

        $subscriptionDaysLeft = 0;

        if (
            $subscription &&
            $subscription->status === 'active' &&
            $subscription->ends_at
        ) {
            $subscriptionDaysLeft = max(
                0,
                now()->startOfDay()->diffInDays(
                    $subscription->ends_at->startOfDay(),
                    false
                )
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Return Subscription Page
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Subscription/Index',
            [
                'branch' => $branch,

                'subscription' => $subscription,

                'trialDaysLeft' => $trialDaysLeft,

                'subscriptionDaysLeft' => $subscriptionDaysLeft,
            ]
        );
    }


    /**
     * Show subscription status for ALL branches.
     *
     * This is useful for the Branch Management page.
     *
     * Each branch will contain:
     * - subscription
     * - subscription_status
     * - subscription_days_left
     */
    public function branchSubscriptions(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            abort(403);
        }

        /*
        |--------------------------------------------------------------------------
        | Get all user's branches
        |--------------------------------------------------------------------------
        */

        $branches = $user->branches()
            ->withCount('users')
            ->with('subscription')
            ->orderBy('branches.id')
            ->get();


        /*
        |--------------------------------------------------------------------------
        | Calculate subscription information
        |--------------------------------------------------------------------------
        */

        $branches->transform(function ($branch) {

            $subscription = $branch->subscription;

            $daysLeft = 0;

            /*
            |----------------------------------------------------------------------
            | Trial
            |----------------------------------------------------------------------
            */

            if (
                $subscription &&
                $subscription->status === 'trial' &&
                $subscription->trial_ends_at
            ) {
                $daysLeft = max(
                    0,
                    now()->startOfDay()->diffInDays(
                        $subscription->trial_ends_at->startOfDay(),
                        false
                    )
                );
            }


            /*
            |----------------------------------------------------------------------
            | Active subscription
            |----------------------------------------------------------------------
            */

            elseif (
                $subscription &&
                $subscription->status === 'active' &&
                $subscription->ends_at
            ) {
                $daysLeft = max(
                    0,
                    now()->startOfDay()->diffInDays(
                        $subscription->ends_at->startOfDay(),
                        false
                    )
                );
            }


            /*
            |----------------------------------------------------------------------
            | Automatically mark expired subscriptions
            |----------------------------------------------------------------------
            */

            if (
                $subscription &&
                $subscription->status === 'trial' &&
                $subscription->trial_ends_at &&
                now()->greaterThan(
                    $subscription->trial_ends_at
                )
            ) {
                $subscription->update([
                    'status' => 'expired',
                ]);

                $subscription->refresh();

                $daysLeft = 0;
            }


            if (
                $subscription &&
                $subscription->status === 'active' &&
                $subscription->ends_at &&
                now()->greaterThan(
                    $subscription->ends_at
                )
            ) {
                $subscription->update([
                    'status' => 'expired',
                ]);

                $subscription->refresh();

                $daysLeft = 0;
            }


            /*
            |----------------------------------------------------------------------
            | Add calculated value to branch
            |----------------------------------------------------------------------
            */

            $branch->subscription_days_left = $daysLeft;

            /*
            |----------------------------------------------------------------------
            | Add easy-to-use status
            |----------------------------------------------------------------------
            */

            $branch->subscription_status =
                $subscription?->status ?? 'none';

            return $branch;
        });


        /*
        |--------------------------------------------------------------------------
        | Return Branch Management page
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/Branches/Index',
            [
                'branches' => $branches,
            ]
        );
    }


    /**
     * Start subscription process for current branch.
     */
    public function subscribe(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Get active branch
        |--------------------------------------------------------------------------
        */

        $branch = $this->getActiveBranch($request);

        if (!$branch) {
            return redirect()
                ->route('admin.branches.index')
                ->with(
                    'error',
                    'No branch is available for your account.'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Get subscription
        |--------------------------------------------------------------------------
        */

        $subscription = $branch->subscription;


        /*
        |--------------------------------------------------------------------------
        | Make sure subscription exists
        |--------------------------------------------------------------------------
        */

        if (!$subscription) {
            return redirect()
                ->route('subscription.index')
                ->with(
                    'error',
                    'This branch does not have a subscription record.'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Prevent duplicate active subscription
        |--------------------------------------------------------------------------
        */

        if (
            $subscription->status === 'active' &&
            $subscription->ends_at &&
            now()->lessThan($subscription->ends_at)
        ) {
            return redirect()
                ->route('subscription.index')
                ->with(
                    'error',
                    'This branch already has an active subscription.'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Create pending payment
        |--------------------------------------------------------------------------
        */

        $subscription->update([
            'status' => 'pending',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Temporary payment testing
        |--------------------------------------------------------------------------
        |
        | Later replace this with the real payment gateway.
        |
        */

        return redirect()
            ->route('subscription.index')
            ->with(
                'success',
                'Subscription payment has been initiated.'
            );
    }


    /**
     * TEMPORARY:
     * Simulate successful payment.
     *
     * Replace this with real payment callback/webhook later.
     */
    public function paymentSuccess(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Get active branch
        |--------------------------------------------------------------------------
        */

        $branch = $this->getActiveBranch($request);

        if (!$branch) {
            return redirect()
                ->route('admin.branches.index')
                ->with(
                    'error',
                    'No branch is available for your account.'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Get subscription
        |--------------------------------------------------------------------------
        */

        $subscription = $branch->subscription;


        /*
        |--------------------------------------------------------------------------
        | Make sure subscription exists
        |--------------------------------------------------------------------------
        */

        if (!$subscription) {
            return redirect()
                ->route('subscription.index')
                ->with(
                    'error',
                    'Subscription not found.'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | Activate subscription
        |--------------------------------------------------------------------------
        */

        $subscription->update([
            'status' => 'active',
            'started_at' => now(),
            'ends_at' => now()->addMonth(),
        ]);


        /*
        |--------------------------------------------------------------------------
        | Return to subscription page
        |--------------------------------------------------------------------------
        */

        return redirect()
            ->route('subscription.index')
            ->with(
                'success',
                'Payment successful. Your subscription is now active.'
            );
    }
}
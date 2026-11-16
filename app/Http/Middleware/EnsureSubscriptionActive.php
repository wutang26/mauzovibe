<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSubscriptionActive
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        /*
        |--------------------------------------------------------------------------
        | 1. Get logged-in user
        |--------------------------------------------------------------------------
        */

        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 2. Super Admin and Admin bypass
        |--------------------------------------------------------------------------
        */

        if ($user->hasAnyRole(['Super Admin', 'Admin'])) {
            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 3. Get selected branch
        |--------------------------------------------------------------------------
        */

        $branchId = session('branch_id');

        if (!$branchId) {
            return redirect()
                ->route('choose.branch')
                ->with('error', 'Please select a branch to continue.');
        }

        /*
        |--------------------------------------------------------------------------
        | 4. Get subscription for selected branch
        |--------------------------------------------------------------------------
        */

        $branch = $user->branches()
            ->where('branches.id', $branchId)
            ->with('subscription')
            ->first();

        /*
        |--------------------------------------------------------------------------
        | 5. Make sure branch exists
        |--------------------------------------------------------------------------
        */

        if (!$branch) {
            return redirect()
                ->route('choose.branch')
                ->with('error', 'You do not have access to this branch.');
        }

        /*
        |--------------------------------------------------------------------------
        | 6. Get subscription
        |--------------------------------------------------------------------------
        */

        $subscription = $branch->subscription;

        /*
        |--------------------------------------------------------------------------
        | 7. No subscription
        |--------------------------------------------------------------------------
        */

        if (!$subscription) {
            return redirect()
                ->route('subscription.index')
                ->with(
                    'error',
                    'This branch does not have a subscription.'
                );
        }

        /*
        |--------------------------------------------------------------------------
        | 8. Check Free Trial
        |--------------------------------------------------------------------------
        */

        if ($subscription->status === 'trial') {

            if (!$subscription->trial_ends_at) {
                return redirect()
                    ->route('subscription.index')
                    ->with(
                        'error',
                        'Your trial subscription is not configured correctly.'
                    );
            }

            // Trial expires immediately. No grace period.
            if (now()->greaterThanOrEqualTo($subscription->trial_ends_at)) {

                $subscription->update([
                    'status' => 'expired',
                ]);

                return redirect()
                    ->route('subscription.index')
                    ->with(
                        'error',
                        'Your free trial has expired. Please subscribe to continue.'
                    );
            }

            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 9. Check Paid Active Subscription
        |--------------------------------------------------------------------------
        */

        if ($subscription->status === 'active') {

            if (!$subscription->ends_at) {
                return redirect()
                    ->route('subscription.index')
                    ->with(
                        'error',
                        'Your subscription is not configured correctly.'
                    );
            }

            // Calculate the end of the 7-day grace period.
            $graceEndsAt = $subscription->ends_at
                ->copy()
                ->addDays(7);

            /*
             * Allow access while subscription is active
             * or within the 7-day grace period.
             */
            if (now()->lessThanOrEqualTo($graceEndsAt)) {

                return $next($request);
            }

            // Grace period has ended.
            $subscription->update([
                'status' => 'expired',
            ]);

            return redirect()
                ->route('subscription.index')
                ->with(
                    'error',
                    'Your subscription and 7-day grace period have expired. Please renew to continue.'
                );
        }

        /*
        |--------------------------------------------------------------------------
        | 10. Expired / Cancelled / Pending / Inactive
        |--------------------------------------------------------------------------
        */

        return redirect()
            ->route('subscription.index')
            ->with(
                'error',
                'Your subscription is not active. Please subscribe or renew to continue.'
            );
    }
}
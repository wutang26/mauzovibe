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
        | 2. Get selected branch
        |--------------------------------------------------------------------------
        */

        $branchId = session('branch_id');

        if (!$branchId) {
            return $next($request);
        }


        /*
        |--------------------------------------------------------------------------
        | 3. Get subscription for selected branch
        |--------------------------------------------------------------------------
        */

        $branch = $user->branches()
            ->where('branches.id', $branchId)
            ->with('subscription')
            ->first();


        /*
        |--------------------------------------------------------------------------
        | 4. Make sure branch exists
        |--------------------------------------------------------------------------
        */

        if (!$branch) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'You do not have access to this branch.');
        }


        /*
        |--------------------------------------------------------------------------
        | 5. Get subscription
        |--------------------------------------------------------------------------
        */

        $subscription = $branch->subscription;


        /*
        |--------------------------------------------------------------------------
        | 6. No subscription
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
        | 7. Check Trial
        |--------------------------------------------------------------------------
        */

        if ($subscription->status === 'trial') {

            // Trial has no expiry date
            if (!$subscription->trial_ends_at) {
                return redirect()
                    ->route('subscription.index')
                    ->with(
                        'error',
                        'Your trial subscription is not configured correctly.'
                    );
            }

            // Trial expired
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

            // Trial still active
            return $next($request);
        }


        /*
        |--------------------------------------------------------------------------
        | 8. Check Active Subscription
        |--------------------------------------------------------------------------
        */

        if ($subscription->status === 'active') {

            // Active subscription has no expiry date
            if (!$subscription->ends_at) {
                return redirect()
                    ->route('subscription.index')
                    ->with(
                        'error',
                        'Your subscription is not configured correctly.'
                    );
            }

            // Subscription expired
            if (now()->greaterThanOrEqualTo($subscription->ends_at)) {

                $subscription->update([
                    'status' => 'expired',
                ]);

                return redirect()
                    ->route('subscription.index')
                    ->with(
                        'error',
                        'Your subscription has expired. Please renew to continue.'
                    );
            }

            // Subscription still active
            return $next($request);
        }


        /*
        |--------------------------------------------------------------------------
        | 9. Expired / Cancelled / Inactive
        |--------------------------------------------------------------------------
        */

        return redirect()
            ->route('subscription.index')
            ->with(
                'error',
                'Your subscription is not active. Please subscribe to continue.'
            );
    }
}
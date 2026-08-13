<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Show subscription information
     * for the currently selected branch.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Get active branch
        |--------------------------------------------------------------------------
        */

        $branchId = session('branch_id');

        if (!$branchId) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'No branch selected.');
        }


        /*
        |--------------------------------------------------------------------------
        | Make sure user belongs to this branch
        |--------------------------------------------------------------------------
        */

        $branch = $user->branches()
            ->where('branches.id', $branchId)
            ->with('subscription')
            ->firstOrFail();


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
        | Calculate subscription days left
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
 * Start subscription process for current branch.
 */
public function subscribe(Request $request)
{
    $user = $request->user();

    $branchId = session('branch_id');

    if (!$branchId) {
        return redirect()
            ->route('dashboard')
            ->with('error', 'No branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Get branch belonging to user
    |--------------------------------------------------------------------------
    */

    $branch = $user->branches()
        ->where('branches.id', $branchId)
        ->with('subscription')
        ->firstOrFail();

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
    | Later we will replace this with the actual payment gateway.
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
    $user = $request->user();

    $branchId = session('branch_id');

    if (!$branchId) {
        return redirect()
            ->route('dashboard')
            ->with('error', 'No branch selected.');
    }

    /*
    |--------------------------------------------------------------------------
    | Get current branch
    |--------------------------------------------------------------------------
    */

    $branch = $user->branches()
        ->where('branches.id', $branchId)
        ->with('subscription')
        ->firstOrFail();

    $subscription = $branch->subscription;

    if (!$subscription) {
        return redirect()
            ->route('subscription.index')
            ->with('error', 'Subscription not found.');
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

    return redirect()
        ->route('subscription.index')
        ->with(
            'success',
            'Payment successful. Your subscription is now active.'
        );
}
}
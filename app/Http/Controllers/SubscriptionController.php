<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Grace period after paid subscription expiry.
     */
    private const GRACE_PERIOD_DAYS = 7;

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
                (int) ceil(
                    now()->diffInSeconds(
                        $subscription->trial_ends_at,
                        false
                    ) / 86400
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
            if (now()->lessThanOrEqualTo($subscription->ends_at)) {
                $subscriptionDaysLeft = max(
                    0,
                    (int) ceil(
                        now()->diffInSeconds(
                            $subscription->ends_at,
                            false
                        ) / 86400
                    )
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Calculate grace period
        |--------------------------------------------------------------------------
        */

        $isInGracePeriod = false;
        $graceDaysLeft = 0;
        $graceEndsAt = null;

        if (
            $subscription &&
            $subscription->status === 'active' &&
            $subscription->ends_at
        ) {
            $graceEndsAt = $subscription->ends_at
                ->copy()
                ->addDays(self::GRACE_PERIOD_DAYS);

            if (
                now()->greaterThan($subscription->ends_at) &&
                now()->lessThanOrEqualTo($graceEndsAt)
            ) {
                $isInGracePeriod = true;

                $graceDaysLeft = max(
                    0,
                    (int) ceil(
                        now()->diffInSeconds(
                            $graceEndsAt,
                            false
                        ) / 86400
                    )
                );
            }
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

                'isInGracePeriod' => $isInGracePeriod,

                'graceDaysLeft' => $graceDaysLeft,

                'graceEndsAt' => $graceEndsAt,
            ]
        );
    }


    /**
     * Show subscription status for ALL branches
     * belonging to the logged-in user.
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

            $now = now();

            $daysLeft = 0;

            $isInGracePeriod = false;

            $graceDaysLeft = 0;

            $graceEndsAt = null;

            /*
            |--------------------------------------------------------------------------
            | TRIAL SUBSCRIPTION
            |--------------------------------------------------------------------------
            */

            if (
                $subscription &&
                $subscription->status === 'trial' &&
                $subscription->trial_ends_at
            ) {
                if (
                    $now->greaterThanOrEqualTo(
                        $subscription->trial_ends_at
                    )
                ) {
                    // Trial expires immediately.
                    // No grace period.

                    $subscription->update([
                        'status' => 'expired',
                    ]);

                    $subscription->refresh();
                } else {
                    $daysLeft = max(
                        0,
                        (int) ceil(
                            $now->diffInSeconds(
                                $subscription->trial_ends_at,
                                false
                            ) / 86400
                        )
                    );
                }
            }

            /*
            |--------------------------------------------------------------------------
            | ACTIVE PAID SUBSCRIPTION
            |--------------------------------------------------------------------------
            */

            elseif (
                $subscription &&
                $subscription->status === 'active' &&
                $subscription->ends_at
            ) {
                $graceEndsAt = $subscription->ends_at
                    ->copy()
                    ->addDays(self::GRACE_PERIOD_DAYS);

                // Subscription has not expired yet.
                if (
                    $now->lessThanOrEqualTo(
                        $subscription->ends_at
                    )
                ) {
                    $daysLeft = max(
                        0,
                        (int) ceil(
                            $now->diffInSeconds(
                                $subscription->ends_at,
                                false
                            ) / 86400
                        )
                    );
                }

                // Subscription expired but is within grace period.
                elseif (
                    $now->lessThanOrEqualTo($graceEndsAt)
                ) {
                    $isInGracePeriod = true;

                    $graceDaysLeft = max(
                        0,
                        (int) ceil(
                            $now->diffInSeconds(
                                $graceEndsAt,
                                false
                            ) / 86400
                        )
                    );
                }

                // Grace period has ended.
                else {
                    $subscription->update([
                        'status' => 'expired',
                    ]);

                    $subscription->refresh();
                }
            }

            /*
            |--------------------------------------------------------------------------
            | ADD CALCULATED VALUES TO BRANCH
            |--------------------------------------------------------------------------
            */

            $branch->subscription_days_left = $daysLeft;

            $branch->subscription_is_in_grace_period =
                $isInGracePeriod;

            $branch->subscription_grace_days_left =
                $graceDaysLeft;

            $branch->subscription_grace_ends_at =
                $graceEndsAt;

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
    | Validate selected plan
    |--------------------------------------------------------------------------
    */

    $validated = $request->validate([
        'plan' => 'required|in:starter,business',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Official plan prices
    |--------------------------------------------------------------------------
    */

    $plans = [
        'starter' => 15000,
        'business' => 20000,
    ];

    $selectedPlan = $validated['plan'];
    $amount = $plans[$selectedPlan];

    /*
    |--------------------------------------------------------------------------
    | Get active branch
    |--------------------------------------------------------------------------
    */

    $branch = $this->getActiveBranch($request);

    if (!$branch) {
        return redirect()
            ->route('admin.branches.index')
            ->with('error', 'No branch is available for your account.');
    }

    /*
    |--------------------------------------------------------------------------
    | Get subscription
    |--------------------------------------------------------------------------
    */

    $subscription = $branch->subscription;

    if (!$subscription) {
        return redirect()
            ->route('subscription.index')
            ->with('error', 'Subscription record not found.');
    }

    /*
    |--------------------------------------------------------------------------
    | Save pending payment details
    |--------------------------------------------------------------------------
    */

    $subscription->update([
        'pending_plan' => $selectedPlan,
        'pending_amount' => $amount,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Return response
    |--------------------------------------------------------------------------
    */

    return redirect()
        ->route('subscription.index')
        ->with(
            'success',
            'Ombi la malipo ya mpango wa ' .
            ucfirst($selectedPlan) .
            ' limeanzishwa. Kiasi ni TZS ' .
            number_format($amount) . '.'
        );
}
    // public function subscribe(Request $request)
    // {
    //     /*
    //     |--------------------------------------------------------------------------
    //     | Get active branch
    //     |--------------------------------------------------------------------------
    //     */

    //     $branch = $this->getActiveBranch($request);

    //     if (!$branch) {
    //         return redirect()
    //             ->route('admin.branches.index')
    //             ->with(
    //                 'error',
    //                 'No branch is available for your account.'
    //             );
    //     }

    //     /*
    //     |--------------------------------------------------------------------------
    //     | Get subscription
    //     |--------------------------------------------------------------------------
    //     */

    //     $subscription = $branch->subscription;

    //     if (!$subscription) {
    //         return redirect()
    //             ->route('subscription.index')
    //             ->with(
    //                 'error',
    //                 'This branch does not have a subscription record.'
    //             );
    //     }

    //     /*
    //     |--------------------------------------------------------------------------
    //     | Prevent duplicate active subscription
    //     |--------------------------------------------------------------------------
    //     */

    //     if (
    //         $subscription->status === 'active' &&
    //         $subscription->ends_at &&
    //         now()->lessThan($subscription->ends_at)
    //     ) {
    //         return redirect()
    //             ->route('subscription.index')
    //             ->with(
    //                 'error',
    //                 'This branch already has an active subscription.'
    //             );
    //     }

    //     /*
    //     |--------------------------------------------------------------------------
    //     | Create pending payment
    //     |--------------------------------------------------------------------------
    //     |
    //     | This is the existing temporary payment flow.
    //     | Replace it with the real payment gateway later.
    //     |
    //     */

    //     $subscription->update([
    //         'status' => 'pending',
    //     ]);

    //     return redirect()
    //         ->route('subscription.index')
    //         ->with(
    //             'success',
    //             'Subscription payment has been initiated.'
    //         );
    // }


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
        | Calculate new subscription period
        |--------------------------------------------------------------------------
        |
        | If the existing subscription has not expired,
        | extend from its current expiry date.
        |
        | If it has expired or grace period has passed,
        | start the new month from the payment date.
        |
        */

        $now = now();

        $startDate = $now;

        if (
            $subscription->ends_at &&
            $now->lessThan($subscription->ends_at)
        ) {
            $startDate = $subscription->ends_at->copy();
        }

        /*
        |--------------------------------------------------------------------------
        | Activate subscription
        |--------------------------------------------------------------------------
        */

        $subscription->update([
            'status' => 'active',

            'started_at' => $startDate,

            'ends_at' => $startDate->copy()->addMonth(),
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
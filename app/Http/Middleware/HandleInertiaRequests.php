<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // ==========================================================
        // ACTIVE BRANCH
        // ==========================================================

        $activeBranch = null;
        $subscription = null;

        if ($request->user()) {
            $branchId = session('branch_id');

            // Get active branch from session
            if ($branchId) {
                $activeBranch = \App\Models\Branch::with('subscription')
                    ->whereHas('users', function ($query) use ($request) {
                        $query->where('users.id', $request->user()->id);
                    })
                    ->find($branchId);
            }

            // Fallback to user's first branch
            if (!$activeBranch) {
                $activeBranch = $request->user()
                    ->branches()
                    ->with('subscription')
                    ->first();

                if ($activeBranch) {
                    session(['branch_id' => $activeBranch->id]);
                }
            }

            $subscription = $activeBranch?->subscription;
        }

        // ==========================================================
        // CALCULATE TRIAL STATUS
        // ==========================================================

        $daysRemaining = null;
        $trialStatus = $subscription?->status;

        if (
            $subscription?->status === 'trial' &&
            $subscription->trial_ends_at
        ) {
            $secondsRemaining = now()->diffInSeconds(
                $subscription->trial_ends_at,
                false
            );

            $daysRemaining = max(
                0,
                (int) ceil($secondsRemaining / 86400)
            );

            // Calculate expired status for display only.
            // Subscription middleware handles database status.
            if ($secondsRemaining <= 0) {
                $trialStatus = 'expired';
            }
        }

        // ==========================================================
        // PAID SUBSCRIPTION GRACE PERIOD
        // ==========================================================

        $isInGracePeriod = false;
        $graceDaysRemaining = 0;
        $graceEndsAt = null;

        if (
            $subscription?->status === 'active' &&
            $subscription->ends_at
        ) {
            $graceEndsAt = $subscription->ends_at
                ->copy()
                ->addDays(7);

            if (now()->greaterThan($subscription->ends_at)) {
                $isInGracePeriod = now()->lessThanOrEqualTo($graceEndsAt);

                if ($isInGracePeriod) {
                    $graceDaysRemaining = max(
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
        }

        // ==========================================================
        // SHARED PROPS
        // ==========================================================

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $request->user()
                    ? $request->user()->load([
                        'branches',
                        'roles',
                    ])
                    : null,

                'active_branch' => $activeBranch,

                'subscription' => $subscription,

                'trial' => [
                    'status' => $trialStatus,
                    'days_remaining' => $daysRemaining,
                    'trial_ends_at' => $subscription?->trial_ends_at,
                    'is_expired' => $trialStatus === 'expired',
                ],

                'subscription_grace' => [
                    'is_active' => $isInGracePeriod,
                    'days_remaining' => $graceDaysRemaining,
                    'ends_at' => $graceEndsAt,
                ],
            ],
        ];
    }
}
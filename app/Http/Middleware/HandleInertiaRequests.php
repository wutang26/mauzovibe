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
    // public function share(Request $request): array
    // {
    //     // ==========================================================
    //     // ACTIVE BRANCH + SUBSCRIPTION
    //     // ==========================================================

    //     $activeBranch = session('branch_id')
    //         ? \App\Models\Branch::with('subscription')
    //             ->find(session('branch_id'))
    //         : null;

    //     $subscription = $activeBranch?->subscription;

    //     // ==========================================================
    //     // CALCULATE REMAINING TRIAL DAYS
    //     // ==========================================================

    //     $daysRemaining = null;

    //     if (
    //         $subscription?->status === 'trial' &&
    //         $subscription->trial_ends_at
    //     ) {
    //         $daysRemaining = max(
    //             0,
    //             now()->diffInDays(
    //                 $subscription->trial_ends_at,
    //                 false
    //             )
    //         );
    //     }

    //     return [
    //         ...parent::share($request),

    //         'auth' => [

    //             // ==================================================
    //             // AUTHENTICATED USER
    //             // ==================================================

    //             'user' => $request->user()
    //                 ? $request->user()->load([
    //                     'branches',
    //                     'roles',
    //                 ])
    //                 : null,

    //             // ==================================================
    //             // ACTIVE BRANCH
    //             // ==================================================

    //             'active_branch' => $activeBranch,

    //             // ==================================================
    //             // SUBSCRIPTION
    //             // ==================================================

    //             'subscription' => $subscription,

    //             // ==================================================
    //             // FREE TRIAL INFORMATION
    //             // ==================================================

    //             'trial' => [
    //                 'status' => $subscription?->status,

    //                 'days_remaining' => $daysRemaining,

    //                 'trial_ends_at' => $subscription?->trial_ends_at,

    //                 'is_expired' => $subscription?->status === 'expired',
    //             ],
    //         ],
    //     ];
    // }

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

    // Trial expired
    if ($daysRemaining <= 0) {
        $trialStatus = 'expired';

        $subscription->update([
            'status' => 'expired',
        ]);
    }
}
        // Trial has expired
        if ($daysRemaining <= 0) {

            $trialStatus = 'expired';

            $subscription->update([
                'status' => 'expired',
            ]);
        }
    }

    // ==========================================================
    // SHARED PROPS
    // ==========================================================

    return [
        ...parent::share($request),

        'auth' => [

            // ==================================================
            // AUTHENTICATED USER
            // ==================================================

            'user' => $request->user()
                ? $request->user()->load([
                    'branches',
                    'roles',
                ])
                : null,

            // ==================================================
            // ACTIVE BRANCH
            // ==================================================

            'active_branch' => $activeBranch,

            // ==================================================
            // SUBSCRIPTION
            // ==================================================

            'subscription' => $subscription,

            // ==================================================
            // FREE TRIAL
            // ==================================================

            'trial' => [

                'status' => $trialStatus,

                'days_remaining' => $daysRemaining,

                'trial_ends_at' => $subscription?->trial_ends_at,

                'is_expired' => $trialStatus === 'expired',
            ],
        ],
    ];
}
}
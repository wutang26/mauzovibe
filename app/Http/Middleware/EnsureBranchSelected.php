<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBranchSelected
{
    /**
     * Ensure normal users have an active branch.
     *
     * Admin and Super Admin do not require a branch.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | 1. User is not authenticated
        |--------------------------------------------------------------------------
        */

        if (!$user) {
            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 2. ADMIN & SUPER ADMIN
        |--------------------------------------------------------------------------
        |
        | Admin and Super Admin manage ALL branches.
        | They do NOT need:
        |
        | - session branch_id
        | - users.branch_id
        | - default branch
        | - branch selection
        |
        | Therefore, let them continue directly to the requested page.
        |
        */

        if ($user->hasAnyRole(['Admin', 'Super Admin'])) {
            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 3. NORMAL USERS
        |--------------------------------------------------------------------------
        |
        | From this point onward, branch selection applies only to normal users.
        |
        */

        $activeBranchId = session('branch_id');

        /*
        |--------------------------------------------------------------------------
        | 4. Use existing active branch from session
        |--------------------------------------------------------------------------
        */

        if ($activeBranchId) {

            $hasAccess = $user->branches()
                ->where('branches.id', $activeBranchId)
                ->exists();

            if ($hasAccess) {
                return $next($request);
            }

            /*
            | Session contains a branch the user no longer belongs to.
            */
            session()->forget('branch_id');
        }

        /*
        |--------------------------------------------------------------------------
        | 5. Try user's default branch
        |--------------------------------------------------------------------------
        */

        $defaultBranch = $user->branches()
            ->wherePivot('is_default', true)
            ->first();

        if ($defaultBranch) {

            session([
                'branch_id' => $defaultBranch->id,
            ]);

            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 6. Fallback to users.branch_id
        |--------------------------------------------------------------------------
        */

        if ($user->branch_id) {

            $hasAccess = $user->branches()
                ->where('branches.id', $user->branch_id)
                ->exists();

            if ($hasAccess) {

                session([
                    'branch_id' => $user->branch_id,
                ]);

                return $next($request);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | 7. Normal user has no branch
        |--------------------------------------------------------------------------
        */

        return redirect()->route('choose.branch');
    }
}
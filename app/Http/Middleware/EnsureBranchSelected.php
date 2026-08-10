<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBranchSelected
{
    /**
     * Ensure the user has an active branch.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        /*
        |--------------------------------------------------------------------------
        | 1. Use existing active branch from session
        |--------------------------------------------------------------------------
        */

        $activeBranchId = session('branch_id');

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
        | 2. Try user's default branch
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
        | 3. Fallback to users.branch_id
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
        | 4. User has no active branch
        |--------------------------------------------------------------------------
        */

        return redirect()->route('branches.choose');
    }
}
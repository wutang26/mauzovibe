<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BranchSelectionController extends Controller
{
    /**
     * Show branch selection page.
     */
    public function index()
    {
        $user = Auth::user();

        // Get only branches assigned to this user
        $branches = $user->branches()->get();

        // No branches assigned
        if ($branches->isEmpty()) {
            return redirect()->route('dashboard');
        }

        // If user has only one branch,
        // select it automatically.
        if ($branches->count() === 1) {
            session()->put(
                'branch_id',
                $branches->first()->id
            );

            return redirect()->route('dashboard');
        }

        // User has multiple branches
        return Inertia::render('ChooseBranch', [
            'branches' => $branches,
        ]);
    }

    /**
     * Store selected branch.
     */
    public function store(Request $request)
    {
        $request->validate([
            'branch_id' => [
                'required',
                'integer',
                'exists:branches,id',
            ],
        ]);

        $user = Auth::user();

        // Find selected branch among user's assigned branches
        $branch = $user->branches()
            ->where('branches.id', $request->branch_id)
            ->first();

        // User does not belong to this branch
        if (!$branch) {
            abort(403, 'You are not assigned to this branch.');
        }

        // Save selected branch in session
        session()->put('branch_id', $branch->id);

        // Redirect to dashboard
        return redirect()->route('dashboard');
    }
}
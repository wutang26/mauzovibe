<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Subscription;


class BranchController extends Controller
{

    public function index()
{
    $user = auth()->user();

    // Super Admin anaweza kuona branches zote
    if ($user->hasRole('Super Admin')) {

        $branches = Branch::with('users.roles')
            ->withCount('users')
            ->latest()
            ->get();

    }

    // Admin anaona branches za biashara yake tu
    elseif ($user->hasRole('Admin') && $user->business_id) {

        $branches = Branch::where('business_id', $user->business_id)
            ->with('users.roles')
            ->withCount('users')
            ->latest()
            ->get();

    }

    // Watumiaji wengine wanaona branches walizopangiwa tu
    else {

        $branches = $user->branches()
            ->with('users.roles')
            ->withCount('users')
            ->latest('branches.created_at')
            ->get();

    }

    return Inertia::render('Admin/Branches/Index', [
        'branches' => $branches,
    ]);
}



    public function create()
    {

        return inertia('Admin/Branches/Create');

    }



    public function store(Request $request)
    {

        $request->validate([

            'name'=>'required',
            'location'=>'nullable',
            'description'=>'nullable'

        ]);


        Branch::create([

            'name'=>$request->name,
            'location'=>$request->location,
            'description'=>$request->description

        ]);


        return redirect()
            ->route('admin.branches.index')
            ->with('success','Branch created successfully');

    }

    public function edit(Branch $branch)
    {

        return inertia('Admin/Branches/Edit',[

            'branch'=>$branch

        ]);

    }



    public function update(Request $request, Branch $branch)
    {

        $request->validate([

            'name'=>'required'

        ]);


        $branch->update($request->all());


        return redirect()
            ->route('admin.branches.index');

    }



    public function destroy(Branch $branch)
    {

        $branch->delete();


        return back();

    }

    //Assign user to Branch
  

public function assignUser(Branch $branch)
{

    $users = User::whereDoesntHave('branches', function ($query) use ($branch) {

        $query->where('branches.id', $branch->id);

    })
    ->with('roles')
    ->get();


    $roles = Role::all();


    return Inertia::render(
        'Admin/Branches/AssignUser',
        [
            'branch' => $branch,
            'users' => $users,
            'roles' => $roles
        ]
    );

}

//Store asigned Branch
public function storeAssignedUser(Request $request, Branch $branch)
{

    $request->validate([

        'user_id'=>'required|exists:users,id',

        'role'=>'required|exists:roles,name'

    ]);


    $user = User::findOrFail($request->user_id);


    // Assign branch using pivot table
    $user->branches()->syncWithoutDetaching([

        $branch->id => [
            'is_default'=>false
        ]

    ]);



    // Assign role
    if(!$user->hasRole($request->role))
    {

        $user->assignRole($request->role);

    }



    return redirect()
        ->route('admin.branches.index')
        ->with(
            'success',
            'User assigned successfully'
        );

}

//Show Assigned in Branch
public function show(Branch $branch)
{
    $branch->load([
        'users.roles'
    ]);

    $branch->loadCount('users');


    return Inertia::render(
        'Admin/Branches/Show',
        [
            'branch'=>$branch
        ]
    );
}

//Switch Branches

public function switchBranch(Branch $branch)
{
    $user = auth()->user();

    // Super Admin anaweza kubadilisha kwenda branch yoyote
    if ($user->hasRole('Super Admin')) {
        session([
            'branch_id' => $branch->id,
        ]);

        return back()->with('success', 'Branch imebadilishwa kikamilifu.');
    }

    // Admin anaweza kubadilisha kwenda branch ya biashara yake tu
    if ($user->hasRole('Admin')) {

        if (!$user->business_id || $branch->business_id != $user->business_id) {
            abort(403, 'Huna ruhusa ya kutumia branch hii.');
        }

        session([
            'branch_id' => $branch->id,
        ]);

        return back()->with('success', 'Branch imebadilishwa kikamilifu.');
    }

    // Watumiaji wengine lazima wawe wamepangiwa branch
    $belongsToBranch = $user->branches()
        ->where('branches.id', $branch->id)
        ->exists();

    if (!$belongsToBranch) {
        abort(403, 'Huna ruhusa ya kutumia branch hii.');
    }

    session([
        'branch_id' => $branch->id,
    ]);

    return back()->with('success', 'Branch imebadilishwa kikamilifu.');
}
// public function switchBranch(Branch $branch)
// {

//     $user = auth()->user();

//     // Check user belongs to branch

//     if(!$user->branches->contains($branch->id))
//     {
//         abort(403);
//     }

//     session([
//         'branch_id'=>$branch->id
//     ]);

//     return back();

// }

/**
 * Show register another branch page.
 */
public function register()
{
    return Inertia::render('Admin/Branches/Register');
}


/**
 * Store another branch for logged-in user.
 */
// public function storeRegisteredBranch(Request $request)
// {
//     $request->validate([
//         'name' => 'required|string|max:255',
//         'location' => 'nullable|string|max:255',
//     ]);

//     DB::transaction(function () use ($request) {

//         $user = Auth::user();

//         // Create new branch
//         $branch = Branch::create([
//             'name' => $request->name,
//             'location' => $request->location,
//         ]);

//         // Attach branch to current user
//         $user->branches()->attach(
//             $branch->id,
//             [
//                 'is_default' => false,
//             ]
//         );
//     });

//     return redirect()
//         ->route('dashboard')
//         ->with('success', 'Branch imeongezwa kikamilifu.');
// }

public function storeRegisteredBranch(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'location' => 'nullable|string|max:255',
    ]);

    DB::transaction(function () use ($request) {

        $user = Auth::user();

        // Get current user's business through existing branch
        $currentBranch = $user->branches()
            ->with('business')
            ->firstOrFail();

        $business = $currentBranch->business;

        // Create new branch under the SAME business
        $branch = Branch::create([
            'business_id' => $business->id,
            'name' => $request->name,
            'location' => $request->location,
        ]);

        // Attach new branch to current user
        $user->branches()->attach(
            $branch->id,
            [
                'is_default' => false,
            ]
        );

        // // Create 30-day free trial for the NEW branch
        // $trialStartedAt = now();

        // $trialEndsAt = now()->addDays(30);

        // $branch->subscription()->create([
        //     'plan' => 'monthly',
        //     'amount' => 10000,
        //     'status' => 'trial',
        //     'trial_started_at' => $trialStartedAt,
        //     'trial_ends_at' => $trialEndsAt,
        // ]);

        // Create 14-day free trial for the NEW branch
        $trialStartedAt = now();

        $trialEndsAt = $trialStartedAt->copy()->addDays(14);

        $branch->subscription()->create([
            'plan' => 'trial',
            'amount' => 0,
            'status' => 'trial',
            'trial_started_at' => $trialStartedAt,
            'trial_ends_at' => $trialEndsAt,
        ]);

        // Make the newly created branch the active branch
        session([
            'branch_id' => $branch->id,
        ]);
    });

    return redirect()
        ->route('dashboard')
        ->with('success', 'Branch imeongezwa na trial ya siku 14 imeanza.');
}
}
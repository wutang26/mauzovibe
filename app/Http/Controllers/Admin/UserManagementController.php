<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\Branch;

class UserManagementController extends Controller
{

    /**
     * Display all users
     */
    public function index()
    {
        // $users = User::with(['roles','branch'])->get();

        // return inertia('Admin/Users/Index',[
        //     'users'=>$users
        // ]);

        $users = User::with('roles')->get();

        return inertia('Admin/Users/Index', [
            'users' => $users,
        ]);

    }

    /**
     * Open manage user page
     */
    public function edit(User $user)
    {

        $roles = Role::all();

        $permissions = Permission::all();

        return inertia('Admin/Users/Manage', [
            'user'        => $user->load('roles', 'permissions','branches'),
            'roles'       => $roles,
            'permissions' => $permissions,
            'branches' => Branch::orderBy('name')->get(),
        ]);

    }

    /**
     * Assign role
     */
    public function updateRole(Request $request, User $user)
    {

        $request->validate([
            'role' => 'required',
        ]);

        // Remove old role
        $user->syncRoles([
            $request->role,
        ]);

        return back()->with(
            'success',
            'Role updated successfully'
        );

    }

    /**
     * Assign permissions
     */
    public function updatePermissions(Request $request, User $user)
    {

        $request->validate([
            'permissions' => 'array',
        ]);

        $user->syncPermissions(
            $request->permissions ?? []
        );

        return back()->with(
            'success',
            'Permissions updated successfully'
        );

    }

    //Update Branch
    public function updateBranch(Request $request, User $user)
{
    $request->validate([
        'branch_id' => 'nullable|exists:branches,id',
    ]);

    $user->update([
        'branch_id' => $request->branch_id,
    ]);

    return back()->with(
        'success',
        'Branch updated successfully.'
    );
}

}

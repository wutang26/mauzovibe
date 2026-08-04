<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{

    public function index()
    {

        $branches = Branch::withCount('users')
            ->latest()
            ->get();


        return inertia('Admin/Branches/Index',[
            'branches'=>$branches
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

}
<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;



class BranchSelectionController extends Controller
{


public function index()
{


$user = auth()->user();



return Inertia::render(

'ChooseBranch',

[

'branches'=>$user->branches

]


);


}





public function store(Request $request)
{


$request->validate([


'branch_id'=>'required|exists:branches,id'


]);




$user = auth()->user();



/*
 Check user owns this branch
*/


if(!$user->branches()
->where(
'branch_id',
$request->branch_id
)
->exists())
{


abort(403);


}





session([

'branch_id'=>$request->branch_id

]);




return redirect()
        ->route('dashboard');


}


}
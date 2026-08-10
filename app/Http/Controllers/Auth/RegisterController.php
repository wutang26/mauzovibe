<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class RegisterController extends Controller
{


    public function store(Request $request)
    {
        
        $request->validate([

            'name'=>'required|string|max:255',

            'email'=>'required|email|unique:users',

            'password'=>'required|min:8',

            'business_name'=>'required|string|max:255',

            'location'=>'nullable|string',

        ]);

        DB::transaction(function() use($request){
            // Create User
            $user = User::create([
                'name'=>$request->name,

                'email'=>$request->email,

                'password'=>Hash::make(
                    $request->password
                ),

            ]);

            // Create First Business Branch

            $branch = Branch::create([

                'name'=>$request->business_name,

                'location'=>$request->location,

            ]);

            // Attach user to branch

            $user->branches()->attach(

                $branch->id,

                [

                    'is_default'=>true

                ]

            );

            // Login user automatically

            auth()->login($user);

            // Set active branch

            session([

                'branch_id'=>$branch->id

            ]);
        });

        return redirect()
                ->route('dashboard');
    }


}
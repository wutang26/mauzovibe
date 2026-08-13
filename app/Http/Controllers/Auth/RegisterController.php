<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Business;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',

            'email' => 'required|email|unique:users',

            'password' => 'required|min:8',

            'business_name' => 'required|string|max:255',

            'location' => 'nullable|string',
        ]);

        $user = DB::transaction(function () use ($request) {

            /*
            |--------------------------------------------------------------------------
            | 1. Create User
            |--------------------------------------------------------------------------
            */

            $user = User::create([
                'name' => $request->name,

                'email' => $request->email,

                'password' => Hash::make(
                    $request->password
                ),
            ]);


            /*
            |--------------------------------------------------------------------------
            | 2. Create Business
            |--------------------------------------------------------------------------
            */

            $business = Business::create([
                'name' => $request->business_name,
            ]);


            /*
            |--------------------------------------------------------------------------
            | 3. Create First Branch
            |--------------------------------------------------------------------------
            */

            $branch = Branch::create([
                'business_id' => $business->id,

                'name' => $request->business_name,

                'location' => $request->location,
            ]);


            /*
            |--------------------------------------------------------------------------
            | 4. Attach User To Branch
            |--------------------------------------------------------------------------
            */

            $user->branches()->attach(
                $branch->id,
                [
                    'is_default' => true,
                ]
            );


            /*
            |--------------------------------------------------------------------------
            | 5. Create 30-Day Free Trial
            |--------------------------------------------------------------------------
            */

            $trialStartedAt = now();

            $trialEndsAt = now()->addDays(30);

            $branch->subscription()->create([
                'plan' => 'monthly',

                'amount' => 10000,

                'status' => 'trial',

                'trial_started_at' => $trialStartedAt,

                'trial_ends_at' => $trialEndsAt,
            ]);


            return $user;
        });


        /*
        |--------------------------------------------------------------------------
        | 6. Login User
        |--------------------------------------------------------------------------
        */

        auth()->login($user);


        /*
        |--------------------------------------------------------------------------
        | 7. Set Active Branch
        |--------------------------------------------------------------------------
        */

        $branch = $user->branches()
            ->wherePivot('is_default', true)
            ->first();

        session([
            'branch_id' => $branch->id,
        ]);


        /*
        |--------------------------------------------------------------------------
        | 8. Redirect
        |--------------------------------------------------------------------------
        */

        return redirect()->route('dashboard');
    }
}
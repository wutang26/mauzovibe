<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketplaceProfileController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | MARKETPLACE PROFILE
    |--------------------------------------------------------------------------
    */

    public function profile(Request $request)
    {
        return Inertia::render(
            'MarketplaceSettings/Profile/Index'
        );
    }


    /*
    |--------------------------------------------------------------------------
    | EDIT MARKETPLACE PROFILE
    |--------------------------------------------------------------------------
    */

    public function edit(Request $request)
    {
        return Inertia::render(
            'MarketplaceSettings/Profile/Edit'
        );
    }


    /*
    |--------------------------------------------------------------------------
    | UPDATE MARKETPLACE PROFILE
    |--------------------------------------------------------------------------
    */

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],
        ]);

        $user->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
        ]);

        return redirect()
            ->route('marketplace.settings.profile')
            ->with(
                'success',
                'Wasifu wako umefanikiwa kusasishwa.'
            );
    }
}


<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketplaceSellerController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | MARKETPLACE SELLER DASHBOARD - SALES
    |--------------------------------------------------------------------------
    |
    | Inaonyesha bidhaa za seller na taarifa za mauzo.
    |
    */

    public function sales(Request $request)
    {
        $user = $request->user();

        $listings = MarketplaceListing::where('user_id', $user->id)
            ->latest()
            ->paginate(20);

        return Inertia::render('Marketplace/Sales', [
            'listings' => $listings,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | MARKETPLACE SELLER - MESSAGES
    |--------------------------------------------------------------------------
    |
    | Kwa sasa tunaweka page structure.
    | Message system tutajenga baada ya Message model/table.
    |
    */

    public function messages(Request $request)
    {
        return Inertia::render('Marketplace/Messages', [
            'messages' => [],
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | MARKETPLACE SELLER - EARNINGS / ACCOUNTING
    |--------------------------------------------------------------------------
    |
    | Hesabu za seller.
    | Kwa sasa tunatumia listings kama msingi mpaka
    | sales/order system ijengwe.
    |
    */

    public function earnings(Request $request)
    {
        $user = $request->user();

        $totalListings = MarketplaceListing::where(
            'user_id',
            $user->id
        )->count();

        $activeListings = MarketplaceListing::where(
            'user_id',
            $user->id
        )
            ->where('status', 'active')
            ->count();

        $soldListings = MarketplaceListing::where(
            'user_id',
            $user->id
        )
            ->where('status', 'sold')
            ->count();

        return Inertia::render('Marketplace/Earnings', [
            'summary' => [
                'total_listings' => $totalListings,
                'active_listings' => $activeListings,
                'sold_listings' => $soldListings,
            ],
        ]);
    }
}


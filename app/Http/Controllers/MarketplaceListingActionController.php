<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceListing;
use App\Models\MarketplaceReport;
use App\Models\SavedListing;
use Illuminate\Http\Request;

class MarketplaceListingActionController extends Controller
{
    /*
|--------------------------------------------------------------------------
| ADMIN - VIEW MARKETPLACE REPORTS
|--------------------------------------------------------------------------
*/

public function index()
{
    $reports = MarketplaceReport::with([
        'user',
        'listing',
    ])
        ->latest()
        ->paginate(20);

    return inertia('Admin/Reports/Marketplace', [
        'reports' => $reports,
    ]);
}
    /*
    |--------------------------------------------------------------------------
    | SAVE / UNSAVE LISTING
    |--------------------------------------------------------------------------
    */

    public function toggleSave(Request $request, MarketplaceListing $listing)
    {
        $user = $request->user();

        $saved = SavedListing::where('user_id', $user->id)
            ->where('listing_id', $listing->id)
            ->first();

        if ($saved) {
            $saved->delete();

            return back()->with('saved', false);
        }

        SavedListing::create([
            'user_id' => $user->id,
            'listing_id' => $listing->id,
        ]);

        return back()->with('saved', true);
    }


    /*
    |--------------------------------------------------------------------------
    | REPORT LISTING
    |--------------------------------------------------------------------------
    */

    public function report(Request $request, MarketplaceListing $listing)
    {
        $validated = $request->validate([
            'reason' => [
                'required',
                'string',
                'max:100',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);

        $alreadyReported = MarketplaceReport::where('user_id', $request->user()->id)
            ->where('listing_id', $listing->id)
            ->exists();

        if ($alreadyReported) {
            return back()->with(
                'error',
                'Umeshairipoti tangazo hili tayari.'
            );
        }

        MarketplaceReport::create([
            'user_id' => $request->user()->id,
            'listing_id' => $listing->id,
            'reason' => $validated['reason'],
            'description' => $validated['description'] ?? null,
            'status' => 'pending',
        ]);

        return back()->with(
            'success',
            'Asante. Ripoti yako imetumwa kwa MauzoVibe.'
        );
    }

    /*
|--------------------------------------------------------------------------
| ADMIN VIEW REPORT
|--------------------------------------------------------------------------
*/

public function adminShowReport(MarketplaceReport $report)
{
    $report->load([
        'user',
        'listing.user',
    ]);

    return \Inertia\Inertia::render('Admin/Reports/MarketplaceShow', [
        'report' => $report,
    ]);
}


/*
|--------------------------------------------------------------------------
| ADMIN UPDATE REPORT STATUS
|--------------------------------------------------------------------------
*/

public function updateReportStatus(
    Request $request,
    MarketplaceReport $report
) {
    $validated = $request->validate([
        'status' => [
            'required',
            'in:pending,reviewed,resolved,rejected',
        ],
    ]);

    $report->update([
        'status' => $validated['status'],
    ]);

    return back()->with(
        'success',
        'Report status imebadilishwa kikamilifu.'
    );
}



/*
|--------------------------------------------------------------------------
| ADMIN DISABLE REPORTED LISTING
|--------------------------------------------------------------------------
*/

public function disableReportedListing(
    Request $request,
    MarketplaceReport $report
) {
    $report->load('listing');

    if (!$report->listing) {
        return back()->with(
            'error',
            'Listing hii haipo tena.'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Disable listing
    |--------------------------------------------------------------------------
    */

    $report->listing->update([
        'status' => 'inactive',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Mark report as resolved
    |--------------------------------------------------------------------------
    */

    $report->update([
        'status' => 'resolved',
    ]);

    return back()->with(
        'success',
        'Listing imezimwa na report imewekwa kuwa resolved.'
    );
}
}
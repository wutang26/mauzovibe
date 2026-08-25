<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceCategory;
use App\Models\MarketplaceListing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class MarketplaceController extends Controller
{
    /**
     * Marketplace Home
     */
    public function index(Request $request): Response
    {
        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        | Load all active categories.
        |
        | We keep all categories available to the frontend so that:
        | - First 7 can be shown as Quick Categories
        | - Remaining categories can be revealed with "View More"
        | - Desktop sidebar can show all categories
        |--------------------------------------------------------------------------
        */

                $categories = MarketplaceCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->select([
                'id',
                'name',
                'slug',
                'icon',
                'listings_count',
            ])
            ->get()
            ->map(function ($category) {

                $iconMap = [
                    'Electronics' => 'fa-tv',
                    'Vehicles' => 'fa-car-side',
                    'Property' => 'fa-house',
                    'Fashion' => 'fa-shirt',
                    'Jobs' => 'fa-briefcase',
                    'Services' => 'fa-screwdriver-wrench',
                    'Furniture' => 'fa-couch',
                    'Phones' => 'fa-mobile-screen-button',
                    'Computers' => 'fa-laptop',
                    'Beauty' => 'fa-wand-magic-sparkles',
                    'Sports' => 'fa-dumbbell',
                    'Agriculture' => 'fa-wheat-awn',
                    'Animals' => 'fa-paw',
                    'Baby Products' => 'fa-baby',
                    'Books' => 'fa-book-open',
                    'Gaming' => 'fa-gamepad',
                    'Music' => 'fa-music',
                    'Health' => 'fa-heart-pulse',
                    'Industrial Equipment' => 'fa-industry',
                    'Other' => 'fa-layer-group',
                ];

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'icon' => $iconMap[$category->name]
                        ?? $category->icon
                        ?? 'fa-tag',
                    'listings_count' => (int) ($category->listings_count ?? 0),
                ];
            });

        /*
        |--------------------------------------------------------------------------
        | QUICK CATEGORIES
        |--------------------------------------------------------------------------
        | Only first 7 categories are shown initially.
        |
        | The remaining categories are still sent through "categories"
        | and React will reveal them using View More.
        |--------------------------------------------------------------------------
        */

        $quickCategories = $categories->take(10)->values();


        /*
        |--------------------------------------------------------------------------
        | FEATURED PRODUCTS
        |--------------------------------------------------------------------------
        */

        /*
|--------------------------------------------------------------------------
| FEATURED / LATEST PRODUCTS
|--------------------------------------------------------------------------
| Every active product added by a seller appears here.
| Newest products are shown first.
|--------------------------------------------------------------------------
*/

$featuredProducts = Cache::remember(
    'marketplace.featured.v3',
    now()->addMinutes(5),
    function () {

        return MarketplaceListing::where('status', 'active')

            ->with('category:id,name,slug')

            ->select([
                'id',
                'marketplace_category_id',
                'title',
                'slug',
                'price',
                'condition',
                'location',
                'city',
                'images',
                'created_at',
            ])

            ->latest('created_at')

            ->take(12)

            ->get()

            ->map(function ($listing) {

                return [
                    'id' => $listing->id,

                    'title' => $listing->title,

                    'slug' => $listing->slug,

                    'price' => $listing->price,

                    'formatted_price' =>
                        'TZS ' . number_format($listing->price),

                    'condition' => $listing->condition,

                    'location' =>
                        $listing->location
                        ?? $listing->city
                        ?? 'Tanzania',

                    'image' =>
                        is_array($listing->images)
                        && count($listing->images) > 0
                            ? $listing->images[0]
                            : null,

                    'category' =>
                        $listing->category?->name,
                ];
            });
    }
);

        /*
        |--------------------------------------------------------------------------
        | USER LOCATION
        |--------------------------------------------------------------------------
        */

        $userLocation =
            $request->user()?->city
            ?? $request->user()?->location
            ?? 'Tabora, Tanzania';


        /*
        |--------------------------------------------------------------------------
        | INERTIA RESPONSE
        |--------------------------------------------------------------------------
        */

        return Inertia::render('Marketplace/Home', [

            // ALL categories
            'categories' => $categories,

            // First 7 categories
            'quickCategories' => $quickCategories,

            // Featured products
            'featuredProducts' => $featuredProducts,

            // Location
            'userLocation' => $userLocation,
        ]);
    }

    /**
 * Marketplace Dashboard
 */
public function dashboard(): Response
{
    $categories = Cache::remember(
        'marketplace.categories.dashboard.v1',
        now()->addMinutes(30),
        function () {

            return MarketplaceCategory::where('is_active', true)
                ->orderBy('sort_order')
                ->select([
                    'id',
                    'name',
                    'slug',
                    'icon',
                ])
                ->get()
                ->map(function ($category) {

                    $iconMap = [

                        'Electronics' => 'fa-tv',
                        'Vehicles' => 'fa-car-side',
                        'Property' => 'fa-house',
                        'Fashion' => 'fa-shirt',
                        'Jobs' => 'fa-briefcase',
                        'Services' => 'fa-screwdriver-wrench',
                        'Furniture' => 'fa-couch',

                        'Phones' => 'fa-mobile-screen-button',
                        'Computers' => 'fa-laptop',
                        'Beauty' => 'fa-wand-magic-sparkles',
                        'Sports' => 'fa-dumbbell',
                        'Agriculture' => 'fa-wheat-awn',
                        'Animals' => 'fa-paw',
                        'Baby Products' => 'fa-baby',
                        'Books' => 'fa-book-open',
                        'Gaming' => 'fa-gamepad',
                        'Music' => 'fa-music',
                        'Health' => 'fa-heart-pulse',
                        'Industrial Equipment' => 'fa-industry',
                        'Other' => 'fa-layer-group',
                    ];

                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => $category->slug,

                        'icon' => $iconMap[$category->name]
                            ?? $category->icon
                            ?? 'fa-tag',
                    ];
                });
        }
    );

    return Inertia::render('Marketplace/Dashboard', [
        'categories' => $categories,
    ]);
}

    /**
     * Show the form to create a new listing
     */
    public function create(): Response
    {
        $categories = MarketplaceCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->select([
                'id',
                'name',
                'slug',
                'icon',
            ])
            ->get()
            ->map(function ($category) {

                $iconMap = [

                    'Electronics' => 'fa-tv',
                    'Vehicles' => 'fa-car-side',
                    'Property' => 'fa-house',
                    'Fashion' => 'fa-shirt',
                    'Jobs' => 'fa-briefcase',
                    'Services' => 'fa-screwdriver-wrench',
                    'Furniture' => 'fa-couch',
                    'Phones' => 'fa-mobile-screen-button',
                    'Computers' => 'fa-laptop',
                    'Beauty' => 'fa-wand-magic-sparkles',
                    'Sports' => 'fa-dumbbell',
                    'Agriculture' => 'fa-wheat-awn',
                    'Animals' => 'fa-paw',
                    'Baby Products' => 'fa-baby',
                    'Books' => 'fa-book-open',
                    'Gaming' => 'fa-gamepad',
                    'Music' => 'fa-music',
                    'Health' => 'fa-heart-pulse',
                    'Industrial Equipment' => 'fa-industry',
                    'Other' => 'fa-layer-group',
                ];

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,

                    'icon' => $iconMap[$category->name]
                        ?? $category->icon
                        ?? 'fa-tag',
                ];
            });

        return Inertia::render('Marketplace/Create', [
            'categories' => $categories,
        ]);
    }


    /**
 * Marketplace Category Page
 */
public function category(string $slug): Response
{
    $category = MarketplaceCategory::where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();

    $listings = MarketplaceListing::where(
            'marketplace_category_id',
            $category->id
        )
        ->where('status', 'active')
        ->latest()
        ->with([
            'category:id,name,slug'
        ])
        ->select([
            'id',
            'marketplace_category_id',
            'title',
            'slug',
            'price',
            'condition',
            'location',
            'city',
            'images',
            'created_at',
        ])
        ->paginate(24)
        ->through(function ($listing) {

            return [
                'id' => $listing->id,

                'title' => $listing->title,

                'slug' => $listing->slug,

                'price' => $listing->price,

                'formatted_price' =>
                    'TZS ' . number_format($listing->price),

                'condition' => $listing->condition,

                'location' =>
                    $listing->location
                    ?? $listing->city
                    ?? 'Tanzania',

                'image' =>
                    is_array($listing->images)
                    && count($listing->images) > 0
                        ? $listing->images[0]
                        : null,

                'category' =>
                    $listing->category?->name,

                'created_at' =>
                    $listing->created_at?->diffForHumans(),
            ];
        });

    return Inertia::render('Marketplace/Category', [
        'category' => [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'icon' => $category->icon,
        ],

        'listings' => $listings,
    ]);
}
    /**
     * Store a new listing
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'title' =>
                'required|string|max:150',

            'description' =>
                'nullable|string|max:2000',

            'price' =>
                'required|numeric|min:0',

            'condition' =>
                'required|in:new,used,excellent,good,fair',

            'category_id' =>
                'required|exists:marketplace_categories,id',

            'location' =>
                'nullable|string|max:100',

            'city' =>
                'nullable|string|max:100',

            'images' =>
                'nullable|array|max:6',

            'images.*' =>
                'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);


        /*
        |--------------------------------------------------------------------------
        | IMAGE UPLOAD
        |--------------------------------------------------------------------------
        */

        $imagePaths = [];

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $path = $image->store(
                    'marketplace',
                    'public'
                );

                $imagePaths[] = '/storage/' . $path;
            }
        }


        /*
        |--------------------------------------------------------------------------
        | CREATE LISTING
        |--------------------------------------------------------------------------
        */

        $listing = MarketplaceListing::create([

            'user_id' =>
                Auth::id(),

            'marketplace_category_id' =>
                $validated['category_id'],

            'title' =>
                $validated['title'],

            'slug' =>
                Str::slug($validated['title'])
                . '-'
                . Str::random(5),

            'description' =>
                $validated['description'] ?? null,

            'price' =>
                $validated['price'],

            'condition' =>
                $validated['condition'],

            'location' =>
                $validated['location'] ?? null,

            'city' =>
                $validated['city'] ?? null,

            'images' =>
                $imagePaths,

            // 'status' =>
            //     'pending',
            'status' =>
             'active',
        ]);


        /*
        |--------------------------------------------------------------------------
        | CLEAR CACHES
        |--------------------------------------------------------------------------
        | Important because listing/category counts can change.
        |--------------------------------------------------------------------------
        */

        Cache::forget('marketplace.categories.v2');
        Cache::forget('marketplace.featured.v3');


        /*
        |--------------------------------------------------------------------------
        | REDIRECT
        |--------------------------------------------------------------------------
        */

        // return redirect()
        //     ->route('marketplace.index')
        //     ->with(
        //         'success',
        //         'Bidhaa yako imetumwa! Inasubiri idhini.'
        //     );

        return redirect()
    ->route('marketplace.index')
    ->with(
        'success',
        'Bidhaa yako imewekwa sokoni kikamilifu!'
    );
    }

    /**
 * Show a single marketplace listing
 */
public function show(MarketplaceListing $listing): Response
{
    // Only approved/active listings are publicly visible
    abort_unless($listing->status === 'active', 404);

    $listing->load([
        'category:id,name,slug,icon',
        'user:id,name,email,phone',
    ]);

    /*
    |--------------------------------------------------------------------------
    | IMAGES
    |--------------------------------------------------------------------------
    */

    $images = is_array($listing->images)
        ? array_values(array_filter($listing->images))
        : [];

    /*
    |--------------------------------------------------------------------------
    | SELLER
    |--------------------------------------------------------------------------
    */

    $seller = [
        'id' => $listing->user?->id,
        'name' => $listing->user?->name ?? 'MauzoVibe Seller',
        'phone' => $listing->user?->phone,
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATED PRODUCTS
    |--------------------------------------------------------------------------
    */

    $relatedProducts = MarketplaceListing::where('status', 'active')
        ->where('id', '!=', $listing->id)
        ->where(
            'marketplace_category_id',
            $listing->marketplace_category_id
        )
        ->with('category:id,name,slug')
        ->latest('created_at')
        ->take(8)
        ->get()
        ->map(function ($item) {

            $images = is_array($item->images)
                ? array_values(array_filter($item->images))
                : [];

            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'price' => $item->price,

                'formatted_price' =>
                    'TZS ' . number_format($item->price),

                'condition' => $item->condition,

                'location' =>
                    $item->location
                    ?? $item->city
                    ?? 'Tanzania',

                'image' =>
                    $images[0] ?? null,

                'category' =>
                    $item->category?->name,
            ];
        });

    /*
    |--------------------------------------------------------------------------
    | LISTING DATA
    |--------------------------------------------------------------------------
    */

    $product = [
        'id' => $listing->id,

        'title' => $listing->title,

        'slug' => $listing->slug,

        'description' => $listing->description,

        'price' => $listing->price,

        'formatted_price' =>
            'TZS ' . number_format($listing->price),

        'condition' => $listing->condition,

        'location' =>
            $listing->location
            ?? $listing->city
            ?? 'Tanzania',

        'city' => $listing->city,

        'images' => $images,

        'category' => [
            'id' => $listing->category?->id,
            'name' => $listing->category?->name,
            'slug' => $listing->category?->slug,
            'icon' => $listing->category?->icon,
        ],

        'seller' => $seller,

        'created_at' =>
            $listing->created_at?->diffForHumans(),
    ];

    return Inertia::render(
        'Marketplace/Listing/Show',
        [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]
    );
}
}
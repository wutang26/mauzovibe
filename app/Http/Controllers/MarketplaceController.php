<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceCategory;
use App\Models\MarketplaceListing;
use App\Models\SavedListing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use App\Models\MarketplaceMessage;
use App\Models\MarketplaceCartItem;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * CATEGORY ICON MAP
     * --------------------------------------------------------------------------
     */
    private function categoryIconMap(): array
    {
        return [
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
    }

    /**
     * --------------------------------------------------------------------------
     * MARKETPLACE CATEGORIES
     * --------------------------------------------------------------------------
     *
     * Centralized category loader used by multiple marketplace pages.
     *
     * @param bool $withCounts
     */
    private function getMarketplaceCategories(
        bool $withCounts = true
    ) {
        $cacheKey = $withCounts
            ? 'marketplace.categories.with_counts.v2'
            : 'marketplace.categories.v2';

        return Cache::remember(
            $cacheKey,
            now()->addMinutes(30),
            function () use ($withCounts) {

                $query = MarketplaceCategory::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->select([
                        'id',
                        'name',
                        'slug',
                        'icon',
                    ]);

                if ($withCounts) {
                    $query->withCount([
                        'listings as listings_count' => function ($query) {
                            $query->where('status', 'active');
                        },
                    ]);
                }

                return $query
                    ->get()
                    ->map(function ($category) {

                        $iconMap = $this->categoryIconMap();

                        return [
                            'id' => $category->id,

                            'name' => $category->name,

                            'slug' => $category->slug,

                            'icon' =>
                                $iconMap[$category->name]
                                ?? $category->icon
                                ?? 'fa-tag',

                            'listings_count' =>
                                (int) (
                                    $category->listings_count ?? 0
                                ),
                        ];
                    })
                    ->values();
            }
        );
    }

    /**
     * --------------------------------------------------------------------------
     * USER LOCATION
     * --------------------------------------------------------------------------
     */
    private function getUserLocation(Request $request): string
    {
        return $request->user()?->city
            ?? $request->user()?->location
            ?? 'Tabora, Tanzania';
    }

    /**
     * --------------------------------------------------------------------------
     * FORMAT IMAGES
     * --------------------------------------------------------------------------
     */
    private function getListingImages($listing): array
    {
        if (is_array($listing->images)) {
            return array_values(
                array_filter($listing->images)
            );
        }

        return [];
    }

    /**
     * --------------------------------------------------------------------------
     * FORMAT PRODUCT
     * --------------------------------------------------------------------------
     */
    private function formatListing(
        MarketplaceListing $listing,
        bool $includeImages = true
    ): array {
        $images = $this->getListingImages($listing);

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

            'city' => $listing->city,

            'image' =>
                $images[0] ?? null,

            'images' =>
                $includeImages
                    ? $images
                    : null,

            'category' =>
                $listing->category
                    ? [
                        'id' => $listing->category->id,
                        'name' => $listing->category->name,
                        'slug' => $listing->category->slug,
                        'icon' => $listing->category->icon,
                    ]
                    : null,

            'created_at' =>
                $listing->created_at?->diffForHumans(),
        ];
    }

    /**
     * --------------------------------------------------------------------------
     * CLEAR MARKETPLACE CACHES
     * --------------------------------------------------------------------------
     */
    private function clearMarketplaceCaches(): void
    {
        Cache::forget(
            'marketplace.categories.with_counts.v2'
        );

        Cache::forget(
            'marketplace.categories.v2'
        );

        Cache::forget(
            'marketplace.featured.v3'
        );

        // Old cache keys used by previous versions.
        Cache::forget(
            'marketplace.categories.dashboard.v1'
        );

        Cache::forget(
            'marketplace.categories.public.v1'
        );

        Cache::forget(
            'marketplace.public.categories.v1'
        );

        Cache::forget(
            'marketplace.categories.v2'
        );
    }

    /**
     * --------------------------------------------------------------------------
     * MARKETPLACE HOME
     * --------------------------------------------------------------------------
     */
    public function index(Request $request): Response
    {
        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

        $categories = $this->getMarketplaceCategories(true);

        /*
        |--------------------------------------------------------------------------
        | QUICK CATEGORIES
        |--------------------------------------------------------------------------
        */

        $quickCategories = $categories
            ->take(10)
            ->values();

        /*
        |--------------------------------------------------------------------------
        | FEATURED / LATEST PRODUCTS
        |--------------------------------------------------------------------------
        */

        $featuredProducts = Cache::remember(
            'marketplace.featured.v3',
            now()->addMinutes(5),
            function () {

                return MarketplaceListing::query()

                    ->where('status', 'active')

                    ->with([
                        'category:id,name,slug,icon',
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

                    ->latest('created_at')

                    ->take(12)

                    ->get()

                    ->map(function ($listing) {

                        $images =
                            $this->getListingImages(
                                $listing
                            );

                        return [
                            'id' => $listing->id,

                            'title' => $listing->title,

                            'slug' => $listing->slug,

                            'price' => $listing->price,

                            'formatted_price' =>
                                'TZS ' .
                                number_format(
                                    $listing->price
                                ),

                            'condition' =>
                                $listing->condition,

                            'location' =>
                                $listing->location
                                ?? $listing->city
                                ?? 'Tanzania',

                            'city' =>
                                $listing->city,

                            'image' =>
                                $images[0] ?? null,

                            'category' =>
                                $listing->category?->name,

                            'created_at' =>
                                $listing->created_at
                                    ?->diffForHumans(),
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
            $this->getUserLocation($request);

        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Marketplace/Home',
            [
                'categories' =>
                    $categories,

                'quickCategories' =>
                    $quickCategories,

                'featuredProducts' =>
                    $featuredProducts,

                'userLocation' =>
                    $userLocation,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * MARKETPLACE DASHBOARD
     * --------------------------------------------------------------------------
     */
    public function dashboard(): Response
    {
        $categories =
            $this->getMarketplaceCategories(false);

        return Inertia::render(
            'Marketplace/Dashboard',
            [
                'categories' =>
                    $categories,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * CREATE LISTING
     * --------------------------------------------------------------------------
     */
    public function create(Request $request): Response
    {
        /*
        |--------------------------------------------------------------------------
        | CHECK SELLER PHONE
        |--------------------------------------------------------------------------
        */

        if (
            empty(
                $request->user()?->phone
            )
        ) {
            return redirect()
                ->route(
                    'marketplace.complete-profile'
                );
        }

        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

        $categories =
            $this->getMarketplaceCategories(false);

        return Inertia::render(
            'Marketplace/Create',
            [
                'categories' =>
                    $categories,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * MARKETPLACE CATEGORY PAGE
     * --------------------------------------------------------------------------
     */
    public function category(
        string $slug
    ): Response {
        $category =
            MarketplaceCategory::query()
                ->where('slug', $slug)
                ->where('is_active', true)
                ->firstOrFail();

        $listings =
            MarketplaceListing::query()

                ->where(
                    'marketplace_category_id',
                    $category->id
                )

                ->where(
                    'status',
                    'active'
                )

                ->with([
                    'category:id,name,slug,icon',
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

                ->latest('created_at')

                ->paginate(24)

                ->through(
                    function ($listing) {
                        return $this->formatListing(
                            $listing,
                            false
                        );
                    }
                );

        return Inertia::render(
            'Marketplace/Category',
            [
                'category' => [
                    'id' =>
                        $category->id,

                    'name' =>
                        $category->name,

                    'slug' =>
                        $category->slug,

                    'icon' =>
                        $category->icon,
                ],

                'listings' =>
                    $listings,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * STORE NEW LISTING
     * --------------------------------------------------------------------------
     */
    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | VALIDATION
        |--------------------------------------------------------------------------
        */

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
                'image|mimes:jpg,jpeg,png,webp,heic,heif|max:10240',
        ]);

        /*
        |--------------------------------------------------------------------------
        | IMAGE UPLOAD
        |--------------------------------------------------------------------------
        */

        $imagePaths = [];

        if ($request->hasFile('images')) {

            foreach (
                $request->file('images')
                as $image
            ) {

                /*
                |--------------------------------------------------------------------------
                | PUBLIC DISK
                |--------------------------------------------------------------------------
                |
                | This keeps the same public disk approach used by your
                | marketplace image URLs.
                |
                */

                $path = $image->store(
                    'marketplace',
                    'public'
                );

                $imagePaths[] =
                    Storage::disk(
                        'public'
                    )->url($path);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | CREATE LISTING
        |--------------------------------------------------------------------------
        */

        $listing =
            MarketplaceListing::create([
                'user_id' =>
                    Auth::id(),

                'marketplace_category_id' =>
                    $validated['category_id'],

                'title' =>
                    $validated['title'],

                'slug' =>
                    Str::slug(
                        $validated['title']
                    )
                    . '-'
                    . Str::random(5),

                'description' =>
                    $validated['description']
                    ?? null,

                'price' =>
                    $validated['price'],

                'condition' =>
                    $validated['condition'],

                'location' =>
                    $validated['location']
                    ?? null,

                'city' =>
                    $validated['city']
                    ?? null,

                'images' =>
                    $imagePaths,

                /*
                |--------------------------------------------------------------------------
                | ACTIVE
                |--------------------------------------------------------------------------
                |
                | Keeping your current behavior:
                | the product becomes visible immediately.
                |
                */

                'status' =>
                    'active',
            ]);

        /*
        |--------------------------------------------------------------------------
        | CLEAR CACHE
        |--------------------------------------------------------------------------
        */

        $this->clearMarketplaceCaches();

        /*
        |--------------------------------------------------------------------------
        | REDIRECT
        |--------------------------------------------------------------------------
        */

        return redirect()
            ->route(
                'marketplace.index'
            )
            ->with(
                'success',
                'Bidhaa yako imewekwa sokoni kikamilifu!'
            );
    }

    /**
     * --------------------------------------------------------------------------
     * SHOW SINGLE MARKETPLACE LISTING
     * --------------------------------------------------------------------------
     */
    public function show(
        MarketplaceListing $listing
    ): Response {
        /*
        |--------------------------------------------------------------------------
        | ONLY ACTIVE LISTINGS
        |--------------------------------------------------------------------------
        */

        abort_unless(
            $listing->status === 'active',
            404
        );

        /*
        |--------------------------------------------------------------------------
        | LOAD RELATIONSHIPS
        |--------------------------------------------------------------------------
        */

        $listing->load([
            'category:id,name,slug,icon',

            'user:id,name,email,phone',
        ]);

        /*
        |--------------------------------------------------------------------------
        | IMAGES
        |--------------------------------------------------------------------------
        */

        $images =
            $this->getListingImages(
                $listing
            );

        /*
        |--------------------------------------------------------------------------
        | SELLER
        |--------------------------------------------------------------------------
        */

        $seller = [
            'id' =>
                $listing->user?->id,

            'name' =>
                $listing->user?->name
                ?? 'MauzoVibe Seller',

            'phone' =>
                $listing->user?->phone,
        ];

        /*
        |--------------------------------------------------------------------------
        | RELATED PRODUCTS
        |--------------------------------------------------------------------------
        */

        $relatedProducts =
            MarketplaceListing::query()

                ->where(
                    'status',
                    'active'
                )

                ->where(
                    'id',
                    '!=',
                    $listing->id
                )

                ->where(
                    'marketplace_category_id',
                    $listing->marketplace_category_id
                )

                ->with(
                    'category:id,name,slug,icon'
                )

                ->latest('created_at')

                ->take(8)

                ->get()

                ->map(function ($item) {

                    return $this->formatListing(
                        $item,
                        false
                    );
                })
                ->values();

        /*
        |--------------------------------------------------------------------------
        | PRODUCT
        |--------------------------------------------------------------------------
        */

        $product = [
            'id' =>
                $listing->id,

            'title' =>
                $listing->title,

            'slug' =>
                $listing->slug,

            'description' =>
                $listing->description,

            'price' =>
                $listing->price,

            'formatted_price' =>
                'TZS ' .
                number_format(
                    $listing->price
                ),

            'condition' =>
                $listing->condition,

            'location' =>
                $listing->location
                ?? $listing->city
                ?? 'Tanzania',

            'city' =>
                $listing->city,

            'images' =>
                $images,

            'category' => [
                'id' =>
                    $listing->category?->id,

                'name' =>
                    $listing->category?->name,

                'slug' =>
                    $listing->category?->slug,

                'icon' =>
                    $listing->category?->icon,
            ],

            'seller' =>
                $seller,

            'created_at' =>
                $listing->created_at
                    ?->diffForHumans(),
        ];

        return Inertia::render(
            'Marketplace/Listing/Show',
            [
                'product' =>
                    $product,

                'relatedProducts' =>
                    $relatedProducts,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * NEW PRODUCTS
     * --------------------------------------------------------------------------
     */
    public function newProducts(
        Request $request
    ): Response {
        $categories =
            $this->getMarketplaceCategories(true);

        $quickCategories =
            $categories
                ->take(10)
                ->values();

        $products =
            MarketplaceListing::query()

                ->where(
                    'status',
                    'active'
                )

                ->where(
                    'condition',
                    'new'
                )

                ->with(
                    'category:id,name,slug,icon'
                )

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

                ->paginate(24)

                ->through(function ($listing) {

                    return $this->formatListing(
                        $listing,
                        true
                    );
                });

        $userLocation =
            $this->getUserLocation(
                $request
            );

        return Inertia::render(
            'Marketplace/New',
            [
                'categories' =>
                    $categories,

                'quickCategories' =>
                    $quickCategories,

                'products' =>
                    $products,

                'userLocation' =>
                    $userLocation,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * USED PRODUCTS
     * --------------------------------------------------------------------------
     */
    public function usedProducts(
        Request $request
    ): Response {
        $categories =
            $this->getMarketplaceCategories(true);

        $quickCategories =
            $categories
                ->take(10)
                ->values();

        $products =
            MarketplaceListing::query()

                ->where(
                    'status',
                    'active'
                )

                ->where(
                    'condition',
                    'used'
                )

                ->with(
                    'category:id,name,slug,icon'
                )

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

                ->paginate(24)

                ->through(function ($listing) {

                    return $this->formatListing(
                        $listing,
                        true
                    );
                });

        $userLocation =
            $this->getUserLocation(
                $request
            );

        return Inertia::render(
            'Marketplace/Used',
            [
                'categories' =>
                    $categories,

                'quickCategories' =>
                    $quickCategories,

                'products' =>
                    $products,

                'userLocation' =>
                    $userLocation,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * MARKETPLACE STORES / SELLERS
     * --------------------------------------------------------------------------
     */
    public function stores(
        Request $request
    ): Response {
        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

        $categories =
            $this->getMarketplaceCategories(true);

        $quickCategories =
            $categories
                ->take(10)
                ->values();

        /*
        |--------------------------------------------------------------------------
        | STORES
        |--------------------------------------------------------------------------
        */

        $stores =
            MarketplaceListing::query()

                ->where(
                    'status',
                    'active'
                )

                ->whereNotNull(
                    'user_id'
                )

                ->with([
                    'user:id,name,email,phone,city,location',
                ])

                ->select([
                    'id',
                    'user_id',
                    'title',
                    'price',
                    'condition',
                    'location',
                    'city',
                    'images',
                    'created_at',
                ])

                ->latest('created_at')

                ->get()

                ->groupBy('user_id')

                ->map(function ($listings) {

                    $seller =
                        $listings
                            ->first()
                            ?->user;

                    $firstListing =
                        $listings
                            ->first();

                    $images =
                        $this->getListingImages(
                            $firstListing
                        );

                    $location =
                        $seller?->city
                        ?? $seller?->location
                        ?? $firstListing?->location
                        ?? $firstListing?->city
                        ?? 'Tanzania';

                    return [
                        'id' =>
                            $seller?->id,

                        'name' =>
                            $seller?->name
                            ?? 'MauzoVibe Seller',

                        'email' =>
                            $seller?->email,

                        'phone' =>
                            $seller?->phone,

                        'location' =>
                            $location,

                        'products_count' =>
                            $listings->count(),

                        'new_products_count' =>
                            $listings
                                ->where(
                                    'condition',
                                    'new'
                                )
                                ->count(),

                        'used_products_count' =>
                            $listings
                                ->where(
                                    'condition',
                                    'used'
                                )
                                ->count(),

                        'image' =>
                            $images[0] ?? null,

                        'latest_product' =>
                            $firstListing?->title,

                        'latest_product_price' =>
                            $firstListing?->price,

                        'created_at' =>
                            $firstListing?->created_at
                                ?->diffForHumans(),
                    ];
                })

                ->filter(function ($store) {
                    return !empty(
                        $store['id']
                    );
                })

                ->values();

        /*
        |--------------------------------------------------------------------------
        | USER LOCATION
        |--------------------------------------------------------------------------
        */

        $userLocation =
            $this->getUserLocation(
                $request
            );

        return Inertia::render(
            'Marketplace/Stores',
            [
                'categories' =>
                    $categories,

                'quickCategories' =>
                    $quickCategories,

                'stores' =>
                    $stores,

                'userLocation' =>
                    $userLocation,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * SHOW SINGLE MARKETPLACE STORE
     * --------------------------------------------------------------------------
     */
    public function storeShow(
        Request $request,
        $userId
    ): Response {
        /*
        |--------------------------------------------------------------------------
        | SELLER
        |--------------------------------------------------------------------------
        */

        $seller =
            User::query()

                ->select([
                    'id',
                    'name',
                    'email',
                    'phone',
                    'city',
                    'location',
                ])

                ->findOrFail(
                    $userId
                );

        /*
        |--------------------------------------------------------------------------
        | STORE PRODUCTS
        |--------------------------------------------------------------------------
        */

        $products =
            MarketplaceListing::query()

                ->where(
                    'user_id',
                    $seller->id
                )

                ->where(
                    'status',
                    'active'
                )

                ->with([
                    'category:id,name,slug,icon',
                ])

                ->select([
                    'id',
                    'user_id',
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

                ->paginate(24)

                ->through(function ($listing) {

                    return $this->formatListing(
                        $listing,
                        true
                    );
                });

        /*
        |--------------------------------------------------------------------------
        | STORE STATISTICS
        |--------------------------------------------------------------------------
        */

        $activeProducts =
            MarketplaceListing::query()
                ->where(
                    'user_id',
                    $seller->id
                )
                ->where(
                    'status',
                    'active'
                );

        $productsCount =
            (clone $activeProducts)
                ->count();

        $newProductsCount =
            (clone $activeProducts)
                ->where(
                    'condition',
                    'new'
                )
                ->count();

        $usedProductsCount =
            (clone $activeProducts)
                ->where(
                    'condition',
                    'used'
                )
                ->count();

        /*
        |--------------------------------------------------------------------------
        | LOCATION
        |--------------------------------------------------------------------------
        */

        $location =
            $seller->city
            ?? $seller->location
            ?? 'Tanzania';

        /*
        |--------------------------------------------------------------------------
        | STORE DATA
        |--------------------------------------------------------------------------
        */

        $store = [
            'id' =>
                $seller->id,

            'name' =>
                $seller->name
                ?? 'MauzoVibe Seller',

            'email' =>
                $seller->email,

            'phone' =>
                $seller->phone,

            'city' =>
                $seller->city,

            'location' =>
                $location,

            'products_count' =>
                $productsCount,

            'new_products_count' =>
                $newProductsCount,

            'used_products_count' =>
                $usedProductsCount,
        ];

        /*
        |--------------------------------------------------------------------------
        | USER LOCATION
        |--------------------------------------------------------------------------
        */

        $userLocation =
            $this->getUserLocation(
                $request
            );

        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

        $categories =
            $this->getMarketplaceCategories(true);

        return Inertia::render(
            'Marketplace/Store',
            [
                'store' =>
                    $store,

                'products' =>
                    $products,

                'categories' =>
                    $categories,

                'userLocation' =>
                    $userLocation,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * SPECIAL OFFERS
     * --------------------------------------------------------------------------
     */
    public function offers(
        Request $request
    ): Response {
        $categories =
            $this->getMarketplaceCategories(true);

        $quickCategories =
            $categories
                ->take(10)
                ->values();

        /*
        |--------------------------------------------------------------------------
        | FEATURED PRODUCTS
        |--------------------------------------------------------------------------
        */

        $products =
            MarketplaceListing::query()

                ->where(
                    'status',
                    'active'
                )

                ->where(
                    'is_featured',
                    true
                )

                ->with(
                    'category:id,name,slug,icon'
                )

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
                    'is_featured',
                ])

                ->latest('created_at')

                ->paginate(24)

                ->through(function ($listing) {

                    $data =
                        $this->formatListing(
                            $listing,
                            true
                        );

                    $data['is_featured'] =
                        (bool) $listing->is_featured;

                    return $data;
                });

        $userLocation =
            $this->getUserLocation(
                $request
            );

        return Inertia::render(
            'Marketplace/Offers',
            [
                'categories' =>
                    $categories,

                'quickCategories' =>
                    $quickCategories,

                'products' =>
                    $products,

                'userLocation' =>
                    $userLocation,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * MARKETPLACE HELP
     * --------------------------------------------------------------------------
     */
    // public function help(
    //     Request $request
    // ): Response {
    //     $categories =
    //         $this->getMarketplaceCategories(true);

    //     $userLocation =
    //         $this->getUserLocation(
    //             $request
    //         );

    //     return Inertia::render(
    //         'Marketplace/Help',
    //         [
    //             'categories' =>
    //                 $categories,

    //             'userLocation' =>
    //                 $userLocation,
    //         ]
    //     );
    // }

    // /**
    //  * --------------------------------------------------------------------------
    //  * MARKETPLACE SEARCH
    //  * --------------------------------------------------------------------------
    //  */
    // public function search(
    //     Request $request
    // ): Response {
    //     $query =
    //         trim(
    //             $request->input(
    //                 'q',
    //                 ''
    //             )
    //         );

    //     /*
    //     |--------------------------------------------------------------------------
    //     | CATEGORIES
    //     |--------------------------------------------------------------------------
    //     */

    //     $categories =
    //         $this->getMarketplaceCategories(true);

    //     /*
    //     |--------------------------------------------------------------------------
    //     | SEARCH PRODUCTS
    //     |--------------------------------------------------------------------------
    //     */

    //     $products =
    //         MarketplaceListing::query()

    //             ->where(
    //                 'status',
    //                 'active'
    //             )

    //             ->when(
    //                 $query !== '',
    //                 function ($q) use ($query) {

    //                     $q->where(
    //                         function ($search) use ($query) {

    //                             $search

    //                                 ->where(
    //                                     'title',
    //                                     'like',
    //                                     "%{$query}%"
    //                                 )

    //                                 ->orWhere(
    //                                     'description',
    //                                     'like',
    //                                     "%{$query}%"
    //                                 )

    //                                 ->orWhere(
    //                                     'location',
    //                                     'like',
    //                                     "%{$query}%"
    //                                 )

    //                                 ->orWhere(
    //                                     'city',
    //                                     'like',
    //                                     "%{$query}%"
    //                                 )

    //                                 /*
    //                                 |--------------------------------------------------------------------------
    //                                 | CATEGORY SEARCH
    //                                 |--------------------------------------------------------------------------
    //                                 */

    //                                 ->orWhereHas(
    //                                     'category',
    //                                     function (
    //                                         $category
    //                                     ) use ($query) {

    //                                         $category->where(
    //                                             'name',
    //                                             'like',
    //                                             "%{$query}%"
    //                                         );
    //                                     }
    //                                 )

    //                                 /*
    //                                 |--------------------------------------------------------------------------
    //                                 | SELLER SEARCH
    //                                 |--------------------------------------------------------------------------
    //                                 */

    //                                 ->orWhereHas(
    //                                     'user',
    //                                     function (
    //                                         $user
    //                                     ) use ($query) {

    //                                         $user->where(
    //                                             'name',
    //                                             'like',
    //                                             "%{$query}%"
    //                                         );
    //                                     }
    //                                 );
    //                         }
    //                     );
    //                 }
    //             )

    //             ->with(
    //                 'category:id,name,slug,icon'
    //             )

    //             ->select([
    //                 'id',
    //                 'marketplace_category_id',
    //                 'title',
    //                 'slug',
    //                 'description',
    //                 'price',
    //                 'condition',
    //                 'location',
    //                 'city',
    //                 'images',
    //                 'created_at',
    //             ])

    //             ->latest('created_at')

    //             ->paginate(24)

    //             ->withQueryString()

    //             ->through(function ($listing) {

    //                 return $this->formatListing(
    //                     $listing,
    //                     true
    //                 );
    //             });

    //     /*
    //     |--------------------------------------------------------------------------
    //     | USER LOCATION
    //     |--------------------------------------------------------------------------
    //     */

    //     $userLocation =
    //         $this->getUserLocation(
    //             $request
    //         );

    //     return Inertia::render(
    //         'Marketplace/Search',
    //         [
    //             'query' =>
    //                 $query,

    //             'products' =>
    //                 $products,

    //             'categories' =>
    //                 $categories,

    //             'userLocation' =>
    //                 $userLocation,
    //         ]
    //     );
    // }

    /**
 * --------------------------------------------------------------------------
 * MARKETPLACE SEARCH
 * --------------------------------------------------------------------------
 */
public function search(Request $request): Response
{
    $query = trim(
        $request->input('q', '')
    );

    /*
    |--------------------------------------------------------------------------
    | CATEGORIES
    |--------------------------------------------------------------------------
    */

    $categories = $this->getMarketplaceCategories(true);

    /*
    |--------------------------------------------------------------------------
    | SEARCH PRODUCTS
    |--------------------------------------------------------------------------
    */

    $products = MarketplaceListing::query()

        ->where('status', 'active')

        ->when(
            $query !== '',
            function ($q) use ($query) {

                $q->where(function ($search) use ($query) {

                    /*
                    |--------------------------------------------------------------------------
                    | PRODUCT SEARCH
                    |--------------------------------------------------------------------------
                    */

                    $search
                        ->where(
                            'title',
                            'like',
                            "%{$query}%"
                        )

                        ->orWhere(
                            'description',
                            'like',
                            "%{$query}%"
                        )

                        ->orWhere(
                            'location',
                            'like',
                            "%{$query}%"
                        )

                        ->orWhere(
                            'city',
                            'like',
                            "%{$query}%"
                        );

                    /*
                    |--------------------------------------------------------------------------
                    | CATEGORY SEARCH
                    |--------------------------------------------------------------------------
                    */

                    $search->orWhereHas(
                        'category',
                        function ($category) use ($query) {

                            $category
                                ->where(
                                    'name',
                                    'like',
                                    "%{$query}%"
                                )
                                ->orWhere(
                                    'slug',
                                    'like',
                                    "%{$query}%"
                                );
                        }
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | SELLER SEARCH
                    |--------------------------------------------------------------------------
                    */

                    $search->orWhereHas(
                        'user',
                        function ($user) use ($query) {

                            $user
                                ->where(
                                    'name',
                                    'like',
                                    "%{$query}%"
                                )
                                ->orWhere(
                                    'email',
                                    'like',
                                    "%{$query}%"
                                )
                                ->orWhere(
                                    'phone',
                                    'like',
                                    "%{$query}%"
                                );
                        }
                    );
                });
            }
        )

        /*
        |--------------------------------------------------------------------------
        | CATEGORY RELATION
        |--------------------------------------------------------------------------
        */

        ->with(
            'category:id,name,slug,icon'
        )

        /*
        |--------------------------------------------------------------------------
        | ONLY REQUIRED COLUMNS
        |--------------------------------------------------------------------------
        */

        ->select([
            'id',
            'user_id',
            'marketplace_category_id',
            'title',
            'slug',
            'description',
            'price',
            'condition',
            'location',
            'city',
            'images',
            'created_at',
        ])

        ->latest('created_at')

        /*
        |--------------------------------------------------------------------------
        | PAGINATION
        |--------------------------------------------------------------------------
        */

        ->paginate(24)

        ->withQueryString()

        /*
        |--------------------------------------------------------------------------
        | FORMAT RESULTS
        |--------------------------------------------------------------------------
        */

        ->through(function ($listing) {

            return $this->formatListing(
                $listing,
                true
            );
        });

    /*
    |--------------------------------------------------------------------------
    | USER LOCATION
    |--------------------------------------------------------------------------
    */

    $userLocation = $this->getUserLocation(
        $request
    );

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return Inertia::render(
        'Marketplace/Search',
        [
            'query' =>
                $query,

            'products' =>
                $products,

            'categories' =>
                $categories,

            'userLocation' =>
                $userLocation,
        ]
    );
}

    /**
     * --------------------------------------------------------------------------
     * COMPLETE MARKETPLACE PROFILE
     * --------------------------------------------------------------------------
     */
    public function completeProfile(
        Request $request
    ): Response {
        return Inertia::render(
            'Marketplace/CompleteProfile',
            [
                'phone' =>
                    $request->user()?->phone,
            ]
        );
    }

    /**
     * --------------------------------------------------------------------------
     * UPDATE MARKETPLACE SELLER PROFILE
     * --------------------------------------------------------------------------
     */
    public function updateProfile(
        Request $request
    ) {
        $validated =
            $request->validate(
                [
                    'phone' => [
                        'required',
                        'string',
                        'regex:/^(?:\+255|255|0)(6|7)\d{8}$/',
                    ],
                ],
                [
                    'phone.required' =>
                        'Tafadhali weka namba yako ya simu.',

                    'phone.regex' =>
                        'Weka namba sahihi ya Tanzania, mfano 0712345678.',
                ]
            );

        $phone =
            $validated['phone'];

        /*
        |--------------------------------------------------------------------------
        | NORMALIZE PHONE
        |--------------------------------------------------------------------------
        |
        | 0712345678
        | -> +255712345678
        |
        | 255712345678
        | -> +255712345678
        |
        | +255712345678
        | -> +255712345678
        |--------------------------------------------------------------------------
        */

        if (
            str_starts_with(
                $phone,
                '0'
            )
        ) {

            $phone =
                '+255'
                . substr(
                    $phone,
                    1
                );

        } elseif (
            str_starts_with(
                $phone,
                '255'
            )
        ) {

            $phone =
                '+'
                . $phone;
        }

        /*
        |--------------------------------------------------------------------------
        | SAVE
        |--------------------------------------------------------------------------
        */

        $user =
            $request->user();

        $user->phone =
            $phone;

        $user->save();

        /*
        |--------------------------------------------------------------------------
        | CONTINUE
        |--------------------------------------------------------------------------
        */

        return redirect()
            ->route(
                'marketplace.create'
            )
            ->with(
                'success',
                'Namba yako ya simu imehifadhiwa. Sasa unaweza kuweka bidhaa.'
            );
    }

    /**
     * --------------------------------------------------------------------------
     * SAVE / UNSAVE LISTING
     * --------------------------------------------------------------------------
     */
    public function save(
        $listing
    ) {
        $saved =
            SavedListing::query()

                ->where(
                    'user_id',
                    auth()->id()
                )

                ->where(
                    'listing_id',
                    $listing
                )

                ->first();

        /*
        |--------------------------------------------------------------------------
        | UNSAVE
        |--------------------------------------------------------------------------
        */

        if ($saved) {

            $saved->delete();

            return back();
        }

        /*
        |--------------------------------------------------------------------------
        | SAVE
        |--------------------------------------------------------------------------
        */

        SavedListing::create([
            'user_id' =>
                auth()->id(),

            'listing_id' =>
                $listing,
        ]);

        return back();
    }

    private function getMarketplaceHeaderCounts(): array
{
    if (!auth()->check()) {
        return [
            'favouritesCount' => 0,
            'messagesCount' => 0,
            'cartCount' => 0,
        ];
    }

    $userId = auth()->id();

    return [
        'favouritesCount' =>
            SavedListing::where(
                'user_id',
                $userId
            )->count(),

        'messagesCount' =>
            MarketplaceMessage::where(
                'receiver_id',
                $userId
            )
                ->where(
                    'is_read',
                    false
                )
                ->count(),

        'cartCount' =>
            MarketplaceCartItem::whereHas(
                'cart',
                function ($query) use ($userId) {
                    $query->where(
                        'user_id',
                        $userId
                    );
                }
            )->sum('quantity'),
    ];
}
}
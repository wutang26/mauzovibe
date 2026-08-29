<?php

use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\LowStockController;
use App\Http\Controllers\Admin\SaleController;
use App\Http\Controllers\Admin\SaleReturnController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BranchSelectionController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\CreditSaleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DebtorController;
use App\Http\Controllers\Admin\PaymentHistoryController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\AuditController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\Marketplace\MarketplaceProfileController;
use App\Http\Controllers\MarketplaceListingActionController;
use App\Http\Controllers\Marketplace\MarketplaceSellerController;
use App\Http\Controllers\DailyPostController;
use App\Models\DailyPost;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin'       => Route::has('login'),
//         'canRegister'    => Route::has('register'),
//         // 'laravelVersion' => Application::VERSION,
//         'phpVersion'     => PHP_VERSION,
//     ]);
// })->name('welcome');


Route::get('/', function () {
    $dailyPosts = DailyPost::query()
        ->where('is_active', true)
        ->where(function ($query) {
            $query
                ->whereNull('starts_at')
                ->orWhere('starts_at', '<=', now());
        })
        ->where(function ($query) {
            $query
                ->whereNull('ends_at')
                ->orWhere('ends_at', '>=', now());
        })
        ->orderBy('sort_order')
        ->latest()
        ->get()
        ->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description,
                'image' => $post->image,
                'button_text' => $post->button_text,
                'button_url' => $post->button_url,
                'type' => $post->type,
                'starts_at' => $post->starts_at,
                'ends_at' => $post->ends_at,
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'dailyPosts' => $dailyPosts,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => false,
//     ]);
// });

// Show custom register page
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

// Process registration
Route::post('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'store'])
    ->name('register.store');
    
/*
|--------------------------------------------------------------------------
| CUSTOM AUTHENTICATION
|--------------------------------------------------------------------------
|
| This replaces Laravel/Breeze default authentication pages.
|
*/


// Show custom login page
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');


// Process login
Route::post('/login', [LoginController::class, 'store'])
    ->name('login.store');


// Logout
Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');


/*
|--------------------------------------------------------------------------
| BRANCH SELECTION
|--------------------------------------------------------------------------
*/


Route::middleware('auth')->group(function () {

    Route::get(
        '/choose-branch',
        [BranchSelectionController::class, 'index']
    )->name('choose.branch');

    Route::post(
        '/choose-branch',
        [BranchSelectionController::class, 'store']
    )->name('choose.branch.store');

});


/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/


Route::middleware('auth')->group(function () {


    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard',
        [DashboardController::class, 'index']
    )->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | PROFILE
    |--------------------------------------------------------------------------
    */

    Route::prefix('profile')
        ->name('profile.')
        ->group(function () {

            Route::get(
                '/',
                [ProfileController::class, 'edit']
            )->name('edit');

            Route::patch(
                '/',
                [ProfileController::class, 'update']
            )->name('update');

            Route::delete(
                '/',
                [ProfileController::class, 'destroy']
            )->name('destroy');

        });


    /*
    |--------------------------------------------------------------------------
    | USER MANAGEMENT
    |--------------------------------------------------------------------------
    */

    // Route::prefix('admin/users')
    //     ->name('admin.users.')
    //     ->group(function () {
    Route::prefix('admin/users')
    ->name('admin.users.')
    ->middleware('role:Super Admin|Admin')
    ->group(function () {

            Route::get(
                '/',
                [UserManagementController::class, 'index']
            )->name('index');

            Route::get(
                '/{user}/manage',
                [UserManagementController::class, 'edit']
            )->name('manage');

            Route::post(
                '/{user}/role',
                [UserManagementController::class, 'updateRole']
            )->name('role');

            Route::post(
                '/{user}/permissions',
                [UserManagementController::class, 'updatePermissions']
            )->name('permissions');

        });


    /*
    |--------------------------------------------------------------------------
    | BRANCH MANAGEMENT
    |--------------------------------------------------------------------------
    */
    // Route::prefix('admin')
    // ->name('admin.')
    // ->middleware('role:Super Admin|Admin')
    // ->group(function () {

    //         Route::resource(
    //             'branches',
    //             BranchController::class
    //         );

    //     });

    /*
|--------------------------------------------------------------------------
| BRANCH MANAGEMENT
|--------------------------------------------------------------------------
*/

Route::prefix('admin')
    ->name('admin.')
    ->group(function () {

        // All authenticated users can view branches and create a branch
        Route::resource(
            'branches',
            BranchController::class
        )->only([
            'index',
            'create',
            'store',
            'show',
        ]);

        // Only Admin and Super Admin can edit/delete branches
        Route::resource(
            'branches',
            BranchController::class
        )->only([
            'edit',
            'update',
            'destroy',
        ])->middleware('role:Super Admin|Admin');
    });

        //Assig Users to Branch
    Route::middleware('role:Super Admin|Admin')->group(function () {

    Route::get(
        '/admin/branches/{branch}/assign-user',
        [BranchController::class, 'assignUser']
    )->name('branches.assign-user');

    Route::post(
        '/admin/branches/{branch}/assign-user',
        [BranchController::class, 'storeAssignedUser']
    )->name('branches.store-assigned-user');

});

    /*
    |--------------------------------------------------------------------------
    | VIEW BRANCH
    |--------------------------------------------------------------------------
    */

    // Route::get(
    //     '/branches/{branch}/view',
    //     [BranchController::class, 'show']
    // )->name('branches.show');

    Route::get(
    '/branches/{branch}/view',
    [BranchController::class, 'show'])->middleware('role:Super Admin|Admin')
->name('branches.show');


    /*
    |--------------------------------------------------------------------------
    | SWITCH BRANCH
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/switch-branch/{branch}',
        [BranchController::class, 'switchBranch']
    )->name('switch.branch');


    /*
    |--------------------------------------------------------------------------
    | CATEGORIES
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::resource(
                'categories',
                CategoryController::class
            );

        });


    /*
    |--------------------------------------------------------------------------
    | PRODUCTS
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::resource(
                'products',
                ProductController::class
            );

        });


    /*
    |--------------------------------------------------------------------------
    | STOCK IN
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin/stockin')
        ->name('admin.stockin.')
        ->group(function () {

            Route::get(
                '/',
                [StockController::class, 'index']
            )->name('index');

            Route::get(
                '/create',
                [StockController::class, 'create']
            )->name('create');

            Route::post(
                '/store',
                [StockController::class, 'store']
            )->name('store');

            Route::get(
                '/{stock}',
                [StockController::class, 'show']
            )->name('show');

            Route::get(
                '/{stock}/edit',
                [StockController::class, 'edit']
            )->name('edit');

            Route::put(
                '/{stock}',
                [StockController::class, 'update']
            )->name('update');

            Route::delete(
                '/{stock}',
                [StockController::class, 'destroy']
            )->name('destroy');

        });


    /*
    |--------------------------------------------------------------------------
    | STOCK OUT
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin/stockout')
        ->name('admin.stockout.')
        ->group(function () {

            Route::get(
                '/',
                [StockController::class, 'stockOutIndex']
            )->name('index');

            Route::get(
                '/create',
                [StockController::class, 'stockOutCreate']
            )->name('create');

            Route::post(
                '/store',
                [StockController::class, 'stockOutStore']
            )->name('store');

            Route::get(
                '/{stock}',
                [StockController::class, 'stockOutShow']
            )->name('show');

            Route::get(
                '/{stock}/edit',
                [StockController::class, 'stockOutEdit']
            )->name('edit');

            Route::put(
                '/{stock}',
                [StockController::class, 'stockOutUpdate']
            )->name('update');

            Route::delete(
                '/{stock}',
                [StockController::class, 'stockOutDestroy']
            )->name('destroy');

        });


    /*
    |--------------------------------------------------------------------------
    | LOW STOCK
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin/low-stock')
        ->name('admin.lowstock.')
        ->group(function () {

            Route::get(
                '/',
                [LowStockController::class, 'index']
            )->name('index');

        });


    /*
    |--------------------------------------------------------------------------
    | SALES / POS
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin/sales')
        ->name('admin.sales.')
        ->middleware('branch')
        ->group(function () {

            // Sales History
            Route::get(
                '/',
                [SaleController::class, 'index']
            )->name('index');

            // New Sale / POS
            Route::get(
                '/create',
                [SaleController::class, 'create']
            )->name('create');

            // Complete Sale
            Route::post(
                '/',
                [SaleController::class, 'store']
            )->name('store');

            // View Sale
            Route::get(
                '/{sale}',
                [SaleController::class, 'show']
            )->name('show');

            // Return Sale
            Route::get(
                '/{sale}/return',
                [SaleReturnController::class, 'create']
            )->name('return.create');

        });


    /*
    |--------------------------------------------------------------------------
    | RETURNS
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin')
        ->name('admin.')
        ->middleware('branch')
        ->group(function () {

            // Returns History
            Route::get(
                '/returns',
                [SaleReturnController::class, 'index']
            )->name('returns.index');

            // Create Return
            Route::get(
                '/sales/{sale}/return',
                [SaleReturnController::class, 'create']
            )->name('sales.return.create');

            // Process Return
            Route::post(
                '/returns/{sale}',
                [SaleReturnController::class, 'store']
            )->name('returns.store');

            // View Return
            Route::get(
                '/returns/{return}',
                [SaleReturnController::class, 'show']
            )->name('returns.show');

        });

});

// REGISTER ANOTHER BRANCH
Route::get(
    '/branches/register',
    [BranchController::class, 'register']
)->name('branches.register');

Route::post(
    '/branches/register',
    [BranchController::class, 'storeRegisteredBranch']
)->name('branches.register.store');

/*
|--------------------------------------------------------------------------
| CUSTOMERS
|--------------------------------------------------------------------------
*/

Route::prefix('admin/customers')
    ->name('admin.customers.')
    ->middleware('branch')
    ->group(function () {

        // Customer List
        Route::get(
            '/',
            [CustomerController::class, 'index']
        )->name('index');

        // Create Customer
        Route::get(
            '/create',
            [CustomerController::class, 'create']
        )->name('create');

        // Store Customer
        Route::post(
            '/',
            [CustomerController::class, 'store']
        )->name('store');

        // View Customer
        Route::get(
            '/{customer}',
            [CustomerController::class, 'show']
        )->name('show');

        // Edit Customer
        Route::get(
            '/{customer}/edit',
            [CustomerController::class, 'edit']
        )->name('edit');

        // Update Customer
        Route::put(
            '/{customer}',
            [CustomerController::class, 'update']
        )->name('update');

        // Delete Customer
        Route::delete(
            '/{customer}',
            [CustomerController::class, 'destroy']
        )->name('destroy');
});

/*
|--------------------------------------------------------------------------
| CREDIT SALES
|--------------------------------------------------------------------------
*/

Route::prefix('admin/credit-sales')
    ->name('admin.credit-sales.')
    ->middleware('branch')
    ->group(function () {

        // Credit Sales List
        Route::get(
            '/',
            [CreditSaleController::class, 'index']
        )->name('index');

        // Create Credit Sale
        Route::get(
            '/create',
            [CreditSaleController::class, 'create']
        )->name('create');

        // Store Credit Sale
        Route::post(
            '/',
            [CreditSaleController::class, 'store']
        )->name('store');

        // View Credit Sale
        Route::get(
            '/{creditSale}',
            [CreditSaleController::class, 'show']
        )->name('show');

        // Edit Credit Sale
        Route::get(
            '/{creditSale}/edit',
            [CreditSaleController::class, 'edit']
        )->name('edit');

        // Update Credit Sale
        Route::put(
            '/{creditSale}',
            [CreditSaleController::class, 'update']
        )->name('update');

        // Delete Credit Sale
        Route::delete(
            '/{creditSale}',
            [CreditSaleController::class, 'destroy']
        )->name('destroy');

    });

    /*
|--------------------------------------------------------------------------
| DEBTORS
|--------------------------------------------------------------------------
*/

// Route::prefix('admin/debtors')
//     ->name('admin.Debtors.')
//     ->middleware('branch')
//     ->group(function () {

//         // Debtors List
//         Route::get(
//             '/',
//             [DebtorController::class, 'index']
//         )->name('index');

//         // Debtor Details
//         Route::get(
//             '/{sale}',
//             [DebtorController::class, 'show']
//         )->name('show');

//  });

Route::prefix('admin/debtors')
    ->name('admin.debtors.')
    ->middleware('branch')
    ->group(function () {

    // Debtors List
    Route::get(
        '/',
        [DebtorController::class, 'index']
    )->name('index');

    // Debtor Details
    Route::get(
        '/{sale}',
        [DebtorController::class, 'show']
    )->name('show');

});


/*
|--------------------------------------------------------------------------
| PAYMENT HISTORY
|--------------------------------------------------------------------------
*/

Route::prefix('admin/payment-history')
    ->name('admin.payment-history.')
    ->middleware('branch')
    ->group(function () {

        Route::get(
            '/',
            [PaymentHistoryController::class, 'index']
        )->name('index');

        Route::get(
            '/{sale}',
            [PaymentHistoryController::class, 'show']
        )->name('show');

});

/*
|--------------------------------------------------------------------------
| REPORTS
|--------------------------------------------------------------------------
*/

Route::prefix('admin/reports')
    ->name('admin.reports.')
    ->middleware('branch')
    ->group(function () {

        // Daily Report
        Route::get(
            '/daily',
            [ReportController::class, 'daily']
        )->name('daily');

        // Weekly Report
        Route::get(
            '/weekly',
            [ReportController::class, 'weekly']
        )->name('weekly');

        //Monthly Report
       Route::get('/admin/reports/monthly', [ReportController::class, 'monthly'])
    ->name('monthly');

      // Yearly Report
     Route::get(
            '/yearly',
            [ReportController::class, 'yearly']
        )->name('yearly');
    
    //Profit Report
    Route::get('/profit', [ReportController::class, 'profit'])
    ->name('profit');

    //Stock Report
    Route::get(
    '/stock',
    [ReportController::class, 'stock'])->name('stock');
});

/*
|--------------------------------------------------------------------------
| MARKETPLACE REPORTS
|--------------------------------------------------------------------------
| Only Admin and Super Admin can view marketplace listing reports.
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| MARKETPLACE REPORTS
|--------------------------------------------------------------------------
| Only Admin and Super Admin can manage marketplace reports.
|--------------------------------------------------------------------------
*/

Route::prefix('admin/reports')
    ->name('admin.reports.')
    ->middleware(['auth', 'role:Super Admin|Admin'])
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Marketplace Reports List
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/marketplace',
            [MarketplaceListingActionController::class, 'index']
        )->name('marketplace');


        /*
        |--------------------------------------------------------------------------
        | View Single Marketplace Report
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/marketplace/{report}',
            [MarketplaceListingActionController::class, 'adminShowReport']
        )->name('marketplace.show');


        /*
        |--------------------------------------------------------------------------
        | Update Report Status
        |--------------------------------------------------------------------------
        */

        Route::patch(
            '/marketplace/{report}/status',
            [MarketplaceListingActionController::class, 'updateReportStatus']
        )->name('marketplace.status');


        /*
        |--------------------------------------------------------------------------
        | Disable Reported Listing
        |--------------------------------------------------------------------------
        */

        Route::patch(
            '/marketplace/{report}/disable-listing',
            [MarketplaceListingActionController::class, 'disableReportedListing']
        )->name('marketplace.disable-listing');

    });
// Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {

//     // Audit Checking
//     Route::get('/audit', [AuditController::class, 'index'])
//         ->name('audit.index');

// });

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'role:Super Admin|Admin'])
    ->group(function () {

        Route::get(
            '/audit',
            [AuditController::class, 'index']
        )->name('audit.index');

    });
    

 /*
|--------------------------------------------------------------------------
| SUBSCRIPTION
|--------------------------------------------------------------------------
| All authenticated users can view subscription status.
| Only Super Admin and Admin can subscribe/renew.
|--------------------------------------------------------------------------
*/

// Route::middleware(['auth'])->group(function () {

//     // Everyone can view subscription
//     Route::get(
//         '/subscription',
//         [SubscriptionController::class, 'index']
//     )->name('subscription.index');


//     // Only Admin and Super Admin can subscribe
//     Route::post(
//         '/subscription/subscribe',
//         [SubscriptionController::class, 'subscribe']
//     )
//         ->middleware('role:Super Admin|Admin')
//         ->name('subscription.subscribe');


//     // Temporary payment testing endpoint
//     // Only Admin and Super Admin can use it
//     Route::post(
//         '/subscription/payment-success',
//         [SubscriptionController::class, 'paymentSuccess']
//     )
//         ->middleware('role:Super Admin|Admin')
//         ->name('subscription.payment.success');

// });
/*
|--------------------------------------------------------------------------
| SUBSCRIPTION
|--------------------------------------------------------------------------
| Only Super Admin and Admin can access subscription management.
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])  //'role:Super Admin|Admin'
    ->group(function () {

        // Subscription page
        Route::get(
            '/subscription',
            [SubscriptionController::class, 'index']
        )->name('subscription.index');

        // Subscribe / Renew
        Route::post(
            '/subscription/subscribe',
            [SubscriptionController::class, 'subscribe']
        )->name('subscription.subscribe');

        // Payment success
        Route::post(
            '/subscription/payment-success',
            [SubscriptionController::class, 'paymentSuccess']
        )->name('subscription.payment.success');
    });

//Home Page routes
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

Route::get('/faq', function () {
    return Inertia::render('Faq');
})->name('faq');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');


Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/support', function () {
    return Inertia::render('Support');
})->name('support');

//MarketPlace Routes
/// MARKETPLACE ROUTES
// ======================

Route::prefix('marketplace')->name('marketplace.')->group(function () {

    // Public page
    Route::get('/', [MarketplaceController::class, 'index'])->name('index');

    // Authenticated routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/create', [MarketplaceController::class, 'create'])->name('create');
        Route::post('/', [MarketplaceController::class, 'store'])->name('store');
    });
});

//Market Place Dashboard
// Route::middleware(['auth'])->group(function () {
//     Route::get('/marketplace/dashboard', function () {
//         return Inertia::render('Marketplace/Dashboard');
//     })->name('marketplace.dashboard');
// });

Route::middleware(['auth'])->group(function () {
    Route::get(
        '/marketplace/dashboard',
        [MarketplaceController::class, 'dashboard']
    )->name('marketplace.dashboard');
});

// Marketplace Registration

// Marketplace Registration
Route::get('/marketplace/register', function () {
    return Inertia::render('Auth/Register', [
        'marketplace' => true,
    ]);
})->name('marketplace.register');

Route::post('/marketplace/register', [
    \App\Http\Controllers\Auth\RegisteredUserController::class,
    'store'
])->name('marketplace.register.store');

// kwaajili ya Kila Category
Route::get(
    '/marketplace/category/{slug}',
    [MarketplaceController::class, 'category']
)->name('marketplace.category');

//View Details
Route::get('/marketplace/listing/{listing:slug}', 
    [MarketplaceController::class, 'show']
)->name('marketplace.listing.show');

// =====================================================
// MARKETPLACE NAVIGATION PAGES
// =====================================================

Route::get('/marketplace/new', [MarketplaceController::class, 'newProducts'])
    ->name('marketplace.new');

Route::get('/marketplace/used', [MarketplaceController::class, 'usedProducts'])
    ->name('marketplace.used');

Route::get('/marketplace/stores', [MarketplaceController::class, 'stores'])
    ->name('marketplace.stores');

Route::get('/marketplace/store/{userId}', [MarketplaceController::class,'storeShow'
])->name('marketplace.store');

Route::get('/marketplace/offers', [MarketplaceController::class, 'offers'])
    ->name('marketplace.offers');

Route::get('/marketplace/help', [MarketplaceController::class, 'help'])
    ->name('marketplace.help');
Route::get('/marketplace/search', [MarketplaceController::class,'search'
])->name('marketplace.search');

//Update Profile kuendelea kuuza
Route::middleware('auth')->group(function () {

    Route::get(
        '/marketplace/complete-profile',
        [MarketplaceController::class, 'completeProfile']
    )->name('marketplace.complete-profile');

    Route::put(
        '/marketplace/complete-profile',
        [MarketplaceController::class, 'updateProfile']
    )->name('marketplace.complete-profile.update');

});

/*
|--------------------------------------------------------------------------
| MARKETPLACE SETTINGS - PROFILE
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])
    ->prefix('marketplace/settings')
    ->name('marketplace.settings.')
    ->group(function () {

        // View Marketplace Profile
        Route::get(
            '/profile',
            [MarketplaceProfileController::class, 'profile']
        )->name('profile');

        // Edit Marketplace Profile
        Route::get(
            '/profile/edit',
            [MarketplaceProfileController::class, 'edit']
        )->name('profile.edit');

        // Update Marketplace Profile
        Route::put(
            '/profile',
            [MarketplaceProfileController::class, 'update']
        )->name('profile.update');

    });

    Route::middleware('auth')->group(function () {

    Route::post(
        '/marketplace/listing/{listing}/save',
        [MarketplaceListingActionController::class, 'toggleSave']
    )->name('marketplace.listing.save');

    Route::post(
        '/marketplace/listing/{listing}/report',
        [MarketplaceListingActionController::class, 'report']
    )->name('marketplace.listing.report');

});

/*
|--------------------------------------------------------------------------
| MARKETPLACE SELLER PAGES
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| MARKETPLACE SELLER
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    // Mauzo
    Route::get(
        '/marketplace/sales',
        [MarketplaceSellerController::class, 'sales']
    )->name('marketplace.sales');


    // Ujumbe
    Route::get(
        '/marketplace/messages',
        [MarketplaceSellerController::class, 'messages']
    )->name('marketplace.messages');


    // Hesabu / Mapato
    Route::get(
        '/marketplace/earnings',
        [MarketplaceSellerController::class, 'earnings']
    )->name('marketplace.earnings');

});

//Daily Posts
// Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

//     Route::resource('daily-posts', \App\Http\Controllers\Admin\DailyPostController::class);

// });
Route::middleware(['auth'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::resource(
            'daily-posts',
            DailyPostController::class
        )->except(['show']);

        Route::patch(
            'daily-posts/{dailyPost}/toggle',
            [DailyPostController::class, 'toggle']
        )->name('daily-posts.toggle');

    });
require __DIR__.'/auth.php';
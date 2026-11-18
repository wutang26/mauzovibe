
<?php

use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\LowStockController;
use App\Http\Controllers\Admin\SaleController;
use App\Http\Controllers\Admin\SaleReturnController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\CreditSaleController;
use App\Http\Controllers\Admin\DebtorController;
use App\Http\Controllers\Admin\PaymentHistoryController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\AuditController;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BranchSelectionController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\Marketplace\MarketplaceProfileController;
use App\Http\Controllers\MarketplaceListingActionController;
use App\Http\Controllers\Marketplace\MarketplaceSellerController;

use App\Http\Controllers\DailyPostController;

use App\Models\DailyPost;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $dailyPosts = DailyPost::query()
        ->where('is_active', true)
        ->where(function ($query) {
            $query->whereNull('starts_at')
                ->orWhere('starts_at', '<=', now());
        })
        ->where(function ($query) {
            $query->whereNull('ends_at')
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


Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::post(
    '/register',
    [\App\Http\Controllers\Auth\RegisterController::class, 'store']
)->name('register.store');


/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post(
    '/login',
    [LoginController::class, 'store']
)->name('login.store');

Route::post(
    '/logout',
    [LoginController::class, 'destroy']
)->middleware('auth')->name('logout');


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
    | Dashboard remains accessible even after subscription expiry.
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

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::get(
                '/branches',
                [BranchController::class, 'index']
            )->name('branches.index');

            Route::middleware('role:Super Admin|Admin')->group(function () {

                Route::get(
                    '/branches/create',
                    [BranchController::class, 'create']
                )->name('branches.create');

                Route::post(
                    '/branches',
                    [BranchController::class, 'store']
                )->name('branches.store');

                Route::get(
                    '/branches/{branch}',
                    [BranchController::class, 'show']
                )->name('branches.show');

                Route::get(
                    '/branches/{branch}/edit',
                    [BranchController::class, 'edit']
                )->name('branches.edit');

                Route::put(
                    '/branches/{branch}',
                    [BranchController::class, 'update']
                )->name('branches.update');

                Route::delete(
                    '/branches/{branch}',
                    [BranchController::class, 'destroy']
                )->name('branches.destroy');

            });

        });


    /*
    |--------------------------------------------------------------------------
    | VIEW BRANCH
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/branches/{branch}/view',
        [BranchController::class, 'show']
    )->middleware('role:Super Admin|Admin')
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
        ->middleware(['branch', 'subscription.active'])
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
        ->middleware(['branch', 'subscription.active'])
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
        ->middleware(['branch', 'subscription.active'])
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
        ->middleware(['branch', 'subscription.active'])
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
        ->middleware(['branch', 'subscription.active'])
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
        ->middleware(['branch', 'subscription.active'])
        ->group(function () {

            Route::get(
                '/quick-sale',
                [SaleController::class, 'quickSale']
            )->name('quick-sale');

                      
            Route::get(
            '/mobile-pos',
            [SaleController::class, 'mobilePos']
        )->name('mobile-pos');

            Route::get(
                '/',
                [SaleController::class, 'index']
            )->name('index');

            Route::get(
                '/create',
                [SaleController::class, 'create']
            )->name('create');

            Route::post(
                '/',
                [SaleController::class, 'store']
            )->name('store');

            Route::get(
                '/{sale}',
                [SaleController::class, 'show']
            )->name('show');

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
        ->middleware(['branch', 'subscription.active'])
        ->group(function () {

            Route::get(
                '/returns',
                [SaleReturnController::class, 'index']
            )->name('returns.index');
  
            Route::get(
                '/sales/{sale}/return',
                [SaleReturnController::class, 'create']
            )->name('sales.return.create');

            Route::post(
                '/returns/{sale}',
                [SaleReturnController::class, 'store']
            )->name('returns.store');

            Route::get(
                '/returns/{return}',
                [SaleReturnController::class, 'show']
            )->name('returns.show');

        });

});


/*
|--------------------------------------------------------------------------
| REGISTER ANOTHER BRANCH
|--------------------------------------------------------------------------
*/

Route::get(
    '/branches/register',
    [BranchController::class, 'register']
)->middleware('auth')->name('branches.register');

Route::post(
    '/branches/register',
    [BranchController::class, 'storeRegisteredBranch']
)->middleware('auth')->name('branches.register.store');


/*
|--------------------------------------------------------------------------
| CUSTOMERS
|--------------------------------------------------------------------------
*/

Route::prefix('admin/customers')
    ->name('admin.customers.')
    ->middleware(['auth', 'branch', 'subscription.active'])
    ->group(function () {

        Route::get(
            '/',
            [CustomerController::class, 'index']
        )->name('index');

        Route::get(
            '/create',
            [CustomerController::class, 'create']
        )->name('create');

        Route::post(
            '/',
            [CustomerController::class, 'store']
        )->name('store');

        Route::get(
            '/{customer}',
            [CustomerController::class, 'show']
        )->name('show');

        Route::get(
            '/{customer}/edit',
            [CustomerController::class, 'edit']
        )->name('edit');

        Route::put(
            '/{customer}',
            [CustomerController::class, 'update']
        )->name('update');

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
    ->middleware(['auth', 'branch', 'subscription.active'])
    ->group(function () {

        Route::get(
            '/',
            [CreditSaleController::class, 'index']
        )->name('index');

        Route::get(
            '/create',
            [CreditSaleController::class, 'create']
        )->name('create');

        Route::post(
            '/',
            [CreditSaleController::class, 'store']
        )->name('store');

        Route::get(
            '/{creditSale}',
            [CreditSaleController::class, 'show']
        )->name('show');

        Route::get(
            '/{creditSale}/edit',
            [CreditSaleController::class, 'edit']
        )->name('edit');

        Route::put(
            '/{creditSale}',
            [CreditSaleController::class, 'update']
        )->name('update');

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

Route::prefix('admin/debtors')
    ->name('admin.debtors.')
    ->middleware(['auth', 'branch', 'subscription.active'])
    ->group(function () {

        Route::get(
            '/',
            [DebtorController::class, 'index']
        )->name('index');

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
    ->middleware(['auth', 'branch', 'subscription.active'])
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
    ->middleware(['auth', 'branch', 'subscription.active'])
    ->group(function () {

        Route::get(
            '/daily',
            [ReportController::class, 'daily']
        )->name('daily');

        Route::get(
            '/weekly',
            [ReportController::class, 'weekly']
        )->name('weekly');

        Route::get(
            '/monthly',
            [ReportController::class, 'monthly']
        )->name('monthly');

        Route::get(
            '/yearly',
            [ReportController::class, 'yearly']
        )->name('yearly');

        Route::get(
            '/profit',
            [ReportController::class, 'profit']
        )->name('profit');

        Route::get(
            '/stock',
            [ReportController::class, 'stock']
        )->name('stock');

    });


/*
|--------------------------------------------------------------------------
| MARKETPLACE REPORTS
|--------------------------------------------------------------------------
| These are separate from POS subscription enforcement.
|--------------------------------------------------------------------------
*/

Route::prefix('admin/reports')
    ->name('admin.reports.')
    ->middleware(['auth', 'role:Super Admin|Admin'])
    ->group(function () {

        Route::get(
            '/marketplace',
            [MarketplaceListingActionController::class, 'index']
        )->name('marketplace');

        Route::get(
            '/marketplace/{report}',
            [MarketplaceListingActionController::class, 'adminShowReport']
        )->name('marketplace.show');

        Route::patch(
            '/marketplace/{report}/status',
            [MarketplaceListingActionController::class, 'updateReportStatus']
        )->name('marketplace.status');

        Route::patch(
            '/marketplace/{report}/disable-listing',
            [MarketplaceListingActionController::class, 'disableReportedListing']
        )->name('marketplace.disable-listing');

    });


/*
|--------------------------------------------------------------------------
| AUDIT
|--------------------------------------------------------------------------
*/

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
| Must remain accessible even when subscription expires.
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get(
        '/subscription',
        [SubscriptionController::class, 'index']
    )->name('subscription.index');

    Route::post(
        '/subscription/subscribe',
        [SubscriptionController::class, 'subscribe']
    )->name('subscription.subscribe');

    Route::post(
        '/subscription/payment-success',
        [SubscriptionController::class, 'paymentSuccess']
    )->name('subscription.payment.success');

});


/*
|--------------------------------------------------------------------------
| PUBLIC INFORMATION PAGES
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| MARKETPLACE PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::prefix('marketplace')
    ->name('marketplace.')
    ->group(function () {

        Route::get(
            '/',
            [MarketplaceController::class, 'index']
        )->name('index');

        Route::middleware('auth')->group(function () {

            Route::get(
                '/create',
                [MarketplaceController::class, 'create']
            )->name('create');

            Route::post(
                '/',
                [MarketplaceController::class, 'store']
            )->name('store');

        });

    });


/*
|--------------------------------------------------------------------------
| MARKETPLACE DASHBOARD
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get(
        '/marketplace/dashboard',
        [MarketplaceController::class, 'dashboard']
    )->name('marketplace.dashboard');

});


/*
|--------------------------------------------------------------------------
| MARKETPLACE REGISTRATION
|--------------------------------------------------------------------------
*/

Route::get('/marketplace/register', function () {
    return Inertia::render('Auth/Register', [
        'marketplace' => true,
    ]);
})->name('marketplace.register');

Route::post(
    '/marketplace/register',
    [
        \App\Http\Controllers\Auth\RegisteredUserController::class,
        'store'
    ]
)->name('marketplace.register.store');


/*
|--------------------------------------------------------------------------
| MARKETPLACE CATEGORIES AND LISTINGS
|--------------------------------------------------------------------------
*/

Route::get(
    '/marketplace/category/{slug}',
    [MarketplaceController::class, 'category']
)->name('marketplace.category');

Route::get(
    '/marketplace/listing/{listing:slug}',
    [MarketplaceController::class, 'show']
)->name('marketplace.listing.show');

Route::get(
    '/marketplace/new',
    [MarketplaceController::class, 'newProducts']
)->name('marketplace.new');

Route::get(
    '/marketplace/used',
    [MarketplaceController::class, 'usedProducts']
)->name('marketplace.used');

Route::get(
    '/marketplace/stores',
    [MarketplaceController::class, 'stores']
)->name('marketplace.stores');

Route::get(
    '/marketplace/store/{userId}',
    [MarketplaceController::class, 'storeShow']
)->name('marketplace.store');

Route::get(
    '/marketplace/offers',
    [MarketplaceController::class, 'offers']
)->name('marketplace.offers');

Route::get(
    '/marketplace/help',
    [MarketplaceController::class, 'help']
)->name('marketplace.help');

Route::get(
    '/marketplace/search',
    [MarketplaceController::class, 'search']
)->name('marketplace.search');


/*
|--------------------------------------------------------------------------
| MARKETPLACE PROFILE COMPLETION
|--------------------------------------------------------------------------
*/

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
| MARKETPLACE SETTINGS
|--------------------------------------------------------------------------
*/

Route::middleware('auth')
    ->prefix('marketplace/settings')
    ->name('marketplace.settings.')
    ->group(function () {

        Route::get(
            '/profile',
            [MarketplaceProfileController::class, 'profile']
        )->name('profile');

        Route::get(
            '/profile/edit',
            [MarketplaceProfileController::class, 'edit']
        )->name('profile.edit');

        Route::put(
            '/profile',
            [MarketplaceProfileController::class, 'update']
        )->name('profile.update');

    });


/*
|--------------------------------------------------------------------------
| MARKETPLACE SAVE AND REPORT LISTINGS
|--------------------------------------------------------------------------
*/

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

Route::middleware('auth')->group(function () {

    Route::get(
        '/marketplace/sales',
        [MarketplaceSellerController::class, 'sales']
    )->name('marketplace.sales');

    Route::get(
        '/marketplace/messages',
        [MarketplaceSellerController::class, 'messages']
    )->name('marketplace.messages');

    Route::get(
        '/marketplace/earnings',
        [MarketplaceSellerController::class, 'earnings']
    )->name('marketplace.earnings');

});


/*
|--------------------------------------------------------------------------
| DAILY POSTS MANAGEMENT
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:Super Admin|Admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::resource(
            'daily-posts',
            DailyPostController::class
        )
            ->except(['show'])
            ->parameters([
                'daily-posts' => 'dailyPost',
            ]);

        Route::patch(
            'daily-posts/{dailyPost}/toggle',
            [DailyPostController::class, 'toggle']
        )->name('daily-posts.toggle');

    });


/*
|--------------------------------------------------------------------------
| MARKETPLACE USER PAGES
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/marketplace/favourites', function () {
        return Inertia::render('Marketplace/Favourites');
    })->name('marketplace.favourites');

    Route::get('/marketplace/cart', function () {
        return Inertia::render('Marketplace/Cart');
    })->name('marketplace.cart');

});


require __DIR__.'/auth.php';

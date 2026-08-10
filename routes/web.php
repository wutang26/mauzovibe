<?php

use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\LowStockController;
use App\Http\Controllers\Admin\SaleController;
use App\Http\Controllers\Admin\SaleReturnController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BranchSelectionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
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

    Route::prefix('admin/users')
        ->name('admin.users.')
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

            Route::resource(
                'branches',
                BranchController::class
            );

        });


    /*
    |--------------------------------------------------------------------------
    | ASSIGN USER TO BRANCH
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/branches/{branch}/assign-user',
        [BranchController::class, 'assignUser']
    )->name('branches.assign-user');

    Route::post(
        '/admin/branches/{branch}/assign-user',
        [BranchController::class, 'storeAssignedUser']
    )->name('branches.store-assigned-user');


    /*
    |--------------------------------------------------------------------------
    | VIEW BRANCH
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/branches/{branch}/view',
        [BranchController::class, 'show']
    )->name('branches.show');


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
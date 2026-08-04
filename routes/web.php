<?php

use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BranchSelectionController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::prefix('profile')->group(function () {

        Route::get('/', [ProfileController::class, 'edit'])
            ->name('profile.edit');

        Route::patch('/', [ProfileController::class, 'update'])
            ->name('profile.update');

        Route::delete('/', [ProfileController::class, 'destroy'])
            ->name('profile.destroy');

    });

    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            /*
            |--------------------------------------------------------------------------
            | User Management
            |--------------------------------------------------------------------------
            */

            Route::prefix('users')
                ->name('users.')
                ->group(function () {

                    Route::get('/', [UserManagementController::class, 'index'])
                        ->name('index');

                    Route::get('/{user}/manage', [UserManagementController::class, 'edit'])
                        ->name('manage');

                    Route::post('/{user}/role', [UserManagementController::class, 'updateRole'])
                        ->name('role');

                    Route::post('/{user}/permissions', [UserManagementController::class, 'updatePermissions'])
                        ->name('permissions');

                });

            /*
|--------------------------------------------------------------------------
| Branch Management
|--------------------------------------------------------------------------
*/

            Route::resource('branches',
                \App\Http\Controllers\Admin\BranchController::class
            );

        });

        //Save the branch
        Route::post('/{user}/branch',
    [UserManagementController::class, 'updateBranch']
)->name('branch');
});

//Branch Selection

Route::middleware('auth')->group(function(){

    Route::get(
        '/choose-branch',
        [BranchSelectionController::class,'index']
    )->name('choose.branch');


    Route::post(
        '/choose-branch',
        [BranchSelectionController::class,'store']
    )->name('choose.branch.store');

});



Route::post(
'/login',
[LoginController::class,'store']
)
->name('login');



Route::post(
'/register',
[RegisterController::class,'store']
)
->name('register');



Route::middleware('auth')->group(function(){


Route::get(
'/choose-branch',
[BranchSelectionController::class,'index']
)
->name('choose.branch');



// Route::post(
// '/choose-branch',
// [BranchSelectionController::class,'store']
// )
// ->name('choose.branch.store');


});

require __DIR__ . '/auth.php';

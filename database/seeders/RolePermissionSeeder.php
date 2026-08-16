<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cached permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | PERMISSIONS
        |--------------------------------------------------------------------------
        */

        $permissions = [

            // Sales
            'view sales',
            'create sale',
            'delete sale',
            'refund sale',

            // Products
            'view products',
            'add product',
            'edit product',
            'delete product',

            // Reports
            'view reports',
            'export reports',

            // Users
            'manage users',

            // Settings
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | ROLES
        |--------------------------------------------------------------------------
        */

        $superAdmin = Role::firstOrCreate([
            'name' => 'Super Admin',
            'guard_name' => 'web',
        ]);

        $admin = Role::firstOrCreate([
            'name' => 'Admin',
            'guard_name' => 'web',
        ]);

        $manager = Role::firstOrCreate([
            'name' => 'Branch Manager',
            'guard_name' => 'web',
        ]);

        $cashier = Role::firstOrCreate([
            'name' => 'Cashier',
            'guard_name' => 'web',
        ]);

        $store = Role::firstOrCreate([
            'name' => 'Store Keeper',
            'guard_name' => 'web',
        ]);

        $accountant = Role::firstOrCreate([
            'name' => 'Accountant',
            'guard_name' => 'web',
        ]);

        /*
        |--------------------------------------------------------------------------
        | SUPER ADMIN
        |--------------------------------------------------------------------------
        */

        $superAdmin->syncPermissions(
            Permission::all()
        );

        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */

        $admin->syncPermissions([
            'view sales',
            'create sale',
            'delete sale',
            'refund sale',

            'view products',
            'add product',
            'edit product',
            'delete product',

            'view reports',
            'export reports',

            'manage users',
            'manage settings',
        ]);

        /*
        |--------------------------------------------------------------------------
        | BRANCH MANAGER
        |--------------------------------------------------------------------------
        */

        $manager->syncPermissions([
            'view sales',
            'create sale',
            'delete sale',
            'refund sale',

            'view products',
            'add product',
            'edit product',
            'delete product',

            'view reports',
            'export reports',
        ]);

        /*
        |--------------------------------------------------------------------------
        | CASHIER
        |--------------------------------------------------------------------------
        */

        $cashier->syncPermissions([
            'view sales',
            'create sale',
        ]);

        /*
        |--------------------------------------------------------------------------
        | STORE KEEPER
        |--------------------------------------------------------------------------
        */

        $store->syncPermissions([
            'view products',
            'add product',
            'edit product',
        ]);

        /*
        |--------------------------------------------------------------------------
        | ACCOUNTANT
        |--------------------------------------------------------------------------
        */

        $accountant->syncPermissions([
            'view reports',
            'export reports',
        ]);

        // Clear cache again
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
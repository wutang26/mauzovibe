<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {

        // Permissions

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


        foreach($permissions as $permission){

            Permission::create([
                'name'=>$permission
            ]);

        }



        // Roles

        $superAdmin = Role::create([
            'name'=>'Super Admin'
        ]);

        $manager = Role::create([
            'name'=>'Branch Manager'
        ]);


        $cashier = Role::create([
            'name'=>'Cashier'
        ]);


        $store = Role::create([
            'name'=>'Store Keeper'
        ]);


        $accountant = Role::create([
            'name'=>'Accountant'
        ]);



        // Super Admin gets everything

        $superAdmin->givePermissionTo(
            Permission::all()
        );


        // Cashier permissions

        $cashier->givePermissionTo([
            'view sales',
            'create sale',
        ]);



        // Store keeper

        $store->givePermissionTo([
            'view products',
            'add product'
        ]);



        // Accountant

        $accountant->givePermissionTo([
            'view reports',
            'export reports'
        ]);

    }
}
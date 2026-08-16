<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | SUPER ADMIN
        |--------------------------------------------------------------------------
        */

        $superAdmin = User::updateOrCreate(
            [
                'email' => 'superadmin@mauzovibe.co.tz',
            ],
            [
                'name' => 'MauzoVibe Super Admin',
                'password' => Hash::make('SuperAdmin@12345'),
            ]
        );

        $superAdmin->syncRoles(['Super Admin']);

        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */

        $admin = User::updateOrCreate(
            [
                'email' => 'admin@mauzovibe.co.tz',
            ],
            [
                'name' => 'MauzoVibe Admin',
                'password' => Hash::make('Admin@12345'),
            ]
        );

        $admin->syncRoles(['Admin']);
    }
}
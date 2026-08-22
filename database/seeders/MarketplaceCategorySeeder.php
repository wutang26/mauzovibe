<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MarketplaceCategory;
use Illuminate\Support\Str;

class MarketplaceCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [

            ['Electronics','smartphone'],
            ['Vehicles','car'],
            ['Property','home'],
            ['Fashion','shirt'],
            ['Jobs','briefcase'],
            ['Services','wrench'],
            ['Furniture','sofa'],
            ['Phones','smartphone'],
            ['Computers','laptop'],
            ['Beauty','sparkles'],
            ['Sports','dumbbell'],
            ['Agriculture','leaf'],
            ['Animals','paw'],
            ['Baby Products','baby'],
            ['Books','book'],
            ['Gaming','gamepad'],
            ['Music','music'],
            ['Health','heart-pulse'],
            ['Industrial Equipment','factory'],
            ['Other','grid'],

        ];

        foreach ($categories as $index => $item) {

            MarketplaceCategory::updateOrCreate(

                ['slug' => Str::slug($item[0])],

                [
                    'name'           => $item[0],
                    'icon'           => $item[1],
                    'sort_order'     => $index + 1,
                    'is_active'      => true,
                    'listings_count' => 0,
                ]

            );

        }
    }
}
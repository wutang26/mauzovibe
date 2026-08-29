<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketplaceCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'listings_count',
        'is_active',
        'sort_order',
    ];

    public function listings()
    {
        return $this->hasMany(
            MarketplaceListing::class,
            'marketplace_category_id'
        );
    }
}
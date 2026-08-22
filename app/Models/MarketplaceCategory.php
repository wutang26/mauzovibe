<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MarketplaceCategory extends Model
{

    protected $fillable = ['name', 'slug', 'icon', 
    'listings_count', 'is_active', 'sort_order'];
    
    public function listings()
    {
        return $this->hasMany(MarketplaceListing::class);
    }
}

// app/Models/MarketplaceListing.php
class MarketplaceListing extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'marketplace_category_id', 'title', 'slug', 'description',
        'price', 'condition', 'location', 'city', 'region', 'images',
        'status', 'is_featured', 'views'
    ];

    protected $casts = [
        'images' => 'array',
        'is_featured' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(MarketplaceCategory::class, 'marketplace_category_id');
    }
}


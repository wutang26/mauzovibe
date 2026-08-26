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
        return $this->hasMany(MarketplaceListing::class, 'category_id');
    }
}



<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketplaceListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'marketplace_category_id',
        'title',
        'slug',
        'description',
        'price',
        'condition',
        'location',
        'city',
        'images',
        'status',
        'is_featured',
        'views_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'images' => 'array',
        'is_featured' => 'boolean',
        'views_count' => 'integer',
    ];

    // /**
    //  * Seller / owner
    //  */
    // public function user(): BelongsTo
    // {
    //     return $this->belongsTo(User::class);
    // }
/**
 * Seller / owner
 */
public function user(): BelongsTo
{
    return $this->belongsTo(User::class, 'user_id');
}

/**
 * Seller relationship
 *
 * Alias ya user() kwa Marketplace UI
 */
public function seller(): BelongsTo
{
    return $this->belongsTo(User::class, 'user_id');
}
    /**
     * Marketplace category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(
            MarketplaceCategory::class,
            'marketplace_category_id'
        );
    }

    /**
     * Active listings
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Featured listings
     */
    public function scopeFeatured($query)
    {
        return $query
            ->where('status', 'active')
            ->where('is_featured', true);
    }
}
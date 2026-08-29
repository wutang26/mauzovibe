<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketplaceCartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'listing_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(
            MarketplaceCart::class,
            'cart_id'
        );
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(
            MarketplaceListing::class,
            'listing_id'
        );
    }
}
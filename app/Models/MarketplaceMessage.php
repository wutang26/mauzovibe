<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketplaceMessage extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'listing_id',
        'offer_id',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'sender_id'
        );
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'receiver_id'
        );
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(
            MarketplaceListing::class,
            'listing_id'
        );
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(
            MarketplaceOffer::class,
            'offer_id'
        );
    }
}
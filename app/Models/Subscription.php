<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'branch_id',
        'plan',
        'amount',
        'status',
        'trial_started_at',
        'trial_ends_at',
        'started_at',
        'ends_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'trial_started_at' => 'datetime',
        'trial_ends_at' => 'datetime',
        'started_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
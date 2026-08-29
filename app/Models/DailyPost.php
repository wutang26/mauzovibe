<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyPost extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'button_text',
        'button_url',
        'type',
        'starts_at',
        'ends_at',
        'is_active',
        'sort_order',
        'created_by',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive($query)
    {
        return $query
            ->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('starts_at')
                    ->orWhere('starts_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('ends_at')
                    ->orWhere('ends_at', '>=', now());
            });
    }
}
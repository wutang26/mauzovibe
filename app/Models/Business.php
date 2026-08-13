<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'logo',
    ];

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }
}
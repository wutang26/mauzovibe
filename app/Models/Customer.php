<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'name',
        'phone',
        'email',
        'address',
        'notes',
    ];

    /**
     * Customer belongs to a branch.
     */
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    /**
     * Customer has many sales.
     */
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
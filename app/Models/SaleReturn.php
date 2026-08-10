<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleReturn extends Model
{
    use HasFactory;

    protected $table = 'returns';

    protected $fillable = [
        'branch_id',
        'sale_id',
        'user_id',
        'return_number',
        'refund_amount',
        'refund_method',
        'reason',
        'status',
    ];

    protected $casts = [
        'refund_amount' => 'decimal:2',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

        public function items()
    {
        return $this->hasMany(
            ReturnItem::class,
            'return_id'
        );
    }

}
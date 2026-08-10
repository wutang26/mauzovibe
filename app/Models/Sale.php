<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'user_id',
        'customer_id',
        'invoice_number',
        'subtotal',
        'discount',
        'total',
        'payment_method',
        'payment_status',
        'paid_amount',
        'change_amount',
        'status',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'change_amount' => 'decimal:2',
    ];

    /**
     * Branch where the sale was made.
     */
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    /**
     * Cashier/user who made the sale.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Customer associated with the sale.
     * Nullable for walk-in customers.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Products/items included in this sale.
     */
    public function items()
    {
        return $this->hasMany(SaleItem::class);
    }

    //Sales Returns
    public function returns()
{
    return $this->hasMany(SaleReturn::class);
}
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'branch_id',
        'category_id',
        'name',
        'sku',
        'barcode',
        'cost_price',
        'selling_price',
        'quantity',
        'unit',
        'image',
        'status',
        'low_stock_limit',
    ];

    /**
     * Return the product image as the public S3 URL.
     */
    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        // If image is already a complete URL, return it directly.
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        return Storage::disk('public')->url($this->image);
    }

    // Branch
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    // Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Stock Movement
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    /**
     * Sales containing this product.
     */
    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }
}


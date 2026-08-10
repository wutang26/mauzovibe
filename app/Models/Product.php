<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

        //Low stock Limit
        'low_stock_limit',

    ];

//Branch
    public function branch()
    {

        return $this->belongsTo(
            Branch::class
        );

    }

//Category
    public function category()
    {

        return $this->belongsTo(
            Category::class
        );

    }

    //StockMovement
    public function stockMovements()
{
    return $this->hasMany(
        StockMovement::class
    );
}

/**
 * Sales containing this product.
 */
public function saleItems()
{
    return $this->hasMany(SaleItem::class);
}
}

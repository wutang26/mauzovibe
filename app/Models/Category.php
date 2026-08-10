<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Category extends Model
{
    //

    protected $fillable = [

        'branch_id',
        'name',
        'description',
        'status'

    ];

//Branch Relation
    public function branch(): BelongsTo
    {

        return $this->belongsTo(
            Branch::class
        );

    }

//product
public function products()
{

    return $this->hasMany(
        Product::class
    );

}

}

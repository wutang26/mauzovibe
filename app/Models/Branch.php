<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Branch extends Model
{

    use HasFactory;


    protected $fillable = [
        'business_id',
        'name',
        'location',
        'description'

    ];


//Relation to user
        public function users()
    {
        return $this->belongsToMany(
            User::class,
            'branch_user'
        )->withPivot('is_default')
        ->withTimestamps();
    }

    //Relation to Caregory
    public function categories(): HasMany
{
    return $this->hasMany(
        Category::class
    );
}

//ONE TO many
    //   public function users()
    // {
    //     return $this->hasMany(
    //         User::class,
    //         'branch_id'
    //     );
    // }

    //HasManySale
        public function sales()
    {
        return $this->hasMany(Sale::class);
    }

        public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    //Subscription 
    public function subscription(): HasOne
{
    return $this->hasOne(Subscription::class);
}
}
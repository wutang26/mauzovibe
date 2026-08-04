<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Branch extends Model
{

    use HasFactory;


    protected $fillable = [

        'name',
        'location',
        'description'

    ];



    // public function users()
    // {
    //     return $this->hasMany(User::class,'branch_user');
    // }

        public function users()
    {
        return $this->belongsToMany(
            User::class,
            'branch_user'
        )->withPivot('is_default')
        ->withTimestamps();
    }

}
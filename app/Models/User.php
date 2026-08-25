<?php
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Branch;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Audit;

//Manage Spatie permissions
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'branch_id',
        'city',
        'location',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    #Manage Branch Shops
      public function branches()
    {
        return $this->belongsToMany(
            Branch::class,
            'branch_user',
            'user_id',
            'branch_id'
        );
    }
    
    // public function branches()
    // {
    //     return $this->belongsToMany(
    //         Branch::class,
    //         'branch_user'
    //     )->withPivot('is_default');
    // }

    

// public function branch()
// {
//     return $this->belongsTo(
//         Branch::class,
//         'branch_id'
//     );
// }

//User hasMany Sales
public function sales()
{
    return $this->hasMany(Sale::class);
}

//Audit
public function audits()
{
    return $this->hasMany(Audit::class);
}

//bussiness
   public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'full_name',
        'avatar',
        'phone',
        'city',
        'country',
        'type',
        'is_verified',
        'rating',
    ];

    /**
     * Appended attributes for API responses
     */
    protected $appends = [
        'avatar_url',
    ];

    /**
     * Type casting
     */
    protected $casts = [
        'is_verified' => 'boolean',
        'rating' => 'integer',
    ];

    
     // Relationship: Profile belongs to a User
     
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
     // Accessor: get full URL for avatar
     
    public function getAvatarUrlAttribute()
    {
        return $this->avatar
            ? asset('storage/' . $this->avatar)
            : asset('images/default-avatar.png');
    }


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'fuel_type_id',
        'transmission_id',
        'location_id',
        'title',
        'miles',
        'price',
        'year',
        'condition',
        'status',
        'description',
    ];

    // Relationships
    public function brand()        { return $this->belongsTo(Brand::class); }
    public function fuelType()     { return $this->belongsTo(FuelType::class); }
    public function transmission() { return $this->belongsTo(Transmission::class); }
    public function location()     { return $this->belongsTo(Location::class); }
    public function images()       { return $this->hasMany(CarImage::class); }

    // 🔍 Search Scope
    public function scopeSearch($query, $search)
    {
        if (!filled($search)) {
            return $query;
        }

        $search = trim($search);

        return $query->where(function ($q) use ($search) {
            $q->where('title', 'LIKE', "%{$search}%")
              ->orWhere('condition', 'LIKE', "%{$search}%")
              ->orWhere('status', 'LIKE', "%{$search}%")

              ->orWhereHas('brand', fn ($b) =>
                  $b->where('name', 'LIKE', "%{$search}%")
              )

              ->orWhereHas('fuelType', fn ($f) =>
                  $f->where('name', 'LIKE', "%{$search}%")
              )

              ->orWhereHas('transmission', fn ($t) =>
                  $t->where('name', 'LIKE', "%{$search}%")
              )

              ->orWhereHas('location', fn ($l) =>
                  $l->where('city', 'LIKE', "%{$search}%")
              );
        });
    }
}

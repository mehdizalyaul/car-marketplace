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
         'year',             // important
        'condition',        // new / used
        'status',           // available / sold
        'description', 
    ];

    // Relationships
    public function brand()        { return $this->belongsTo(Brand::class); }
    public function fuelType()     { return $this->belongsTo(FuelType::class); }
    public function transmission() { return $this->belongsTo(Transmission::class); }
    public function location()     { return $this->belongsTo(Location::class); }
    public function images()       { return $this->hasMany(CarImage::class); }

    
}

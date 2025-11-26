<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
public function toArray($request)
{
    return [
        'id'            => $this->id,
        'title'         => $this->title,
        'miles'         => $this->miles,
        'price'         => $this->price,
        'year'          => $this->year,
        'condition'     => $this->condition,
        'status'        => $this->status,
        'description'        => $this->description,

        // Relationships (safe with null handling)
        'brand'         => $this->brand->name ?? null,
        'fuel'          => $this->fuelType->name ?? null,
        'transmission'  => $this->transmission->name ?? null,
        'location'      => $this->location->city ?? null,

        // Return image URLs as array
        'image'          => $this->images->first()?->url,
    ];
}

}

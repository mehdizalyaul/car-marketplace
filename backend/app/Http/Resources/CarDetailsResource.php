<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarDetailsResource extends JsonResource
{
  public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'description'   => $this->description,
            'price'         => $this->price,
            'year'          => $this->year,
            'miles'         => $this->miles,
            'condition'     => $this->condition,
            'status'        => $this->status,
            'brand'         => $this->brand->name,
            'fuel_type'     => $this->fuelType->name,
            'transmission'  => $this->transmission->name,
            'location'      => $this->location->city,
           

            // FULL ARRAY OF IMAGE URLs
            'images' => $this->images->pluck('url'),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'miles'        => $this->miles,
            'price'        => $this->price,
            'year'         => $this->year,
            'condition'    => $this->condition,
            'status'       => $this->status,
            'description'  => $this->description,

            'brand'        => $this->brand->name ?? null,
            'fuel'         => $this->fuelType->name ?? null,
            'transmission' => $this->transmission->name ?? null,
            'location'     => $this->location->city ?? null,

            'is_wishlisted' => $this->when(
            isset($this->is_wishlisted),
            (bool) $this->is_wishlisted
        ),
            'image'        => $this->images->first()?->url
        ];
    }
}

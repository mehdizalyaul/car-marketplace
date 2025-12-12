<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CarResource;
use App\Http\Resources\CarDetailsResource;
use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use App\Models\Brand;
use App\Models\FuelType;
use App\Models\Transmission;
use App\Models\Location;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    private function toArray($value)
    {
        return is_array($value) ? $value : explode(',', $value);
    }
    // GET /cars/auth (authenticated)
    public function index(Request $request)
    {
        // ------------------------------------
        // 1) Get current user's wishlisted car IDs
        // ------------------------------------
        $user = $request->user();
        $wishlistCarIds = $user
         ? Wishlist::where('user_id', $user->id)->pluck('car_id')->toArray()
         : [];
        Log::info('Current user', ['user' => $request->user()]);

        // ------------------------------------
        // 2) Start Cars Query
        // ------------------------------------
        $query = Car::with([
            'brand', 'fuelType', 'transmission', 'location', 'images'
        ]);

        $toArr = fn($v) => is_array($v) ? $v : explode(',', $v);


        // BRAND
        if ($request->filled('brand')) {
            $query->whereHas('brand', fn($q) =>
                $q->whereIn('name', $toArr($request->brand))
            );
        }

        // FUEL
        if ($request->filled('fuel')) {
            $query->whereHas('fuelType', fn($q) =>
                $q->whereIn('name', $toArr($request->fuel))
            );
        }

        // TRANSMISSION
        if ($request->filled('transmission')) {
            $query->whereHas('transmission', fn($q) =>
                $q->whereIn('name', $toArr($request->transmission))
            );
        }

        // LOCATION
        if ($request->filled('location')) {
            $query->whereHas('location', fn($q) =>
                $q->whereIn('city', $toArr($request->location))
            );
        }

        // PRICE RANGE
        $query->when($request->min_price, fn($q, $v) => $q->where('price', '>=', $v));
        $query->when($request->max_price, fn($q, $v) => $q->where('price', '<=', $v));

        // MILES RANGE
        $query->when($request->min_miles, fn($q, $v) => $q->where('miles', '>=', $v));
        $query->when($request->max_miles, fn($q, $v) => $q->where('miles', '<=', $v));

        // CONDITION / STATUS
        if ($request->filled('condition')) {
            $query->whereIn('condition', $toArr($request->condition));
        }
        if ($request->filled('status')) {
            $query->whereIn('status', $toArr($request->status));
        }

        // SORTING
        switch ($request->input('sort')) {
            case 'price_low':  $query->orderBy('price', 'asc'); break;
            case 'price_high': $query->orderBy('price', 'desc'); break;
            case 'miles_low':  $query->orderBy('miles', 'asc'); break;
            case 'miles_high': $query->orderBy('miles', 'desc'); break;
            default: $query->latest();
        }


        // ------------------------------------
        // 3) Pagination
        // ------------------------------------
        $pageSize = $request->input('pageSize', 12);
        $cars = $query->paginate($pageSize);

        // Attach "is_wishlisted" flag to each car instance
        $cars->getCollection()->transform(function ($car) use ($wishlistCarIds) {
            $car->is_wishlisted = in_array($car->id, $wishlistCarIds);
            return $car;
        });

        // ------------------------------------
        // 4) Filters
        // ------------------------------------
        $filters = [
            'brands'        => Brand::select('name')->orderBy('name')->pluck('name'),
            'fuels'         => FuelType::select('name')->orderBy('name')->pluck('name'),
            'transmissions' => Transmission::select('name')->orderBy('name')->pluck('name'),
            'locations'     => Location::select('city')->orderBy('city')->pluck('city'),
            'price'         => Car::select('price')->distinct()->orderBy('price')->pluck('price')->toArray(),
            'mileage'       => Car::select('miles')->distinct()->orderBy('miles')->pluck('miles')->toArray(),
            'conditions'    => Car::distinct()->pluck('condition'),
            'statuses'      => Car::distinct()->pluck('status'),
        ];

        return response()->json([
            'cars' => CarResource::collection($cars),
            'filters' => $filters,
            'pagination' => [
                'total' => $cars->total(),
                'current_page' => $cars->currentPage(),
                'last_page' => $cars->lastPage(),
            ]
        ]);
    }
        // GET /cars (public)

    public function indexPublic(Request $request)
    {
        
        // ------------------------------------
        // 2) Start Cars Query
        // ------------------------------------
        $query = Car::with([
            'brand', 'fuelType', 'transmission', 'location', 'images'
        ]);

        $toArr = fn($v) => is_array($v) ? $v : explode(',', $v);


        // BRAND
        if ($request->filled('brand')) {
            $query->whereHas('brand', fn($q) =>
                $q->whereIn('name', $toArr($request->brand))
            );
        }

        // FUEL
        if ($request->filled('fuel')) {
            $query->whereHas('fuelType', fn($q) =>
                $q->whereIn('name', $toArr($request->fuel))
            );
        }

        // TRANSMISSION
        if ($request->filled('transmission')) {
            $query->whereHas('transmission', fn($q) =>
                $q->whereIn('name', $toArr($request->transmission))
            );
        }

        // LOCATION
        if ($request->filled('location')) {
            $query->whereHas('location', fn($q) =>
                $q->whereIn('city', $toArr($request->location))
            );
        }

        // PRICE RANGE
        $query->when($request->min_price, fn($q, $v) => $q->where('price', '>=', $v));
        $query->when($request->max_price, fn($q, $v) => $q->where('price', '<=', $v));

        // MILES RANGE
        $query->when($request->min_miles, fn($q, $v) => $q->where('miles', '>=', $v));
        $query->when($request->max_miles, fn($q, $v) => $q->where('miles', '<=', $v));

        // CONDITION / STATUS
        if ($request->filled('condition')) {
            $query->whereIn('condition', $toArr($request->condition));
        }
        if ($request->filled('status')) {
            $query->whereIn('status', $toArr($request->status));
        }

        // SORTING
        switch ($request->input('sort')) {
            case 'price_low':  $query->orderBy('price', 'asc'); break;
            case 'price_high': $query->orderBy('price', 'desc'); break;
            case 'miles_low':  $query->orderBy('miles', 'asc'); break;
            case 'miles_high': $query->orderBy('miles', 'desc'); break;
            default: $query->latest();
        }


        // ------------------------------------
        // 3) Pagination
        // ------------------------------------
        $pageSize = $request->input('pageSize', 12);
        $cars = $query->paginate($pageSize);


        // ------------------------------------
        // 4) Filters
        // ------------------------------------
        $filters = [
            'brands'        => Brand::select('name')->orderBy('name')->pluck('name'),
            'fuels'         => FuelType::select('name')->orderBy('name')->pluck('name'),
            'transmissions' => Transmission::select('name')->orderBy('name')->pluck('name'),
            'locations'     => Location::select('city')->orderBy('city')->pluck('city'),
            'price'         => Car::select('price')->distinct()->orderBy('price')->pluck('price')->toArray(),
            'mileage'       => Car::select('miles')->distinct()->orderBy('miles')->pluck('miles')->toArray(),
            'conditions'    => Car::distinct()->pluck('condition'),
            'statuses'      => Car::distinct()->pluck('status'),
        ];

        return response()->json([
            'cars' => CarResource::collection($cars),
            'filters' => $filters,
            'pagination' => [
                'total' => $cars->total(),
                'current_page' => $cars->currentPage(),
                'last_page' => $cars->lastPage(),
            ]
        ]);
    }


// GET /cars/{id}
 public function show($id)
    {
          $car = Car::with(['brand', 'fuelType', 'transmission', 'location', 'images'])->findOrFail($id);
    return new CarDetailsResource($car);
    }


public function update(Request $request, Car $car)
{
    $validated = $request->validate([
        'brand_id' => 'exists:brands,id',
        'fuel_type_id' => 'exists:fuel_types,id',
        'transmission_id' => 'exists:transmissions,id',
        'location_id' => 'exists:locations,id',
        'title' => 'string|max:255',
        'description' => 'string',
        'miles' => 'integer|min:0',
        'price' => 'numeric|min:0',
        'year' => 'integer|min:1900|max:'.date('Y'),
        'condition' => 'in:new,used',
        'status' => 'in:available,sold,reserved'
    ]);

    $car->update($validated);

    return response()->json($car);
}

public function destroy(Car $car)
{
    $car->delete();
    return response()->json(['message' => 'Car deleted']);
}

}

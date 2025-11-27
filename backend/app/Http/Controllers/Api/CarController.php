<?php

namespace App\Http\Controllers\Api;
use App\Http\Resources\CarDetailsResource;
use App\Http\Resources\CarResource;
use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use App\Models\Brand;
use App\Models\FuelType;
use App\Models\Transmission;
use App\Models\Location;

class CarController extends Controller
{

    private function convertToArray($value)
{
    return is_array($value)
        ? $value                         // ?brand[]=Ford&brand[]=Toyota
        : explode(',', $value);          // ?brand=Ford,Toyota
}
  // Get all cars with relationships
 
public function index(Request $request)

{
  

    $query = Car::with([
        'brand',
        'fuelType',
        'transmission',
        'location',
        'images'
    ]);

    // Helper for multi-value filter
    $toArray = fn($value) =>
        is_array($value) ? $value : explode(',', $value);

    // BRAND
    if ($request->filled('brand')) {
        $query->whereHas('brand', fn($q) =>
            $q->whereIn('name', $toArray($request->brand))
        );
    }

    // FUEL
    if ($request->filled('fuel')) {
        $query->whereHas('fuelType', fn($q) =>
            $q->whereIn('name', $toArray($request->fuel))
        );
    }

    // TRANSMISSION
    if ($request->filled('transmission')) {
        $query->whereHas('transmission', fn($q) =>
            $q->whereIn('name', $toArray($request->transmission))
        );
    }

    // LOCATION
    if ($request->filled('location')) {
        $query->whereHas('location', fn($q) =>
            $q->whereIn('city', $toArray($request->location))
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
        $query->whereIn('condition', $toArray($request->condition));
    }
    if ($request->filled('status')) {
        $query->whereIn('status', $toArray($request->status));
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
    // ✅ Filters Data for Frontend
    // ------------------------------------
    $filters = [
        'brands'        => Brand::select('name')->orderBy('name')->pluck('name'),
        'fuels'         => FuelType::select('name')->orderBy('name')->pluck('name'),
        'transmissions' => Transmission::select('name')->orderBy('name')->pluck('name'),
        'locations'     => Location::select('city')->orderBy('city')->pluck('city'),

       'price' => Car::select('price')->distinct()->orderBy('price')->pluck('price')->toArray(),
    'mileage' => Car::select('miles')->distinct()->orderBy('miles')->pluck('miles')->toArray(),
        'conditions' => Car::select('condition')->distinct()->pluck('condition'),
        'statuses'   => Car::select('status')->distinct()->pluck('status'),
    ];

    $pageSize = $request->input('pageSize', 12);
$cars = $query->paginate($pageSize);

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

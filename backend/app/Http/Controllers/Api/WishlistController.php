<?php

namespace App\Http\Controllers\Api;

use App\Models\Wishlist;
use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;


class WishlistController extends Controller
{
    // GET /wishlist
public function index(Request $request)
{
    $wishlist = Wishlist::with('car')
        ->where('user_id', $request->user()->id)
        ->get();

    return WishlistResource::collection($wishlist);
}


    // POST /wishlist/{carId}
   public function store(Request $request, $carId)
{
    // Check car exists
    if (!Car::find($carId)) {
        return response()->json(['message' => 'Car not found'], 404);
    }

    $wishlist = Wishlist::firstOrCreate([
        'user_id' => $request->user()->id,
        'car_id' => $carId,
    ]);

    $message = $wishlist->wasRecentlyCreated ? 'Added to wishlist' : 'Already in wishlist';

    return response()->json([
        'message' => $message,
        'data' => $wishlist
    ], 201);
}


    // DELETE /wishlist/{carId}
    public function destroy(Request $request, $carId)
    {
        $deleted = Wishlist::where('user_id', $request->user()->id)
            ->where('car_id', $carId)
            ->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Not in wishlist'], 404);
        }

        return response()->json(['message' => 'Removed from wishlist']);
    }

    // GET /wishlist/check/{carId}
    public function check(Request $request, $carId)
    {
        $exists = Wishlist::where('user_id', $request->user()->id)
            ->where('car_id', $carId)
            ->exists();

        return response()->json(['inWishlist' => $exists]);
    }

    // DELETE /wishlist/clear
    public function clear(Request $request)
    {
        Wishlist::where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'Wishlist cleared']);

    }
}

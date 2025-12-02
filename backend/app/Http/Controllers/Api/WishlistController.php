<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Car;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    // GET /wishlist
    public function index(Request $request)
    {
        return Wishlist::with('car')
            ->where('user_id', $request->user()->id)
            ->get();
    }

    // POST /wishlist/{carId}
    public function store(Request $request, $carId)
    {
        // Check if car exists
        if (!Car::find($carId)) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'car_id' => $carId,
        ]);

        return response()->json([
            'message' => 'Added to wishlist',
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
}

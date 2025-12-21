<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\ProfileController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

Route::prefix('cars')->group(function () {

    //  Public routes
    Route::get('/', [CarController::class, 'indexPublic']);

    //  Authenticated routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth', [CarController::class, 'index']); // includes is_wishlisted
        Route::post('/', [CarController::class, 'store']);
        Route::put('/{car}', [CarController::class, 'update']);
        Route::delete('/{car}', [CarController::class, 'destroy']);
    });

  
    Route::get('/{car}', [CarController::class, 'show']);
});



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/{carId}', [WishlistController::class, 'store']);
    Route::delete('/wishlist/clear', [WishlistController::class, 'clear']);
    Route::delete('/wishlist/{carId}', [WishlistController::class, 'destroy']);

    Route::get('/wishlist/check/{carId}', [WishlistController::class, 'check']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/', [ProfileController::class, 'update']);
        Route::put('/change-password', [ProfileController::class, 'changePassword']);
        Route::post('/avatar', [ProfileController::class, 'uploadAvatar']);

    });
});

Route::get('/search', [SearchController::class, 'search']);

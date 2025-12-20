<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
     
    // Show authenticated user profile
     
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()->load('profile')),
        ]);
    }

    
     // Update profile + optional user password
     
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validated();

        //Update USER (auth data)
        if (isset($data['password'])) {
            $user->update([
                'password' => Hash::make($data['password']),
            ]);
        }

        // Update PROFILE (profile data)
        $user->profile->update(
            collect($data)->except(['password'])->toArray()
        );

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => new UserResource($user->load('profile')),
        ]);
    }

    
    //  Upload profile avatar
     
    public function uploadAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $profile = $request->user()->profile;

        // Delete old avatar if exists
        if ($profile->avatar) {
            Storage::disk('public')->delete($profile->avatar);
        }

        // Store new avatar
        $path = $request->file('avatar')->store(
            'avatars/profiles',
            'public'
        );

        // Save in profile
        $profile->update([
            'avatar' => $path,
        ]);

        return response()->json([
            'message' => 'Avatar uploaded successfully',
            'avatar_url' => asset('storage/' . $path),
        ]);
    }
}

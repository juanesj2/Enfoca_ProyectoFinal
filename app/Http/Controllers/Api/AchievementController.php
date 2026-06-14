<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CoupleAchievement;

class AchievementController extends Controller
{
    /**
     * Get all unlocked achievements for the authenticated user's couple
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user->couple_id) {
            return response()->json(['message' => 'Not in a couple'], 400);
        }

        $achievements = CoupleAchievement::where('couple_id', $user->couple_id)->get();

        return response()->json($achievements);
    }

    /**
     * Unlock a new achievement
     */
    public function unlock(Request $request)
    {
        $request->validate([
            'achievement_id' => 'required|string|max:255',
        ]);

        $user = Auth::user();
        if (!$user->couple_id) {
            return response()->json(['message' => 'Not in a couple'], 400);
        }

        // Check if already unlocked
        $existing = CoupleAchievement::where('couple_id', $user->couple_id)
            ->where('achievement_id', $request->achievement_id)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Achievement already unlocked',
                'achievement' => $existing,
                'newly_unlocked' => false
            ]);
        }

        $achievement = CoupleAchievement::create([
            'couple_id' => $user->couple_id,
            'achievement_id' => $request->achievement_id,
            'unlocked_at' => now(),
        ]);

        return response()->json([
            'message' => 'Achievement unlocked successfully',
            'achievement' => $achievement,
            'newly_unlocked' => true
        ], 201);
    }
}

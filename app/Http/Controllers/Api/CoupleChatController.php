<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Couple;
use App\Models\CoupleMessage;
use Illuminate\Support\Facades\Auth;

class CoupleChatController extends Controller
{
    private function getCoupleForUser($userId)
    {
        return Couple::where('user1_id', $userId)
            ->orWhere('user2_id', $userId)
            ->first();
    }

    public function index()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $messages = CoupleMessage::where('couple_id', $couple->id)
            ->with(['user:id,name', 'photo'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $request->validate([
            'mensaje' => 'required|string',
            'love_photo_id' => 'nullable|exists:love_photos,id'
        ]);

        $message = CoupleMessage::create([
            'couple_id' => $couple->id,
            'user_id' => $user->id,
            'mensaje' => $request->mensaje,
            'love_photo_id' => $request->love_photo_id,
        ]);

        return response()->json([
            'message' => 'Mensaje enviado',
            'chat_message' => $message->load(['user:id,name', 'photo'])
        ], 201);
    }
}

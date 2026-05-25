<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Couple;
use App\Models\LovePhoto;
use App\Models\LoveAlbum;
use App\Models\LovePhotoReaction;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class LoveAlbumController extends Controller
{
    private function getCoupleForUser($userId)
    {
        return Couple::where('user1_id', $userId)
            ->orWhere('user2_id', $userId)
            ->first();
    }

    public function getCoupleInfo()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        return response()->json($couple);
    }

    public function index()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $photos = LovePhoto::where('couple_id', $couple->id)
            ->with(['user:id,name,email', 'reactions.user:id,name'])
            ->orderBy('fecha_recuerdo', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($photos);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $request->validate([
            // Usamos 'file' en lugar de 'image' por si el servidor (AlwaysData)
            // no tiene activa la extensión 'fileinfo' que Laravel usa para verificar mimes.
            // Aumentamos el límite a 15MB (15360 KB) para móviles modernos.
            'image' => 'required|file|max:15360',
            'description' => 'nullable|string|max:500',
            'fecha_recuerdo' => 'nullable|date'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('love_album', 'public');

            // --- Calcular racha ---
            $today = \Carbon\Carbon::now()->startOfDay();
            $lastPhotoDate = $couple->last_photo_date ? \Carbon\Carbon::parse($couple->last_photo_date)->startOfDay() : null;

            if (!$lastPhotoDate) {
                $couple->current_streak = 1;
                $couple->longest_streak = 1;
            } else {
                $diffInDays = $today->diffInDays($lastPhotoDate);
                if ($diffInDays == 1) {
                    $couple->current_streak += 1;
                    if ($couple->current_streak > $couple->longest_streak) {
                        $couple->longest_streak = $couple->current_streak;
                    }
                } elseif ($diffInDays > 1) {
                    $couple->current_streak = 1;
                }
            }
            $couple->last_photo_date = now();
            $couple->save();

            $photo = LovePhoto::create([
                'couple_id' => $couple->id,
                'user_id' => $user->id,
                'image_path' => $imagePath,
                'description' => $request->description,
                'fecha_recuerdo' => $request->fecha_recuerdo ?? now(),
            ]);

            return response()->json([
                'message' => 'Foto subida con éxito',
                'photo' => $photo->load('user:id,name,email'),
                'streak' => $couple->current_streak
            ], 201);
        }

        return response()->json(['message' => 'Falta la imagen'], 400);
    }

    public function react(Request $request, $id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $photo = LovePhoto::where('couple_id', $couple->id)->find($id);

        if (!$photo) {
            return response()->json(['message' => 'Foto no encontrada'], 404);
        }

        $request->validate([
            'content' => 'required|string|max:50'
        ]);

        $reaction = LovePhotoReaction::create([
            'love_photo_id' => $photo->id,
            'user_id' => $user->id,
            'content' => $request->content
        ]);

        return response()->json(['message' => 'Reacción añadida', 'reaction' => $reaction->load('user:id,name')]);
    }

    public function show($id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $photo = LovePhoto::where('couple_id', $couple->id)
            ->with(['user:id,name,email', 'reactions.user:id,name'])
            ->find($id);

        if (!$photo) {
            return response()->json(['message' => 'Foto no encontrada'], 404);
        }

        return response()->json($photo);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $photo = LovePhoto::where('couple_id', $couple->id)->find($id);

        if (!$photo) {
            return response()->json(['message' => 'Foto no encontrada'], 404);
        }

        if (Storage::disk('public')->exists($photo->image_path)) {
            Storage::disk('public')->delete($photo->image_path);
        }

        $photo->delete();

        return response()->json(['message' => 'Foto eliminada con éxito']);
    }

    // --- ÁLBUMES PERSONALIZADOS ---
    public function getAlbums()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $albums = LoveAlbum::where('couple_id', $couple->id)
            ->withCount('photos')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($albums);
    }

    public function createAlbum(Request $request)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $album = LoveAlbum::create([
            'couple_id' => $couple->id,
            'name' => $request->name,
            'cover_image' => null // Placeholder
        ]);

        return response()->json(['message' => 'Álbum creado', 'album' => $album], 201);
    }
}

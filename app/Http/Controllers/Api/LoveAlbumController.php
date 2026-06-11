<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Couple;
use App\Models\LovePhoto;
use App\Models\LoveAlbum;
use App\Models\LovePhotoReaction;
use App\Models\CoupleMilestone;
use App\Models\Question;
use App\Models\QuestionAnswer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\FcmService;

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

        // Return couple info plus partner's mood
        $partnerId = ($couple->user1_id == $user->id) ? $couple->user2_id : $couple->user1_id;
        $partner = \App\Models\User::find($partnerId);

        return response()->json([
            'couple' => $couple,
            'current_streak' => $couple->current_streak,
            'my_mood' => $user->current_mood,
            'partner_mood' => $partner ? $partner->current_mood : null,
            'partner_name' => $partner ? $partner->name : null
        ]);
    }

    public function updateCoupleInfo(Request $request)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        if ($request->has('relationship_start_date')) {
            $couple->relationship_start_date = $request->relationship_start_date;
            $couple->save();
        }

        if ($request->has('current_mood')) {
            $user->current_mood = $request->current_mood;
            $user->save();
            
            // Notify partner
            $partnerId = ($couple->user1_id == $user->id) ? $couple->user2_id : $couple->user1_id;
            $partner = \App\Models\User::find($partnerId);
            if ($partner && $partner->fcm_token) {
                $fcm = new FcmService();
                $fcm->sendToToken(
                    $partner->fcm_token,
                    "Cambio de humor 🎭",
                    "{$user->name} se siente ahora: {$request->current_mood}."
                );
            }
        }

        return response()->json(['message' => 'Información actualizada con éxito']);
    }

    public function poke()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $couple->last_poke_at = now();
        $couple->poke_count = $couple->poke_count + 1;
        $couple->save();

        // Notify partner
        $partnerId = ($couple->user1_id == $user->id) ? $couple->user2_id : $couple->user1_id;
        $partner = \App\Models\User::find($partnerId);
        if ($partner && $partner->fcm_token) {
            $fcm = new FcmService();
            $messages = [
                "{$user->name} te echa de menos 🥰",
                "{$user->name} está pensando en ti 💭",
                "¡Alguien reclama tu atención! 👀",
                "{$user->name} te manda un abracito virtual 🤗",
                "¡Ring ring! {$user->name} te llama 📞"
            ];
            $randomMessage = $messages[array_rand($messages)];
            $fcm->sendToToken(
                $partner->fcm_token,
                "¡Zumbido de {$user->name}! 🐝",
                $randomMessage
            );
        }

        return response()->json(['message' => 'Zumbido enviado', 'poke_count' => $couple->poke_count]);
    }

    public function assignPhotosToAlbum(Request $request, $albumId)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $request->validate([
            'photo_ids' => 'required|array',
            'photo_ids.*' => 'integer'
        ]);

        // Verificamos que el álbum pertenezca a la pareja
        $album = LoveAlbum::where('id', $albumId)->where('couple_id', $couple->id)->first();
        if (!$album) {
            return response()->json(['message' => 'Álbum no encontrado o no pertenece a tu pareja.'], 404);
        }

        $photosToCopy = LovePhoto::whereIn('id', $request->photo_ids)
            ->where('couple_id', $couple->id)
            ->get();

        foreach ($photosToCopy as $photo) {
            LovePhoto::create([
                'couple_id' => $photo->couple_id,
                'user_id' => $photo->user_id,
                'album_id' => $albumId,
                'image_path' => $photo->image_path,
                'description' => $photo->description,
                'fecha_recuerdo' => $photo->fecha_recuerdo,
                'created_at' => $photo->created_at,
                'updated_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Fotos copiadas al álbum con éxito']);
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $query = LovePhoto::where('couple_id', $couple->id)
            ->with(['user:id,name,email', 'reactions.user:id,name']);

        if ($request->has('album_id')) {
            $query->where('album_id', $request->album_id);
        } else {
            $query->whereNull('album_id');
        }

        $photos = $query->orderBy('fecha_recuerdo', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

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
            'fecha_recuerdo' => 'nullable|date',
            'album_id' => 'nullable|exists:love_albums,id'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = uniqid() . '.jpg';
            $imagePath = 'love_album/' . $filename;
            
            // Optimizar imagen
            $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
            $image = $manager->read($file);
            // Redimensionar si es muy grande, manteniendo proporciones
            $image->scaleDown(width: 1920, height: 1920);
            
            // Guardar imagen comprimida
            \Illuminate\Support\Facades\Storage::disk('public')->put($imagePath, $image->toJpeg(90)->toString());

            // --- Calcular racha ---
            $localDateStr = $request->input('local_date');
            if ($localDateStr) {
                $today = \Carbon\Carbon::parse($localDateStr)->startOfDay();
            } else {
                $today = \Carbon\Carbon::now()->startOfDay();
            }
            
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
            $couple->last_photo_date = $localDateStr ? $today->format('Y-m-d H:i:s') : now();
            $couple->save();

            $photo = LovePhoto::create([
                'couple_id' => $couple->id,
                'user_id' => $user->id,
                'album_id' => $request->album_id,
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

    public function download($id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);

        if (!$couple) {
            return response()->json(['message' => 'No estás vinculado a ninguna pareja.'], 403);
        }

        $photo = LovePhoto::where('couple_id', $couple->id)->findOrFail($id);
        $path = storage_path('app/public/' . $photo->image_path);

        if (!file_exists($path)) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        return response()->download($path, 'love_photo_' . $photo->id . '.jpg');
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

    public function updateAlbumCover(Request $request, $id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);
        if (!$couple) return response()->json([], 403);

        $album = LoveAlbum::where('couple_id', $couple->id)->find($id);
        if (!$album) return response()->json([], 404);

        $request->validate(['image' => 'required|string']);

        $imageParts = explode(";base64,", $request->image);
        if (count($imageParts) >= 2) {
            $imageBase64 = base64_decode($imageParts[1]);
            $fileName = uniqid() . '.png';
            $path = 'love_album/covers/' . $fileName;
            Storage::disk('public')->put($path, $imageBase64);

            $album->cover_image = $path;
            $album->save();
        }

        return response()->json(['message' => 'Portada actualizada', 'album' => $album]);
    }

    // --- HITOS IMPORTANTES (MILESTONES) ---
    public function getMilestones()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);
        if (!$couple) return response()->json([], 403);

        $milestones = CoupleMilestone::where('couple_id', $couple->id)->orderBy('date', 'desc')->get();
        return response()->json($milestones);
    }

    public function addMilestone(Request $request)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);
        if (!$couple) return response()->json([], 403);

        $request->validate([
            'title' => 'required|string|max:100',
            'date' => 'required|date'
        ]);

        $milestone = CoupleMilestone::create([
            'couple_id' => $couple->id,
            'title' => $request->title,
            'date' => $request->date
        ]);

        return response()->json($milestone, 201);
    }

    public function deleteMilestone($id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);
        if (!$couple) return response()->json([], 403);

        $milestone = CoupleMilestone::where('couple_id', $couple->id)->find($id);
        if ($milestone) {
            $milestone->delete();
        }

        return response()->json(['message' => 'Hito eliminado']);
    }

    // --- MINIJUEGO DE PREGUNTAS ---
    public function getQuestions()
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);
        if (!$couple) return response()->json([], 403);

        // Fetch all questions and check if answered
        $questions = Question::all();
        $answers = QuestionAnswer::where('couple_id', $couple->id)->get();

        $result = [];
        $partnerId = ($couple->user1_id == $user->id) ? $couple->user2_id : $couple->user1_id;

        foreach ($questions as $q) {
            $myAnswer = $answers->where('question_id', $q->id)->where('user_id', $user->id)->first();
            $partnerAnswer = $answers->where('question_id', $q->id)->where('user_id', $partnerId)->first();

            $status = 'unanswered';
            if ($myAnswer && !$partnerAnswer) $status = 'waiting_partner';
            if (!$myAnswer && $partnerAnswer) $status = 'waiting_you';
            if ($myAnswer && $partnerAnswer) $status = 'answered';

            $result[] = [
                'id' => $q->id,
                'category' => $q->category,
                'question_text' => $q->question_text,
                'status' => $status,
                'my_answer' => $myAnswer ? $myAnswer->answer : null,
                'partner_answer' => ($status === 'answered') ? $partnerAnswer->answer : null, // Hidden until both answer
            ];
        }

        return response()->json($result);
    }

    public function answerQuestion(Request $request, $id)
    {
        $user = Auth::user();
        $couple = $this->getCoupleForUser($user->id);
        if (!$couple) return response()->json([], 403);

        $request->validate(['answer' => 'required|string']);

        $answer = QuestionAnswer::updateOrCreate(
            ['couple_id' => $couple->id, 'user_id' => $user->id, 'question_id' => $id],
            ['answer' => $request->answer]
        );

        // Notify partner that I answered
        $partnerId = ($couple->user1_id == $user->id) ? $couple->user2_id : $couple->user1_id;
        $partner = \App\Models\User::find($partnerId);
        if ($partner && $partner->fcm_token) {
            $fcm = new FcmService();
            $fcm->sendToToken(
                $partner->fcm_token,
                "¡Nueva respuesta! 👀",
                "{$user->name} ha respondido una pregunta. ¡Te toca a ti!"
            );
        }

        return response()->json(['message' => 'Respuesta guardada']);
    }

    public function saveFcmToken(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            $user->fcm_token = $request->input('token');
            $user->save();
        }
        return response()->json(['success' => true]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\SwipeQuestion;
use App\Models\DrawingPrompt;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $swipeQuestions = [
            ['category' => 'Comida', 'question_text' => '¿Te gusta la pizza con piña?'],
            ['category' => 'Futuro', 'question_text' => '¿Tendrías una mascota exótica en casa?'],
            ['category' => 'Costumbres', 'question_text' => '¿Prefieres dormir con calcetines en invierno?'],
            ['category' => 'Relación', 'question_text' => '¿Perdonarías una infidelidad?'],
            ['category' => 'Futuro', 'question_text' => '¿Te gustaría vivir en el campo alejado de la ciudad?'],
            ['category' => 'Relación', 'question_text' => '¿Deberíamos compartir contraseñas del móvil?'],
            ['category' => 'Viajes', 'question_text' => '¿Prefieres un viaje de mochilero a un resort todo incluido?'],
            ['category' => 'Viajes', 'question_text' => '¿Te mudarías a otro país por amor?'],
            ['category' => 'Viajes', 'question_text' => '¿Te gustaría hacer un viaje en autocaravana?'],
            ['category' => 'Convivencia', 'question_text' => '¿Dejarías que yo decore toda la casa?'],
            ['category' => 'Convivencia', 'question_text' => '¿Te molesta que deje los zapatos por en medio?'],
        ];

        foreach ($swipeQuestions as $sq) {
            SwipeQuestion::updateOrCreate(
                ['question_text' => $sq['question_text']],
                ['category' => $sq['category']]
            );
        }

        $drawingPrompts = [
            ['prompt_text' => 'Dibuja un perro en un árbol'],
            ['prompt_text' => 'Dibuja a tu pareja como si fuera un superhéroe'],
            ['prompt_text' => 'Nuestro primer beso (versión monigotes)'],
            ['prompt_text' => 'A ti intentando cocinar'],
            ['prompt_text' => 'Un gato conduciendo un coche'],
        ];

        foreach ($drawingPrompts as $dp) {
            DrawingPrompt::updateOrCreate(
                ['prompt_text' => $dp['prompt_text']],
                []
            );
        }
    }
}

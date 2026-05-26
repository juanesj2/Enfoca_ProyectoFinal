<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameSeeder extends Seeder
{
    public function run()
    {
        // Limpiar para evitar duplicados si se corre varias veces
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('swipe_questions')->truncate();
        DB::table('drawing_prompts')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Insertar Swipe Questions
        DB::table('swipe_questions')->insert([
            ['question_text' => '¿Te gusta la pizza con piña?', 'created_at' => now(), 'updated_at' => now()],
            ['question_text' => '¿Tendrías una mascota exótica en casa?', 'created_at' => now(), 'updated_at' => now()],
            ['question_text' => '¿Prefieres dormir con calcetines en invierno?', 'created_at' => now(), 'updated_at' => now()],
            ['question_text' => '¿Perdonarías una infidelidad?', 'created_at' => now(), 'updated_at' => now()],
            ['question_text' => '¿Te gustaría vivir en el campo alejado de la ciudad?', 'created_at' => now(), 'updated_at' => now()],
            ['question_text' => '¿Deberíamos compartir contraseñas del móvil?', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Insertar Drawing Prompts
        DB::table('drawing_prompts')->insert([
            ['prompt_text' => 'Un perro atrapado en un árbol', 'created_at' => now(), 'updated_at' => now()],
            ['prompt_text' => 'Nuestro primer beso (versión monigotes)', 'created_at' => now(), 'updated_at' => now()],
            ['prompt_text' => 'A ti intentando cocinar', 'created_at' => now(), 'updated_at' => now()],
            ['prompt_text' => 'Un gato conduciendo un coche', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

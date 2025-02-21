<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fotografia_id')->constrained('fotografias')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->text('contenido');
            $table->timestamp('fecha')->default(now());
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('comentarios');
    }
};

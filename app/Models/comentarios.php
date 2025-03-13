<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentarios extends Model
{
    // Desactivar las marcas de tiempo que usa laravel para que no intente crear
    // las columnas created_at y updated_at en la base de datos
    public $timestamps = false;

    protected $table = 'comentarios';

    protected $fillable = ['fotografia_id', 'usuario_id', 'contenido'];

    public function fotografia()
    {
        return $this->belongsTo(Fotografia::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public static function crearComentario($data)
    {
        return self::create([
            'fotografia_id' => $data['fotografia_id'],
            'usuario_id' => $data['usuario_id'],
            'contenido' => $data['comentario'],
        ]);
    }

}
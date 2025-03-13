<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
    // Desactivar las marcas de tiempo que usa laravel para que no intente crear
    // las columnas created_at y updated_at en la base de datos
    public $timestamps = false;
    
    // Aqui definimos la tabla que queremos usar
    protected $table = 'likes';

    // Con esto definimos que campos vamos a querer usar
    // Al igual que en la variable $table aqui tampoco podemos cambiar el nombre de la variable
    // porque Laravel la usa para saber que teiene que cambiar
    protected $fillable = ['usuario_id', 'fotografia_id'];

    // Relación con el modelo Fotografia
    public function fotografia()
    {
        return $this->belongsTo(Fotografia::class, 'fotografia_id');
    }

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

}
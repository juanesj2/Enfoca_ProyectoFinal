<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fotografia extends Model
{
    protected $table = 'fotografias';

    public function user()
    {
        //Con esto estamos haciendo una relacion hacia el modelo User mediante la columna usuario_id
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function likes()
    {
        //Con esto estamos haciendo una relacion hacia el modelo Likes mediante la columna fotografia_id
        return $this->hasMany(Likes::class, 'fotografia_id');
    }

    // Método para contar los likes
    public function likesCount()
    {
        return $this->likes()->count();
    }

    public function comentarios()
    {
        //Con esto estamos haciendo una relacion hacia el modelo comentarios mediante la columna fotografia_id
        return $this->hasMany(Comentarios::class, 'fotografia_id');
    }

    // Método para contar los comentarios
    public function comentariosCount()
    {
        return $this->comentarios()->count();
    }
}
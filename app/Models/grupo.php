<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Grupo extends Model
{
    // Hacemos referencia a la tabla desafios de la base de datos
    protected $table = 'grupo';

    //**************************************************************/
    //**************************************************************/
    //               Relaciones con la base de datos
    //**************************************************************/
    //**************************************************************/

    // Esta es una relacion con el modelo de User
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'grupo_usuarios', 'grupo_id', 'usuario_id')
                    ->withTimestamps()
                    ->withPivot('rol');
    }
}

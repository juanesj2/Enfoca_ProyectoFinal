<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    use HasFactory;

    protected $table = 'grupo';

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'grupo_usuarios', 'grupo_id', 'usuario_id')
                    ->withTimestamps()
                    ->withPivot('rol');
    }
}

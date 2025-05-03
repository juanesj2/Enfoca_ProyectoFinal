<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desafio extends Model
{
    use HasFactory;

    protected $table = 'desafios';

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'desafio_usuario', 'desafio_id', 'usuario_id')
                    ->withTimestamps()
                    ->withPivot('conseguido_en');
    }

}

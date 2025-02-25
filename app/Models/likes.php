<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
    public $timestamps = false;

    use HasFactory;
    
    protected $table = 'likes';

    protected $fillable = ['usuario_id', 'fotografia_id'];

    public function fotografia()
    {
        return $this->belongsTo(Fotografia::class, 'fotografia_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
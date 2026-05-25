<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoupleMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'couple_id',
        'user_id',
        'love_photo_id',
        'mensaje'
    ];

    public function couple()
    {
        return $this->belongsTo(Couple::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photo()
    {
        return $this->belongsTo(LovePhoto::class, 'love_photo_id');
    }
}

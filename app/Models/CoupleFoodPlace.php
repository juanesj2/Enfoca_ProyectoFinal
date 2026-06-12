<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoupleFoodPlace extends Model
{
    protected $fillable = [
        'couple_id', 'name', 'location', 'rating', 'image_url', 'description'
    ];

    public function dishes()
    {
        return $this->hasMany(CoupleFoodDish::class, 'food_place_id');
    }}

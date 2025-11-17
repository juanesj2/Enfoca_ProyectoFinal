<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use App\Models\Desafio;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'vetado_hasta' => 'datetime',
        ];
    }

    // Relaciones
    public function fotografias() {
        return $this->hasMany(Fotografia::class, 'usuario_id');
    }

    public function desafios()
    {
        return $this->belongsToMany(Desafio::class, 'desafio_usuario', 'usuario_id', 'desafio_id')
                    ->withTimestamps()
                    ->withPivot('conseguido_en');
    }

    /* Esta funcion se encarga de dar el logro de Coleccionista */
    public function verificarColeccionista()
    {
        $coleccionista = Desafio::where('titulo', 'Coleccionista')->first();

        if ($this->desafios()->count() >= 5 && $coleccionista && !$this->desafios->contains($coleccionista->id)) {
            $this->desafios()->attach($coleccionista->id, ['conseguido_en' => now()]);
        }
    }

    /* Comprobamos si el usaurio tiene ya el desafio */
    public function hasDesafio($desafioId)
    {
        return $this->desafios->contains('id', $desafioId);
    }

    /**
     * Verifica si el usuario está vetado actualmente
     */
    public function estaVetado(): bool
    {
        return $this->vetado_hasta && now()->lt($this->vetado_hasta);
    }

    /**
     * Devuelve cuánto tiempo le queda de veto, o null si no está vetado
     */
    public function tiempoRestanteVeto(): ?string // Esto indica que puede devolver un string o null
    {
        if ($this->estaVetado()) {
            return now()->diffForHumans($this->vetado_hasta, [ // La funcion diffForHumans() devuelve un texto con el tiempo restante es una funcion de Carbon
                'parts' => 2, // Para mostrar solo días y horas
                'syntax' => Carbon::DIFF_RELATIVE_TO_NOW,
                'short' => true
            ]);
        }
        return null;
    }
}

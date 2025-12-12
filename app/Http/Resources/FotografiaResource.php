<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FotografiaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'descripcion' => $this->descripcion,
            'direccion_imagen' => $this->direccion_imagen,
            'usuario_id' => $this->usuario_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'likes_count' => $this->likesCount(),
            'comentarios_count' => $this->comentariosCount(),
            'url' => str_starts_with($this->direccion_imagen, 'http') ? $this->direccion_imagen : url($this->direccion_imagen),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

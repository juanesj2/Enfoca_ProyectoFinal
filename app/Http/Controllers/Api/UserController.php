<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Admin check should ideally be in middleware, but double check here or just return all
        if ($request->user()->rol !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the authenticated user.
     */
    public function show(Request $request)
    {
        $user = clone $request->user();
        $user->verificarTodosLosDesafios();
        return new UserResource($user);
    }

    /**
     * Update the authenticated user.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|confirmed|min:8',
        ]);

        $data = $request->only(['name', 'email']);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Update user details by Admin (Role, Veto).
     */
    public function updateAdmin(Request $request, string $id)
    {
        if ($request->user()->rol !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $user = User::findOrFail($id);

        $request->validate([
             'rol' => 'sometimes|in:usuario,admin',
             'vetado' => 'sometimes|boolean',
        ]);

        if ($request->has('rol')) {
            $user->rol = $request->rol;
        }

        if ($request->has('vetado')) {
            if ($request->vetado) {
                // Si lo vetan desde el panel admin, pongámosle 100 años (o lo que se defina)
                $user->vetado_hasta = now()->addYears(100);
            } else {
                // Si le quitan el veto
                $user->vetado_hasta = null;
            }
        }

        $user->save();

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if ($request->user()->rol !== 'admin') {
           return response()->json(['error' => 'No autorizado'], 403);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    /**
     * Search users by name.
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:1',
        ]);

        $query = $request->input('query');

        $users = User::where('name', 'like', "%{$query}%")
            ->limit(5)
            ->get();

        return UserResource::collection($users);
    }
}

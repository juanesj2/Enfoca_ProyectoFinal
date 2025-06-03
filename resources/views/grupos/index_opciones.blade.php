@extends('master')

@section('contenido')

<!-- Mensajes de éxito o error -->
@if($message = Session::get('success'))
    <div class="alert alert-success">{{ $message }}</div>
@endif

@if($message = Session::get('error'))
    <div class="alert alert-danger">{{ $message }}</div>
@endif

<div class="container py-4">
    <h1 class="mb-5 text-center">Grupos</h1>
</div>

@endsection

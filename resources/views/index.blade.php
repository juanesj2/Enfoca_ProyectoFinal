@extends('master')

@section('contenido')
<!-- iniciamos SECCIÓN contenido -->

@if($message = Session::get('success'))
    <div class="alert alert-success">
        {{ $message }}
    </div>
@endif

@if($message = Session::get('error'))
    <div class="alert alert-danger">
        {{ $message }}
    </div>
@endif

<div class="card">
    <div class="card-header">
        <div class="row">
            <div class="col col-md-6"><b>Datos de Fotografías</b></div>
            <div class="col col-md-6">
                <form action="{{ route('logout') }}" method="POST" style="display: inline;">
                    @csrf
                    <button type="submit" class="btn btn-danger btn-sm float-end">Logout</button>
                </form>
                <a href="{{ route('fotografias.create') }}" class="btn btn-success btn-sm float-end">Añadir</a>
            </div>
        </div>
    </div>
    <div class="card-body" style="text-align: center">
        <table id="latabla" style="margin: 0 auto; width:80%" class="table table-bordered">
            <tr>
                <th style="text-align:center">Imagen</th>
                <th>Dirección de Imagen</th>
                <th>ID de Estudiante</th>
                <th style="text-align:center">Acción</th>
            </tr>
            @if(count($fotografias) > 0)
                @foreach($fotografias as $fotografia)
                    <tr>
                        <td class="align-middle">
                            <img id="laimagen" style="border-radius:6px;" src="{{ asset('images/' . $fotografia->direccion_imagen) }}" width="75" />
                        </td>
                        <td class="align-middle">{{ $fotografia->direccion_imagen }}</td>
                        <td class="align-middle">{{ $fotografia->student_id }}</td>
                        <td class="align-middle">
                            <form method="post" style="text-align: center;" action="{{ route('fotografias.destroy', $fotografia->id) }}">
                                @csrf
                                @method('DELETE')
                                <a id="b1" href="{{ route('fotografias.show', $fotografia->id) }}" style="width:70px;" class="btn btn-primary btn-sm">Ver</a>
                                <a id="b2" href="{{ route('fotografias.edit', $fotografia->id) }}" style="width:70px;" class="btn btn-warning btn-sm">Editar</a>
                                <input id="b3" type="submit" class="btn btn-danger btn-sm" style="width:70px;" value="Borrar" />
                            </form>
                        </td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="4" class="text-center">No se han encontrado datos</td>
                </tr>
            @endif
        </table><br>
        {!! $fotografias->links() !!}
    </div>
</div><br><br>

@endsection

@section('css')
<style>
@media (max-width: 767.98px)
{
    #latabla
    {
        width: 100%;
        border-collapse: separate;
        border-spacing: 5px;         
    }

    #latabla td, th
    {
        font-size:10px;
        border: 1px solid #dee2e6; 
        border-radius: 5px;        
    }

    #laimagen
    {
        width:40px;
    }
}
</style>
@endsection
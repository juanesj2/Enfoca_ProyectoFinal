@extends('master')

<!-- iniciamos SECCIÓN contenido -->
@section('contenido')
<!-- iniciamos SECCIÓN contenido -->

@if($errors->any())
    <div class="alert alert-danger">
    <ul>
    @foreach($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
    </div>
@endif

<div class="card">
    <div class="card-header">
        <div class="row">
            <div class="col col-md-6"><b>Subir una nueva Fotografia</b></div>
            <div class="col col-md-6">
                <a href="{{ route('fotografias.index') }}" class="btn btn-success btn-sm float-end">Cancelar</a>
            </div>
        </div>    
    </div>
    
    <div class="card-body">
        <form method="post" action="{{ route('fotografias.store') }}" enctype="multipart/form-data">
            @csrf
            @method('POST')

            <!-- Campos ocultos para el ID del usuario y su email -->
            <input type="hidden" id="user_id" name="user_id" value="{{ Auth::user()->id }}">

            <br>
            <div class="row mb-3">
                <label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
                    <b>Titulo:</b>
                </label>
                <div class="col-sm-4">
                    <input type="text" id="fotografia_titulo" name="fotografia_titulo" value="{{ old('fotografia_titulo') }}" class="form-control" />
                    @error('fotografia_titulo')
                    <small><li style="color:blue">{{ $message }}</li></small>
                    @enderror
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
                    <b>Descripcion:</b>
                </label>
                <div class="col-sm-5">
                    <input type="text" id="fotografia_descripcion" name="fotografia_descripcion" value="{{ old('fotografia_descripcion') }}" class="form-control" />
                    @error('fotografia_descripcion')
                    <small><li style="color:blue">{{ $message }}</li></small>
                    @enderror
                </div>
            </div>
            
            <div class="row mb-4">
                <label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
                    <b>Imagen:</b>
                </label>
                <div class="col-sm-5">
                    <input type="file" id="fotografia_image" class="btn btn-primary btn-sm" name="fotografia_image">
                    @error('fotografia_image')
                    <small><li style="color:blue">{{ $message }}</li></small>
                    @enderror                    
                </div>
            </div>

            <!-- areglo de foco -->

            @if ($errors->has('fotografia_titulo'))
                <script>
                document.getElementById("fotografia_titulo").select();
                </script>    
            @elseif ($errors->has('fotografia_descripcion'))
                <script>
                document.getElementById("fotografia_descripcion").select();
                </script>    
            @elseif ($errors->has('fotografia_image'))
                <script>
                document.getElementById("fotografia_image").select();
                </script>    
            @else
                <script>
                    document.getElementById("fotografia_titulo").select();
                </script>                
            @endif

            <div class="text-center">
                <button type="submit" class="btn btn-primary">Añadir</button>
            </div>    
        </form>
    </div>
</div>
<br><br>

<!-- fin SECCIÓN -->
@endsection
<!-- fin SECCIÓN -->
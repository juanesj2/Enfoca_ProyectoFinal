@extends('master')

<!-- iniciamos SECCIÓN contenido -->
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
			<div class="col col-md-6"><b>Datos de Estudiantes</b></div>
			<div class="col col-md-6">
				<form action="{{ route('logout') }}" method="POST" style="display: inline;">
					@csrf
					<button type="submit" class="btn btn-danger btn-sm float-end">Logout</button>
				</form>
				<a href="{{ route('students.create') }}" class="btn btn-success btn-sm float-end">Añadir</a>
			</div>
		</div>
	</div>
	<div class="card-body" style="text-align: center">
		<table id="latabla" style="margin: 0 auto; width:80%" class="table table-bordered">
			<tr>
				<th style="text-align:center">Imagen</th>
				<th>Nombre</th>
				<th>Email</th>
				<th style="text-align:right">Género</th>
				<th style="text-align:center">Acción</th>
			</tr>
			@if(count($data) > 0)
					@foreach($data as $row)
						<tr>
							<td class="align-middle"><img id="laimagen" style="border-radius:6px;" src="{{ asset('images/' . $row->student_image) }}" width="75" /></td>
							<td class="align-middle">{{ $row->student_name }}</td>
							<td class="align-middle">{{ $row->student_email }}</td>
							<td class="align-middle" style="text-align: right">{{ $row->student_gender }}</td>
							<td class="align-middle">
								<form method="post" style="text-align: center;" action="{{ route('students.destroy', $row->id) }}">
									@csrf
									@method('DELETE')
									<a id="b1" href="{{ route('students.show', $row->id) }}" style="width:70px;" class="btn btn-primary btn-sm">Ver</a>
									<a id="b2" href="{{ route('students.edit', $row->id) }}" style="width:70px;" class="btn btn-warning btn-sm">Editar</a>
									<input id="b3" type="submit" class="btn btn-danger btn-sm" style="width:70px;" value="Borrar" />
								</form>
							</td>
						</tr>
					@endforeach
			@else
						<tr>
							<td colspan="5" class="text-center">No se han encontado datos</td>
						</tr>
			@endif
		</table><br>
		{!! $data->links() !!}
	</div>
</div><br><br>

<!-- fin SECCIÓN -->
@endsection
<!-- fin SECCIÓN -->

<!-- iniciamos SECCIÓN css -->
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
<!-- fin SECCIÓN -->
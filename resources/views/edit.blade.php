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
			<div class="col col-md-6"><b>Modificación de Estudiante:</b></div>
			<div class="col col-md-6">
				<a href="{{ route('students.index') }}" class="btn btn-success btn-sm float-end">Volver</a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<form method="put" action="{{ route('students.update', $estudiante->id) }}" enctype="multipart/form-data">
			@csrf
			@method('PUT')
			<br>
			<div class="row mb-3">
					<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
					<b>Nombre:</b>
					</label>
					<div class="col-sm-3">
						<input type="text" id="nombre" name="student_name" class="form-control" value="{{ $estudiante->student_name }}" />
					</div>
			</div>
			
			<div class="row mb-3">
					<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
					<b>Email:</b>
					</label>
					<div class="col-sm-4">
						<input type="text" name="student_email" class="form-control" value="{{ $estudiante->student_email }}" />
					</div>
			</div>
			
			<div class="row mb-4">
					<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
					<b>Género:</b>
					</label>
					<div class="col-sm-2">
						<select name="student_gender" class="form-control">
							<option value="Masculino">Masculino</option>
							<option value="Femenino">Femenino</option>
						</select>
					</div>
			</div>
			
			<div class="row mb-3">
					<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
					<b>Imagen:</b>
					</label>
					<div class="col-sm-10">
						<img style="border-radius:6px;" src="{{ asset('images/' . $estudiante->student_image) }}" width="100" class="img-thumbnail" />
						<br/>
						<input class="btn btn-primary btn-sm" type="file" name="student_image" />
						<!-- este input no se visualiza (nombre imagen)-->
						<input type="hidden" name="hidden_student_image" value="{{ $estudiante->student_image }}" />
					</div>
			</div>
			
			<div class="text-center">
				<!-- este input no se visualiza (id estudiante)-->
				<input type="hidden" name="hidden_id" value="{{ $estudiante->id }}" />
				<input type="submit" class="btn btn-primary" value="Modificar" />
			</div>	
		</form>
	</div>
</div>

<script>
	document.getElementsByName('student_gender')[0].value = "{{ $estudiante->student_gender }}";
	document.getElementById("nombre").select()
</script>

<!-- fin SECCIÓN -->
@endsection
<!-- fin SECCIÓN -->

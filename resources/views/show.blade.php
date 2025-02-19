@extends('master')

<!-- iniciamos SECCIÓN contenido -->
@section('contenido')
<!-- iniciamos SECCIÓN contenido -->

<div class="card">
	<div class="card-header">
		<div class="row">
			<div class="col col-md-6"><b>Consulta de Estudiante:</b></div>
			<div class="col col-md-6">
				<a href="{{ route('students.index') }}" class="btn btn-success btn-sm float-end">Volver</a>
			</div>
		</div>
	</div>
	<div class="card-body">
			<div class="row mb-3">
				<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
				<b>Nombre:</b>
				</label>
				<div class="col-12 col-sm-10">
					{{ $estudiante->student_name ." (".$estudiante->id.")" }}
				</div>
			</div>
		
			<div class="row mb-3">
				<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
				<b>Email:</b>
				</label>
				<div class="col-sm-10">
					{{ $estudiante->student_email }}
				</div>
			</div>

			<div class="row mb-4">
				<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
				<b>Género:</b>
				</label>
				<div class="col-sm-10">
					{{ $estudiante->student_gender }}
				</div>
			</div>

			<div class="row mb-4">
				<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
				<b>Imagen:</b>
				</label>
				<div class="col-sm-10">
					<img style="border-radius:6px;" src="{{ asset('images/' .  $estudiante->student_image) }}" width="100" class="img-thumbnail" />
				</div>
			</div>
	</div>
</div>

<!-- fin SECCIÓN -->
@endsection
<!-- fin SECCIÓN -->

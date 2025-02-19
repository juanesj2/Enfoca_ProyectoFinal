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
			<div class="col col-md-6"><b>Añadir Estudiante</b></div>
			<div class="col col-md-6">
				<!-- <a href="/students" class="btn btn-success btn-sm float-end">Cancelar</a> -->
				<a href="{{ route('students.index') }}" class="btn btn-success btn-sm float-end">Cancelar</a>
			</div>
		</div>	
	</div>
	
	<div class="card-body">
		<form method="post" action="{{ route('students.store') }}" enctype="multipart/form-data">
			@csrf
			@method('POST')
				<br>
				<div class="row mb-3">
						<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
						<b>Nombre:</b>
						</label>
						<div class="col-sm-4">
							<input  type="text" id="student_name" name="student_name" value="{{ old('student_name') }}" 
							 class="form-control" />
							 @error('student_name')
							 <small><li style="color:blue">{{ $message }}</li></small>
							 @enderror
						</div>
				</div>

				<div class="row mb-3">
						<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
						<b>Email:</b>
						</label>
						<div class="col-sm-5">
							<input type="text" id="student_email" name="student_email" value="{{ old('student_email') }}"
							class="form-control" />
							@error('student_email')
							<small><li style="color:blue">{{ $message }}</li></small>
							@enderror
						</div>
				</div>

				<div class="row mb-4">
					<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
						<b>Género:</b>
						</label>
						<div class="col-sm-4">
							<select name="student_gender" class="form-control">
								<option value="Masculino" {{old('student_gender')=='Masculino'? 'selected':''}}>Masculino</option>
								<option value="Femenino" {{old('student_gender')=='Femenino'? 'selected':''}}>Femenino</option>
							</select>
						</div>
				</div>
			
				<div class="row mb-4">
						<label class="col-12 col-sm-2 col-label-form d-flex justify-content-sm-end justify-content-start align-items-end pe-1">
						<b>Imagen:</b>
						</label>
						<div class="col-sm-5">
							<input type="file" id="student_image" class="btn btn-primary btn-sm" name="student_image" }}"/>
							@error('student_image')
							<small><li style="color:blue">{{ $message }}</li></small>
							@enderror					
						</div>
				</div>

			<!-- areglo de foco -->

			@if ($errors->has('student_name'))
				<script>
				document.getElementById("student_name").select();
				</script>	
			@elseif ($errors->has('student_email'))
				<script>
				document.getElementById("student_email").select();
				</script>	
			@elseif ($errors->has('student_image'))
				<script>
				document.getElementById("student_image").select();
				</script>	
			@else
				<script>
					document.getElementById("student_name").select();
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

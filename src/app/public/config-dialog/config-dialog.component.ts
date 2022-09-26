import { Component, OnInit } from "@angular/core";
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ProviderService } from "src/app/services/provider/provider.service";
import { LowerDashPipe } from "src/app/pipes/lower-dash.pipe";
import { JwtAuthService } from "src/app/services/auth/jwt-auth.service";
import { LocalStoreService } from "src/app/services/local-store.service";

@Component({
	selector: "app-config-dialog",
	templateUrl: "./config-dialog.component.html",
	styleUrls: ["./config-dialog.component.scss"],
})
export class ConfigDialogComponent implements OnInit {
	/*   firstFormGroup = this._formBuilder.group({
   //  firstCtrl: ['', Validators.required],
   nombreEscuela: ['', Validators.required],
   carreras: this._formBuilder.array([]),
   programas: this._formBuilder.array([]),
  });

   secondFormGroup = this._formBuilder.group({
    //  secondCtrl: ['', Validators.required],
   }); */

	Formulario: FormGroup = this.fb.group({
		// nivel: ['', Validators.required],
		carreras: new FormArray([], Validators.required),
		// programa_academico: new FormArray([], Validators.required)
	});
	formControls: string[] = [];

	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	nAcademicos: any;
	periodos: any;
   checked = false;
	aa = {
		"carreras": [
			 {
				  "id": "",
				  "nivel": 1,
				  "descripcion_carrera": "asd",
				  "descripcion_programa": "asd",
				  "tipo_periodo": 1
			 },
			 {
				  "id": "",
				  "nivel": 2,
				  "descripcion_carrera": "sdf",
				  "descripcion_programa": "sdf",
				  "tipo_periodo": 2
			 },
			 {
				  "id": "",
				  "nivel": 3,
				  "descripcion_carrera": "dfg",
				  "descripcion_programa": "dfg",
				  "tipo_periodo": 3
			 },
			 {
				  "id": "",
				  "nivel": 1,
				  "descripcion_carrera": "fgh",
				  "descripcion_programa": "fgh",
				  "tipo_periodo": 4
			 },
			 {
				  "id": "",
				  "nivel": 3,
				  "descripcion_carrera": "ghj",
				  "descripcion_programa": "ghj",
				  "tipo_periodo": 5
			 }
		]
  }

	constructor(
		private fb: FormBuilder,
		private provider: ProviderService,
		private jwtAuth: JwtAuthService,
		public lowerDash: LowerDashPipe,
      public ls: LocalStoreService
	) {
		this.getInfo();
		this.AgregarCarrera();
      this.checked = this.ls.getItem('openDialog');
      console.log(this.checked);


	}

   get f(){return this.Formulario.controls; }
   get c(){return this.f['carreras'] as FormArray}
   get form(){return this.Formulario.value.carreras; }


	ngOnInit(): void {
		console.log(this.f);
		console.log(this.c);


	}

   AgregarCarrera(){
      const FormularioCarrera = this.fb.group({
            id: [''],
				nivel: ['', Validators.required],
            descripcion_carrera: ['', Validators.required],
				descripcion_programa: ['', Validators.required],
				tipo_periodo: ['', Validators.required]
      });
      this.c.push(FormularioCarrera);
		console.log(this.c.controls);
   }

   EliminarCarrera(i: any){
      this.c.removeAt(i);
   }

	holi(){
		this.Formulario.value.carreras.sort((a: any, b: any) => (a.nivel - b.nivel));
		console.log(this.Formulario.value);
	}

	send(){
		this.form.forEach((element: any) => {
			const carreraForm = {
				descripcion: element.descripcion_carrera,
				tbl_nivel_id: {
					id: element.nivel
				},
				usuario_a:
				{
					id: this.jwtAuth.userId
				}
			}

		console.log(carreraForm);
/* 		@$tbl_carrera_id = $request->tbl_carrera_id->id;
            @$descripcion = $request->descripcion;


            @$tbl_tipo_periodo_id = $request->tbl_tipo_periodo_id->id;
            @$tbl_nivel_id = $request->tbl_carrera_id->tbl_nivel_id; */

		this.provider.BD_ActionPost('carrera', 'create', carreraForm).subscribe({
			next: (data: any) => {
				console.log(data);
				const programasForm = {
					tbl_carrera_id: {
						id: data.id,
						tbl_nivel_id: element.nivel
					},
					descripcion: element.descripcion_programa,
					tbl_tipo_periodo_id: {
						id: element.tipo_periodo
					}
				}
				this.provider.BD_ActionPost('programa_academico', 'create', programasForm).subscribe({
					next: (data: any) => {
						console.log(data);
					}, error: (error: any) => {
						console.log(error);
					}
				})
			}, error: (error: any) => {
				console.log(error);
			}
		})

		});

	}

	/* AgregarPrograma(control: any){
		const FormularioPrograma = this.fb.group({
			descripcion: ['', Validators.required],
			tipo_periodo: ['', Validators.required]
		})
		control.push(FormularioPrograma)
	} */


	/* add(event: MatChipInputEvent, array: any, id: string): void {
      const value = event.value;
      if ((value || '').trim()) {
         array.push(this._formBuilder.control(value));
      }
      array.value.forEach((element: any) => {
         this.firstFormGroup.addControl(id + this.lowerDash.transform(element), new FormControl('', Validators.required))
       });
      event.chipInput!.clear();
   }

   remove(fruit: string, array: FormArray, id: string): void {
      const index = array.value.indexOf(fruit);
      if (index >= 0) {
         array.removeAt(index);
      }
      this.firstFormGroup.removeControl(id + this.lowerDash.transform(fruit))
   } */

   /*
	get carrerasB(): FormArray {
		return this.basicDataForm.controls["carreras"] as FormArray;
	}
   */

	/* get carreras(): FormArray {
      return this.firstFormGroup.controls['carreras'] as FormArray
   }

   get programas(): FormArray {
      return this.firstFormGroup.controls['programas'] as FormArray
   } */

   blockDialog(checked: boolean){
      console.log(checked);

      this.ls.setItem('openDialog', checked);
   }

	getInfo() {
		this.provider.BD_ActionPost("nivel", "index").subscribe({
			next: (data: any) => {
				console.log(data);
				this.nAcademicos = data.data;
			},
			error: (error: any) => {
				console.log(error);
			},
		});
		this.provider.BD_ActionPost("tipo_periodo", "index").subscribe({
			next: (data: any) => {
				console.log(data);
				this.periodos = data.data;
			},
			error: (error: any) => {
				console.log(error);
			},
		});
	}
}

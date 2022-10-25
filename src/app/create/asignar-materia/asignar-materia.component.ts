import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asignar-materia',
  templateUrl: './asignar-materia.component.html',
  styleUrls: ['./asignar-materia.component.scss']
})
export class AsignarMateriaComponent implements OnInit {
   materia: any;
   formulario: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder
  ) {
     this.materia = data;
     this.formulario = this.fb.group({
        
     })
  }

  ngOnInit(): void {
  }

}

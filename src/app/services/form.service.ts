import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
   providedIn: 'root'
})
export class FormService {

   constructor(
      private snackbar: MatSnackBar
   ) { }

   patchForm(data: any, form: any, check?: any) {
      if (check) {
         check.forEach((el: any) => {
            data[el] = data[el] == 1 ? true : false
         });
      }
      Object.keys(form?.controls).forEach(element => {
         form.patchValue({
            [element]: data[element]
         })
      });
   }

   filterSelect(ev: any, control: any, form: any, sel: any, grup: any, filter?: any) {
      let filtered = []

      form.controls[control].setValue(ev)

      if (!filter)
      filtered[filter] = sel[filter]
      else
      filtered[filter] = sel[filter]?.filter((option: any) => option['padre_id'] === ev.toString())
      grup = filtered;
   }

   snack(k: any, m?: any){
      this.snackbar.openFromComponent(SnackbarComponent, {
         data: {
            key: k,
            msg: m
         }
      })
   }
}

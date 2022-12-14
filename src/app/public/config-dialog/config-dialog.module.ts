import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigDialogComponent } from './config-dialog.component';
import { SignupModule } from '../auth/signup/signup.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfigDialogComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SignupModule
  ]
})
export class ConfigDialogModule { }

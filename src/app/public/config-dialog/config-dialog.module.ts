import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigDialogComponent } from './config-dialog.component';
import { SignupModule } from '../auth/signup/signup.module';
import {MatStepperModule} from '@angular/material/stepper';
import { LowerDashPipe } from 'src/app/pipes/lower-dash.pipe';
import { RouterModule } from '@angular/router';

/* import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; */



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

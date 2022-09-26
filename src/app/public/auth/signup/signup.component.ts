import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;
  hide: boolean;
  loading: boolean;

  constructor(
    public jwtAuth: JwtAuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.signinForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      email: new FormControl('', /* [ */Validators.required/* , Validators.email] */),
      auth_key: new FormControl('', Validators.required),
      //password: new FormControl(true)
    });
    this.hide = true;
    this.loading = false;
  }

  ngOnInit(): void {
  }

  signup() {
    this.loading = true;

    if(this.signinForm.valid) {
      const signinData = this.signinForm.value;
      // this.submitButton.disabled = true;
      //this.progressBar.mode = 'indeterminate';
      // console.log(signinData);
      // console.log(signinData.password);
      this.jwtAuth.signUp(signinData.email, signinData.auth_key).subscribe({
        next: (response: any) => {
          // console.log(response);
          if (response['Mensaje'] === 'Error') {
            this._snackBar.open('Ocurrió un error.', '', {
              duration: 5000
            });
          } else {
            this.signin()
            // this.router.navigateByUrl(this.jwtAuth.return);
            //this._snackBar.dismiss();
          }
          this.loading = false;
        },
        error: (err: any) => {
          this._snackBar.open('Error de comunicación.', 'Cerrar', {
            duration: 5000
          });
          console.log(err.message);
          this.loading = false;
        },
      });
    }
  }

  signin() {
    if(this.signinForm.valid){
      const signinData = this.signinForm.value;
      // this.submitButton.disabled = true;
      //this.progressBar.mode = 'indeterminate';
      // console.log(signinData);
      // console.log(signinData.password);
      this.jwtAuth.signinBack(signinData.email, signinData.auth_key).subscribe(
        {
        next: (response) => {
          // console.log(response);
          if (response['auth'] === '0') {
            this._snackBar.open('Revise su contraseña e intentelo de nuevo.', '', {
              duration: 5000
            });
          } else {
            // this.router.navigateByUrl(this.jwtAuth.return);
            //this._snackBar.dismiss();
          }
        },
        error: (err) => {
          this._snackBar.open('Error de comunicación.', 'Cerrar', {
            duration: 5000
          });
          console.log(err/* .message */);
        },
      }
      );
    }
    }

}

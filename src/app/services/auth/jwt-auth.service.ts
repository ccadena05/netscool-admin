import { Injectable, NgZone } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "src/environments/environment";

// ================= only for demo purpose ===========
// const DEMO_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

// const DEMO_USER: User = {
//   id: "5b700c45639d2c0c54b354ba",
//   displayName: "Watson Joyce",
//   role: "SA",
// };
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token:any;
  isAuthenticated: Boolean;
  user: User = {};
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  return: string;
  JWT_TOKEN = "VALLE_TOKEN";
  APP_USER = "VALLE_TOKEN_USER";
  APP_USER_PHOTO = "VALLE_PHOTO_USER";
  APP_COLOR = "VALLE_COLOR";
  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private zone:NgZone,
    private route: ActivatedRoute
  ) {

    this.return = "";
    this.isAuthenticated = false;
    this.signingIn = false;

    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
     
  }

  public signin(username: any, password: any) {
    // return of({token: DEMO_TOKEN, user: DEMO_USER})
    //   .pipe(
    //     delay(1000),
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER
    this.signingIn = true;
    //console.log(`${environment.apiURL}auth/_api.php?opcion=authPortal`);
     return this.http.post(`${environment.apiURL}/auth/_api.php?opcion=authPortal`, { username, password })
       .pipe(
         map((res: any) => {
          // console.log(res);
           this.setUserAndToken(res.token, res.user, !!res);
           this.setUserPhoto(res.photo);
           this.setColor(res.colortheme);
           this.signingIn = false;
           return res;
        }),
         catchError((error) => {
           console.log(error);
           return throwError(error);
         })
      );
  }

  

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    // return of(DEMO_USER)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       this.signingIn = false;
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       return of(error);
    //     })
    //   );
    
    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */
    return this.http.get(`${environment.apiURL}auth/_api.php?opcion=authCheck`)
       .pipe(
         map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          this.signingIn = false;
           return profile;
         }),
         catchError((error) => {
           this.signout();
           return of(error);
         })
      );
  }

  public signout() {
    this.setUserAndToken("null", {}, false);
    localStorage.clear();

    this.router.navigate(["/login"], {
      queryParams: {
        
      }
    });
    // this.router.navigate(["/login"], {
    //   queryParams: {
    //     return: state.url
    //   }
    // });
    //this.router.navigateByUrl("");
    //this.router.navigate(["/"]);
    // this.router.navigateByUrl('/');
    // window.location.reload();

  }

  isLoggedIn(): Boolean {
    // if(this.getJwtToken()==='{}')
    //   return false;
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  getUserPhoto() {
    return this.ls.getItem(this.APP_USER_PHOTO);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }

  setUserPhoto(photo: String) {
    this.ls.setItem(this.APP_USER_PHOTO,photo);
  }

  changeUserPhoto(photo: String) {
    this.ls.setItem(this.APP_USER_PHOTO,photo);
  }
  setColor(color: String) {
    this.ls.setItem(this.APP_COLOR,color);
  }

  changeColor(color: String) {
    this.ls.setItem(this.APP_COLOR,color);
  }

  getColor() {
    return this.ls.getItem(this.APP_COLOR);
  }

}

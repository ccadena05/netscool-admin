import { Component, HostBinding, AfterContentInit } from '@angular/core';
import { JwtAuthService } from './services/auth/jwt-auth.service';

// @Component({
//   selector: 'body',
//   template: `<child></child>`
// })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {


 






 
  // mode:string;
  constructor(
    private jwtAuth: JwtAuthService,
   
  ) {
   // if(this.jwtAuth.getUser().mode){
      // this.mode= this.jwtAuth.getColor();
   // }else{
     // this.mode= "light";
   // }
 
  // @HostBinding('class') public cssClass = 'class1';
  }

  ngAfterContentInit(){
  
   
        document.body.classList.add(this.jwtAuth.getColor());
       
    
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   @Input() sidenav!: any;
   avatar: string;

   constructor(
      public jwtAuth: JwtAuthService,
      private provider: ProviderService,
      private ls: LocalStoreService
   ) {

      this.avatar = this.jwtAuth.getUserPhoto()
         ? this.jwtAuth.getUserPhoto()
         : '';
   }

   ngOnInit(): void {
      // document.documentElement.classList.add("dark");

      // --------
      /* let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
      let themeToggleLightIcon = document.getElementById(
         'theme-toggle-light-icon'
      ); */

      // Change the icons inside the button based on previous settings
      /* if (this.jwtAuth.getColor() === "dark") {
         themeToggleLightIcon?.classList.remove('hidden');
      } else {
         themeToggleDarkIcon?.classList.remove('hidden');
      } */
      // console.log(this.jwtAuth.getColor());

   }

   checkColor() {
      return this.jwtAuth.getColor() === "dark"
   }

   toggleSidenav(sidenav: any) {
      sidenav.toggle();
   }

   changeMode(mode: any){
      console.log(this.jwtAuth.getColor());

      document.body.classList.toggle('dark')
      // this.jwtAuth.setColor(mode);
      this.ls.setItem('NC_COLOR', mode);


      this.provider.BD_ActionPost('user', 'updateColor', { mode: mode, id: this.ls.getItem("NC_TOKEN_USER")._id }).subscribe(
         (data: any) =>{
            console.log(data);
         }
      );
      console.log(this.jwtAuth.getColor());

   }

   changeModeColor() {
      /* let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
      let themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
      // toggle icons inside button
      themeToggleDarkIcon?.classList.toggle('hidden');
      themeToggleLightIcon?.classList.toggle('hidden');
      let color2: string;
      color2 = "light";
      // if set via local storage previously
      let mode = this.jwtAuth.getColor() || 'light';
      console.log(this.jwtAuth.getColor());
      //if (mode) {
      if (mode === "light") {
         document.body.classList.add("dark");
         document.body.classList.remove("light");
         this.jwtAuth.setColor("dark");
         color2 = "dark";
      } else {
         document.body.classList.remove("dark");
         document.body.classList.add("light");
         this.jwtAuth.setColor("light");
         color2 = "light";
      }

      // if NOT set via local storage previously
       // } else {
        // if (document.body.classList.contains('dark')) {
        //   document.body.classList.remove('dark');
        //   this.jwtAuth.setColor('light');
        //   color2 = 'light';
        // } else {
        //   document.body.classList.add('dark');
        //   this.jwtAuth.setColor('dark');
        //   color2 = 'dark';
        // }
      // }

      this.provider.BD_ActionPost('user', 'updateColor', { mode: color2, id: this.ls.getItem("NC_TOKEN_USER")._id }).subscribe({
         next: (data) => {
            console.log(data);
         },
         error: (err) => {
            console.log(err);
            //this.jwtAuth.signout();
         },
      }); */
   }

   logout() {
      return this.jwtAuth.signout();
   }


}

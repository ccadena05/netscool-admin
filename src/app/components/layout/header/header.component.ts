import { Component, OnInit, Input } from '@angular/core';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
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
    private jwtAuth: JwtAuthService,
    private provider: ProviderService,
  ) {

    this.avatar = this.jwtAuth.getUserPhoto()
      ? this.jwtAuth.getUserPhoto()
      : 'assets/img/avatardefault.png';
  }

  ngOnInit(): void {
    // document.documentElement.classList.add("dark");

     // --------
   let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
   let themeToggleLightIcon = document.getElementById(
     'theme-toggle-light-icon'
   );

   // Change the icons inside the button based on previous settings
   if (this.jwtAuth.getColor() === "dark") {
     themeToggleLightIcon?.classList.remove('hidden');
   } else {
     themeToggleDarkIcon?.classList.remove('hidden');
   }
   // console.log(this.jwtAuth.getColor());

  }

  checkColor() {
    if (this.jwtAuth.getColor() === "dark") return true;
    return false;
  }

  toggleSidenav(sidenav: any){
    sidenav.toggle();
  }

  changeModeColor() {
    let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    let themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );
    // toggle icons inside button
    themeToggleDarkIcon?.classList.toggle('hidden');
    themeToggleLightIcon?.classList.toggle('hidden');
    let color2: string;
    color2 = "light";
    // if set via local storage previously
    if (this.jwtAuth.getColor()) {
      if (this.jwtAuth.getColor() === "light") {
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
    } else {
      // if (document.body.classList.contains('dark')) {
      //   document.body.classList.remove('dark');
      //   this.jwtAuth.setColor('light');
      //   color2 = 'light';
      // } else {
      //   document.body.classList.add('dark');
      //   this.jwtAuth.setColor('dark');
      //   color2 = 'dark';
      // }
    }

    this.provider
      .BD_ActionPostHeder('user', 'updateColor', { color: color2 })
      .subscribe({
        next: (data) => {
         // console.log(data);
        },
        error: (err) => {
          //console.log(err.message);
          //this.jwtAuth.signout();
        },
      });
  }

  logout() {
    return this.jwtAuth.signout();
  }


}

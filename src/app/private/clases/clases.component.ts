import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {
  clases:any;
  constructor( private router:Router,private jwtAuth: JwtAuthService, private provider: ProviderService ) { 
    this.provider.BD_ActionPostHeder('clases', 'index', {}).subscribe( {
      next: (data) => {
        //console.log(data);
        this.clases=data;
      },
      error: (err) => {
        //console.log(err.message);
        //this.jwtAuth.signout();
      },
     
    });
  }

  ngOnInit(): void {
  }

  open(data:any){
    this.router.navigate(['/clases/detail',btoa(data.id_materia_maestro),btoa(data.tbl_materias_id),btoa(data.tbl_grupo_id),btoa(data.tbl_periodo_id),btoa(data.fecha)]);
    // console.log(data);
  }

}

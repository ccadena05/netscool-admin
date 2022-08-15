import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public pageSlice: any;
  public eventos: any;
  constructor(public dialog: MatDialog, public provider: ProviderService, private router:Router,) { 
    this.provider.BD_ActionPostHeder('eventos-v2', 'index', {}).subscribe(
      {
        next: (response) => {
          this.eventos = response;  
          this.pageSlice = this.eventos; 
          console.log(this.pageSlice);
        },
        error: (err) => {
          console.log(err.message);
        },
      }
     );
  }

  ngOnInit(): void {
  }

  openDialog(id?:any) {
    //console.log(id);
    const dialogRef = this.dialog.open(DialogComponent, {
      height: 'auto',
      width: 'auto',
      data: {id:id}|| null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log( result);
    });
  }

  openDetail(id:any){
    this.router.navigate(['/demo/detail',id]);
  }
 

}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProviderService } from "src/app/services/provider/provider.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  eventos: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public provider: ProviderService

  ) {
    this.provider.BD_ActionPost('eventos', 'getEvento', {id: data.id}).subscribe(
      {
        next: (response) => {
          this.eventos = response;
        },
        error: (err) => {
          console.log(err.message);
        },
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  
  };

}

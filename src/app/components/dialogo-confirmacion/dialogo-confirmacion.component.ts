import { Component, OnInit, Inject } from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProviderService } from "src/app/services/provider/provider.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dialogo-confirmacion",
  templateUrl: "./dialogo-confirmacion.component.html",
  styleUrls: ['./dialogo-confirmacion.component.scss'],
})
export class DialogoConfirmacionComponent implements OnInit {
  mentores: any;
  baseUrl = environment.apiUrlBase +'assets/mentores/';
  constructor(
    public dialogRef: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    
    public provider: ProviderService
  ) {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // this.mentores = mentoresData.find(c => c.id === this.eventId);
    // //console.log(this.mentores);
  };

  cerrarDialogo(): void {
    this.dialogRef.close(false);
  }

  confirmado(): void {
    this.dialogRef.close(true);
  }
   
}

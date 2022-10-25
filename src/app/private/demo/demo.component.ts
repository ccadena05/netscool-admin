import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  identificador: string;
  public loading = false;
  routeParts: any;

  constructor(
    private router:Router,
    private provider: ProviderService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.loading = true;
    this.identificador = "1234ASDASFDSF";
    this.loading = false;
    this.routeParts = this.activatedRoute.snapshot.data;
  }

  ngOnInit(): void {
    // this.provider.BD_ActionPost('prueba', 'index', {}).subscribe(data =>{
    //   console.log(data);
    // })
  }
  open(id:any){
    this.router.navigate(['/demo/detail',id]);
  }
  

}

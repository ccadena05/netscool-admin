import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  _id: string;
  constructor(
    private route: ActivatedRoute
  ) { 
    this._id = "";
    /** ID FORM URL **/
    this.route.params.subscribe(params =>{
      this._id = params['id'];
    })

  }

  ngOnInit(): void {
  }

}

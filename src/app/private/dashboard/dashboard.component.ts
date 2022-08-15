import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
 
})
export class DashboardComponent implements OnInit {

  displayName:string;

  tarjetas=[
    {
    imagen:'https://res.cloudinary.com/ptsanmiguelense-ghost/image/upload/v1652480968/valle_mentefactura/c1qmgh0ybduf9zduoq7s.jpg',
    categoria:'Eventos',
    titulo:'Becas Santander Tecnología | Data Science para profesionistas | BEDU',
    fecha:'26 junio 2022',
    contenido:'Es una iniciativa de Grupo Santander a través de una alianza con BEDU, la cual se enfoca en la formación de competencias en los profesionistas de nuestro país con la finalidad de que cuenten con las herramientas adecuadas, visión de negocios y creatividad frente a una oportunidad para tener una ventaja competitiva.'
  },
  {
    imagen:'https://res.cloudinary.com/ptsanmiguelense-ghost/image/upload/v1652480968/valle_mentefactura/c1qmgh0ybduf9zduoq7s.jpg',
    categoria:'Eventos',
    titulo:'Programa de ImpulsoG9',
    fecha:'26 junio 2022',
    contenido:'Sé parte del programa que crea y transforma tu emprendimiento en temas ecológicos y ambientales, fortalece tus habilidades y conviértete en un líder empresarial de la mano de expertos como Marcus Dantustiburón de Shark Tank Mx. Desarrollemos las empresas que sean el cambio positivo para el mundo .'
  }
];

  constructor(
    private jwtAuth: JwtAuthService,
  ) { 
    this.displayName = this.jwtAuth.getUser().displayName;
  }

  ngOnInit(): void {
    console.log( this.getDecodedAccessToken().data.role)
  }

  getDecodedAccessToken(): any {
    return jwt_decode(this.jwtAuth.getJwtToken());
  }

}

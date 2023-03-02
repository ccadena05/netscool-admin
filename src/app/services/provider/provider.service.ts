import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from "../local-store.service";
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})

export class ProviderService {
   JWT_TOKEN = "VALLE_TOKEN";
   APP_USER = "VALLE_TOKEN_USER";
   public _url = '/_api.php?opcion=';
   public _urlMobile = '/_api.php?Funcion=';
   public mentores: any;
   constructor(
      private http: HttpClient,
      //private cookies: CookieService,
      private ls: LocalStoreService
   ) { }

   BD_ActionPostHeder(modelo: any, action: any, data?: any) {
      // console.log(environment.apiURL + modelo + this._url + action);
      return this.http.post(environment.apiURL + modelo + this._url + action, data, {
         headers: new HttpHeaders().set('Authorization', this.getJwtToken())
      });
   }

   BD_ActionPost(modelo: any, action: any, data?: any) {
        console.log(environment.apiURL + modelo + this._url + action, data);
      return this.http.post(environment.apiURL + modelo + this._url + action, data);
      return this.http.post(environment.apiURL + modelo + this._url + action, data);

   }

   BD_ActionUpload(data: any) {
      //console.log(environment.apiURL + modelo + this._url + action);
      //console.log(data);
      return this.http.post(environment.apiURL + '/quill/upload.php', data
      );
   }

   BD_ActionGetMobile(modelo: any, action: any, data: any) {
      return this.http.get(environment.apiURL + modelo + this._urlMobile + action + '&' + data, {
         //headers: new HttpHeaders().set('Authorization', this.getJwtToken())
      });
   }

   BD_ActionGetInfo(modelo: any, action: any, data: any) {
      return this.http.get(environment.apiURL + modelo + this._url + action + data, {
      });
   }

   BD_ActionGetGeolocalizacion(lat: any, lng: any) {
      const token = '0cbb68cb-7cd3-439b-a7a2-9bcf41f23b22';
      return this.http.get('https://api.copomex.com/query/info_cp_geocoding_reverse?lat=' + lat + '&lng=' + lng + '&token=' + token);
   }

   getJwtToken() {
      //console.log(this.ls.getItem(this.JWT_TOKEN));
      return this.ls.getItem(this.JWT_TOKEN);
   }

   getUser() {
      return this.ls.getItem(this.APP_USER);
   }

}

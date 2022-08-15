import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorCatchingInterceptor } from './services/auth/error-interceptor.service';
import { NgwWowModule } from 'ngx-wow';
import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPaginatorIntl() {
 const paginatorIntl = new MatPaginatorIntl();
 paginatorIntl.itemsPerPageLabel = 'Registros por página:';
 paginatorIntl.nextPageLabel = 'Página siguiente';
 paginatorIntl.previousPageLabel = 'Página anterior';
 paginatorIntl.firstPageLabel ='Primera página';
 paginatorIntl.lastPageLabel = 'Última página';
 return paginatorIntl;
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgwWowModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
},
{ provide: MatPaginatorIntl, useValue: getPaginatorIntl() }

],
 
  bootstrap: [AppComponent]
})

export class AppModule { }

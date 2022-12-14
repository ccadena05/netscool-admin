import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
      {
        path: 'demo',
        loadChildren: () =>
          import('./demo/demo.module').then((m) => m.DemoModule),
          data: { title: 'Demo', breadcrumb: 'DEMO' },
      },
      {
        path: 'clases',
        loadChildren: () =>
          import('./clases/clases.module').then((m) => m.ClasesModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
         //  data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' },
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./alumnos/alumnos.module').then((m) => m.AlumnosModule),
         //  data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
      },
      {
         path: 'm/:modulo',
         loadChildren: () =>
         import('./master/master.module').then((m) => m.MasterModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       },
       {
         path: 'm/alumnos/detail/:id',
         loadChildren: () =>
         import('./master/alumnos-detail/alumnos-detail.module').then((m) => m.AlumnosDetailModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       },
       {
         path: 'm/egresados/detail/:id',
         loadChildren: () =>
         import('./master/egresados-detail/egresados-detail.module').then((m) => m.EgresadosDetailModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       },
       {
         path: 'm/contactos/detail/:id',
         loadChildren: () =>
         import('./master/contactos-detail/contactos-detail.module').then((m) => m.ContactosDetailModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       },
       {
         path: 'm/programa_academico/detail/:id',
         loadChildren: () =>
         import('./master/programa-academico-detail/programa-academico-detail.module').then((m) => m.ProgramaAcademicoDetailModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       },
       {
         path: 'm/maestros/detail/:id',
         loadChildren: () =>
         import('./master/maestros-detail/maestros-detail.module').then((m) => m.MaestrosDetailModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       },
       /* {
         path: 'm/:modulo/detail/:id',
         loadChildren: () =>
           import('./egresados/detail/alumnos-detail.module').then((m) => m.DetailModule),
         //   data: { title: 'Alumnos', breadcrumb: 'ALUMNOS' },
       }, */
       {
         path: 'not-found',
         loadChildren:() => import('./../public/not-found/not-found.module').then((m)=> m.NotFoundModule),
       },
      {
        path: 'eventos',
        loadChildren: () =>
          import('./eventos/eventos.module').then((m) => m.EventosModule),
      },
      {
        path: 'oportunidades',
        loadChildren: () =>
          import('./oportunidades/oportunidades.module').then(
            (m) => m.OportunidadesModule
          ),
      },
      {
        path: 'ecosistema',
        loadChildren: () =>
          import('./ecosistema/ecosistema.module').then(
            (m) => m.EcosistemaModule
          ),
      },
      {
        path: 'mentores',
        loadChildren: () =>
          import('./mentores/mentores.module').then((m) => m.MentoresModule),
      },
      {
        path: 'firmamento',
        loadChildren: () =>
          import('./firmamento/firmamento.module').then(
            (m) => m.FirmamentoModule
          ),
      },
      {
        path: 'masterclass',
        loadChildren: () =>
          import('./masterclass/masterclass.module').then(
            (m) => m.MasterclassModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./perfil/perfil.module').then((m) => m.PerfilModule),
      },
      {
        path: 'ayuda',
        loadChildren: () =>
          import('./ayuda/ayuda.module').then((m) => m.AyudaModule),
      },
      {
        path: 'biblioteca',
        loadChildren: () =>
          import('./biblioteca/biblioteca.module').then(
            (m) => m.BibliotecaModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'soe',
    children: [
      {
        path: 'job/:jobNo',
        // canActivate: [jobGuard, formGuard],
        loadComponent: () => {
          return import('./components/soe/soe.component').then(
            (m) => m.SoeComponent
          )
        }
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoeRoutingModule {
  static routes = routes;
}

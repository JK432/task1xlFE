import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadComponent: ()=>{return import('./components/adminpanel/adminpanel.component').then(
            (m) => m.AdminpanelComponent
          )}

      },
            {
        path: 'addjob',
        loadComponent: ()=>{return import('./components/addjob/addjob.component').then(
            (m) => m.AddjobComponent
          )}

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
    static routes = routes;
 }

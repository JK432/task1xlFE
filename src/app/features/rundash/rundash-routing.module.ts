import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dash',
    children: [
      {
        path: '',
        loadComponent: () => {
          return import('./components/home/home.component').then(
            (m) => m.HomeComponent
          )
        }
      },
            {
        path: 'addrun',
        loadComponent: () => {
          return import('./components/addrun/addrun.component').then(
            (m) => m.AddrunComponent
          )
        }
      },
            {
        path: 'jobdetails/:jobNo',
        loadComponent: () => {
          return import('./components/rundash/rundash.component').then(
            (m) => m.RundashComponent
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
export class RundashRoutingModule {
    static routes = routes;
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { jobGuard } from '../../core/guards/job.guard';
import { formGuard } from '../../core/guards/form.guard';

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
        canActivate: [jobGuard,formGuard],
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'presurvey',
    children: [

      {
        path: 'instruction',
        loadComponent: () => {
          return import('./components/instruction/instruction.component').then(
            (m) => m.InstructionComponent
          )
        }
      },
      {
        path: 'form/:jobNo',
        loadComponent: () => {
          return import('./components/presurvey/presurvey.component').then(
            (m) => m.PresurveyComponent
          )
        }
      },


      // {
      //   path: 'well',
      //   loadComponent: () => {
      //     return import('./components/wellinformationform/wellinformationform.component').then(
      //       (m) => m.WellinformationformComponent
      //     )
      //   }
      // },

      // {
      //   path: 'tieon',
      //   loadComponent: () => {
      //     return import('./components/tieoninformation/tieoninformation.component').then(
      //       (m) => m.TieoninformationComponent
      //     )
      //   }
      // },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresurveyRoutingModule {
  static routes = routes;
}

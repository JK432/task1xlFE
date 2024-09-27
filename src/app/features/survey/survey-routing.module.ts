import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'survey',
    children: [
            {
        path: 'quality_analysis/:jobNo',
        loadComponent: () => {
          return import('./components/quality-analysis/quality-analysis.component').then(
            (m) => m.QualityAnalysisComponent
          )
        }
      },
                  {
        path: 'survey_calculation/:jobNo',
        loadComponent: () => {
          return import('./components/survey-calculation/survey-calculation.component').then(
            (m) => m.SurveyCalculationComponent
          )
        }
      },
      {
        path: ':jobNo',
        loadComponent: () => {
          return import('./components/home/home.component').then(
            (m) => m.HomeComponent
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
export class SurveyRoutingModule {
   static routes = routes;
}

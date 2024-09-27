import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresurveyRoutingModule } from '../../features/presurvey/presurvey-routing.module';
import { RundashRoutingModule } from '../../features/rundash/rundash-routing.module';
import { AdminRoutingModule } from '../../features/admin/admin-routing.module';
import { SurveyRoutingModule } from '../../features/survey/survey-routing.module';


export const content: Routes = [

  { path: '', children: [
      ...PresurveyRoutingModule.routes,
      ...RundashRoutingModule.routes,
      ...AdminRoutingModule.routes,
      ...SurveyRoutingModule.routes
  ]}
];
@NgModule({
    imports: [RouterModule.forRoot(content)],
    exports: [RouterModule]
})
export class SaredRoutingModule { }

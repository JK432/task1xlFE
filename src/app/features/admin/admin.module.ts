import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HoursAgoPipe } from '../../shared/pipes/hours-ago.pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }

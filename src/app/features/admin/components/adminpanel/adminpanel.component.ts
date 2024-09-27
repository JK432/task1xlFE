import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { DataService } from '../../services/data.service';
import { JobGDB } from '../../../../shared/interfaces/job';
import { HoursAgoPipe } from '../../../../shared/pipes/hours-ago.pipe';
import { ServiceTypePipe } from '../../pipes/service-type.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [SharedModule,HoursAgoPipe,ServiceTypePipe,CommonModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {

  jobs:JobGDB[] = [];
  jobst:JobGDB[] = [];
  constructor(public dataService:DataService){
    this.dataService.getIntialData();
    this.dataService.getJob();
    this.dataService.jobs$.pipe().subscribe({next:(data)=>{this.jobs = data}})
  }
}

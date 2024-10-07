import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from '../../services/data.service';
import { JobGDB } from '../../interfaces/job';
import { ForignAsyncPipe } from '../../../features/rundash/pipes/forign-async.pipe';
import { HoursAgoPipe } from "../../pipes/hours-ago.pipe";
import { DataService as runDashDataServices } from '../../../features/rundash/services/data.service';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../services/progress.service';
import { Progress } from '../../interfaces/progress';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-data',
  standalone: true,
  imports: [ForignAsyncPipe, HoursAgoPipe, SharedModule, CommonModule],
  templateUrl: './job-data.component.html',
  styleUrl: './job-data.component.scss'
})
export class JobDataComponent implements OnInit {

  @Input() jobNo!: string;
  runno:string= "";
  id:string="";


  job: JobGDB = { assign_to: -1, customer: 1, estimated_date: "", id: -1, job_created_date: "", job_number: "", location: "", rig_number: -1, service: -1, unit_of_measure: -1, };

  private sub: Subscription[];
  constructor(private route: ActivatedRoute,private router: Router, public dataService: DataService, public runDashDataServices: runDashDataServices,public progressService:ProgressService) {
    this.sub = [];

  }

  ngOnInit(): void {
    if (this.jobNo != "") {
      this.dataService.getInfo(this.jobNo);
    }
    this.sub.push(this.dataService.job$.pipe().subscribe({
      next: (data) => {
        this.job = data;
        this.progressService.Progress$.pipe().subscribe({next:(progress:Progress)=>{

        }})

      }
    }))
    console.log(this.jobNo);
      this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      this.runno = params['runNo'];
    }))
  }


  navigateSurvey(){
    this.router.navigate(['/survey/', this.id,this.progressService.runno],);
  }
  navigateSOE(){
    this.router.navigate(['/soe/job/', this.id],);
  }
  navigatePreSurvey(){
    this.router.navigate(['/dash/jobdetails/', this.id],);
  }
  navigateReport(){
    this.router.navigate(['/dash/jobdetails/', this.id],);
  }

}

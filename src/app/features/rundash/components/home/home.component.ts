import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { JobGDB } from '../../../../shared/interfaces/job';
import { HoursAgoPipe } from '../../../../shared/pipes/hours-ago.pipe';
import { ForignAsyncPipe } from '../../pipes/forign-async.pipe';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsService } from '../../../presurvey/services/forms.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HoursAgoPipe, ForignAsyncPipe, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // startJobForm: FormGroup;
  // preserveyForm: FormGroup;
  // jobInfoForm: FormGroup;
  jobs: JobGDB[] = [];
  constructor(public dataService: DataService, private presurveyFormServices: FormsService,private router:Router) {
    this.dataService.getMasterData();
    this.dataService.getJob();
    this.dataService.jobs$.pipe().subscribe({ next: (data) => { this.jobs = data } })
    // this.startJobForm = this.presurveyFormServices.presurveyForm.get('startJobForm') as FormGroup;
    // this.jobInfoForm = this.presurveyFormServices.presurveyForm.get('jobInfoForm') as FormGroup;
    // this.preserveyForm = this.presurveyFormServices.presurveyForm;
  }


  startPresurvey(job: JobGDB) {

    // this.startJobForm.patchValue({
    //   serviceType: job.service,
    //   jobNumber: job.job_number,
    //   customer: job.customer,
    //   unitOfMeasure: job.unit_of_measure,
    //   estimatedDate: job.estimated_date.split('T')[0],
    // })

    console.log(typeof(job.estimated_date));

    // this.jobInfoForm.patchValue({
    //   location:job.location,
    //   rigNo:job.rig_number,
    // })

    // this.preserveyForm.patchValue({
    //   startJobForm:this.startJobForm,
    //   jobInfoForm:this.jobInfoForm,
    // })

    this.router.navigate(['/presurvey/form/'+job.job_number+'/']);
  }

}

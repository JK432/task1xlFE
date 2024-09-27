import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsService } from '../../services/forms.service';
import { FormGroup } from '@angular/forms';
import { Job, JobGDB, JobGDBPost } from '../../../../shared/interfaces/job';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigndetailsform',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigndetailsform.component.html',
  styleUrl: './assigndetailsform.component.scss'
})
export class AssigndetailsformComponent implements OnInit {
  addJobForm: FormGroup;
  jobDetailForm: FormGroup;
  job: JobGDBPost = { assign_to: -1, customer: -1, estimated_date: new Date(Date.now()).toISOString(), job_created_date: new Date(Date.now()).toISOString(), job_number: "", location: "", rig_number: -1, service: -1, unit_of_measure: -1 }

  constructor(public dataServices: DataService, public formsServices: FormsService,private router: Router,) {
    this.addJobForm = this.formsServices.addJobForm;
    this.jobDetailForm = this.addJobForm.get('jobDetailsForm') as FormGroup;

  }

  ngOnInit(): void {

  }

  onSubmit() {
    // this.forms.addJobForm.
    console.log(this.formsServices.addJobForm);
    if (this.jobDetailForm.invalid) {
      this.jobDetailForm.markAllAsTouched();
    } else {
      this.job = {
        assign_to: 1,
        job_number: this.jobDetailForm.get("jobNumber")?.value,
        service: +this.jobDetailForm.get("serviceType")?.value,
        location: this.jobDetailForm.get("location")?.value,
        customer: +this.jobDetailForm.get("customer")?.value,
        rig_number: +this.jobDetailForm.get("rigNo")?.value,
        unit_of_measure: +this.jobDetailForm.get("unitOfMeasure")?.value,
        estimated_date: this.jobDetailForm.get("estimatedDate")?.value,
        job_created_date: new Date(Date.now()).toISOString(),
      }
      console.log(this.job);
      this.dataServices.postJob(this.job).then((value)=>{
        if(value){
        this.router.navigate(['/admin/']);
        }
      });

    }
  }

}

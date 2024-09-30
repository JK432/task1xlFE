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
import { DataService as PresSurveyDataService } from '../../../presurvey/services/data.service';
import { PresurveyInfo } from '../../../../shared/interfaces/presurveyinfo';
import { take } from 'rxjs/internal/operators/take';
import { ProgressService } from '../../../../shared/services/progress.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HoursAgoPipe, ForignAsyncPipe, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedjobNo: string = '';
  presurveyInfo: PresurveyInfo = {
    job_info: {
      client_rep: "",
      job_number: "",
      well_id: "",
      well_name: "",
      arrival_date: new Date(Date.now()).toISOString()
    },
    survey_info: [],
    tie_on_information: [],
    well_info: {
      east_coorinates: 0,
      g_t: 0,
      max_gt: 0,
      max_wt: 0,
      min_gt: 0,
      min_wt: 0,
      north_coordinates: 0,
      w_t: 0,
      well_info_id: 0,
      central_meridian: 0.0,
      easting: 0.0,
      expected_well_temp: 0.0,
      expected_wellbore_inclination: 0.0,
      GLE: 0.0,
      job_number: "",
      latitude_1: 0.0,
      latitude_2: 0.0,
      latitude_3: 0.0,
      longitude_1: 0.0,
      longitude_2: 0.0,
      longitude_3: 0.0,
      northing: 0.0,
      ref_datum: "",
      ref_elivation: "",
      RKB: 0.0,
      well_id: 0.0,
      well_type: 0.0
    }
  };
  jobs: JobGDB[] = [];
  constructor(public dataService: DataService, private presurveyFormServices: FormsService, private router: Router, public presurveyDataServices: PresSurveyDataService,public progressService:ProgressService) {
    this.dataService.getMasterData();
    this.dataService.getJob();
    this.presurveyDataServices.getMasterData();
    this.dataService.jobs$.pipe().subscribe({ next: (data) => { this.jobs = data } })
  }


  startPresurvey(job: JobGDB) {
    this.selectedjobNo = job.job_number;
    this.presurveyDataServices.getInfo(job.job_number).then((data) => {
      if (data) {
        this.presurveyDataServices.PresurveyInfo$.pipe(take(1)).subscribe({
          next: (data) => {
            this.presurveyInfo = data;


            if (
              (this.presurveyInfo.survey_info && this.presurveyInfo.survey_info.length > 0) &&
              (this.presurveyInfo.tie_on_information && this.presurveyInfo.tie_on_information.length > 0) &&
              this.presurveyInfo.well_info !== null &&
              this.presurveyInfo.job_info !== null
            ) {
              this.progressService.setProgress(job.job_number,true)
              this.router.navigate(['/dash/jobdetails/' + job.job_number + '/']);
            } else {
              this.progressService.setProgress(job.job_number,false);
              this.router.navigate(['/presurvey/form/' + job.job_number + '/']);
            }

          }
        });
      }
    });


  }

}

import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ImportSurveyComponent } from '../../modals/import-survey/import-survey.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService as PresurveyDataServices } from '../../../presurvey/services/data.service';
import { DataService as RunDashDataServices } from '../../../rundash/services/data.service';
import { DataService as SurveyDataServices } from '../../services/data.service';
import { WellInfo } from '../../../../shared/interfaces/well_info';
import { ToastrService } from 'ngx-toastr';
import { PresurveyInfo } from '../../../../shared/interfaces/presurveyinfo';
import { ForignAsyncPipe } from '../../../rundash/pipes/forign-async.pipe';
import { SurveyInfo } from '../../../../shared/interfaces/surveyinfo';
import { take } from 'rxjs/internal/operators/take';
import { JobDataComponent } from '../../../../shared/components/job-data/job-data.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, CommonModule, ImportSurveyComponent, ForignAsyncPipe,JobDataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private sub: Subscription[];
  surveyCalculationErrorFlag: boolean = false;
  id: string;
  runno: string;
  presurveyInfo: PresurveyInfo;
  wellInfo: WellInfo;
  wellInfoI: WellInfo;
  selectedFile: File | null = null;
  selectedSurveyInfo: SurveyInfo = {
    survey_info_id: -1,
    run_name: "",
    run_number: 0,
    survey_run_in: "",
    minimum_id: "",
    north_reference: "",
    survey_calculation_method: "",
    map_zone: "",
    geodetic_system: "",
    geodetic_datum: "",
    start_depth: 0,
    tag_depth: 0,
    proposal_direction: 0,
    job_number: "",
    type_of_tool: 0,
    survey_type: 0,
    hole_section: 0
  };


  constructor(private route: ActivatedRoute, public presurveyDataServices: PresurveyDataServices, private router: Router, public surveyDataServices: SurveyDataServices, private toastr: ToastrService,public rundashDataService:RunDashDataServices) {
    this.sub = []
    this.id = "";
    this.runno = '1';
    this.presurveyInfo = {
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
    this.wellInfo = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 0.0, latitude_2: 0.0, latitude_3: 0.0, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }
    this.wellInfoI = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 10, latitude_2: 75, latitude_3: 12.35, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }

  }
  ngOnInit(): void {

    this.rundashDataService.masterData$.pipe(take(1)).subscribe(value => {
    if(value.survey_type.length>0){}else{
      this.rundashDataService.getMasterData();
    }
  });
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      this.runno = params['runNo'];
      this.presurveyDataServices.getInfo(this.id);
      this.sub.push(this.presurveyDataServices.PresurveyInfo$.pipe().subscribe({
        next: (data) => {
          this.presurveyInfo = data;
          this.wellInfo = this.presurveyInfo.well_info;
          console.log(this.presurveyInfo);
          this.selectedSurveyInfo = this.presurveyInfo.survey_info.filter(run => run.run_number == +this.runno)[0] ?? {
            survey_info_id: -1,
            run_name: "",
            run_number: 0,
            survey_run_in: "",
            minimum_id: "",
            north_reference: "",
            survey_calculation_method: "",
            map_zone: "",
            geodetic_system: "",
            geodetic_datum: "",
            start_depth: 0,
            tag_depth: 0,
            proposal_direction: 0,
            job_number: "",
            type_of_tool: 0,
            survey_type: 0,
            hole_section: 0
          }
        }
      }))
      this.surveyDataServices.getSurveyCalculationDetails(this.id, this.runno).then((value) => {

      });
      this.surveyDataServices.surveyCalculationDetailsError$.pipe().subscribe({
        next: (data) => {
          this.surveyCalculationErrorFlag = data;

        }
      })
    }))
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('job_number', this.id);
      formData.append('run_number', this.runno);
      formData.append('survey_type','1');
      // formData.append('survey_type', this.presurveyInfo.survey_info.filter((preinfo)=>{preinfo.run_number == +this.runno })[0].survey_type.toString());
      this.surveyDataServices.postSurveyFile(formData, this.id, this.runno).then((val) => {
        if (val == true) {
          // this.calculateSurvey();
          this.toastr.success('Quality Analysis available,', 'Sucess', { positionClass: 'toast-top-center' });
        }
      });
      console.log(this.selectedFile);
    } else {
      console.error('No file selected');
    }
  }

  async calculateSurvey(): Promise<void> {
    if (this.id && this.runno) {
      const formData = new FormData();
      formData.append('job_number', this.id);
      formData.append('run_number', this.runno);
      await this.surveyDataServices.IntiateSurveyCalculation(formData, this.id, this.runno);
    } else {
      console.error('No Id');
    }
  }



  navigateToQualityAnalysis() {
    this.router.navigate(['/survey/quality_analysis/', this.id, this.runno],);
  }

  navigateToSurveyCalculation() {
    if (this.surveyCalculationErrorFlag) {
      this.calculateSurvey().then(() => {
        this.router.navigate(['/survey/survey_calculation/', this.id, this.runno],);
      });
    } else {
      this.router.navigate(['/survey/survey_calculation/', this.id, this.runno],);
    }

  }

}

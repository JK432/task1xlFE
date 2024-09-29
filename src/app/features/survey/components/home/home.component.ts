import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ImportSurveyComponent } from '../../modals/import-survey/import-survey.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService as PresurveyDataServices } from '../../../presurvey/services/data.service';
import { DataService as SurveyDataServices } from '../../services/data.service';
import { WellInfo } from '../../../../shared/interfaces/well_info';
import { ToastrService } from 'ngx-toastr';
import { PresurveyInfo } from '../../../../shared/interfaces/presurveyinfo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, CommonModule, ImportSurveyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private sub: Subscription[];
  surveyCalculationErrorFlag:boolean = false;
  id: string;
  runno:string;
  presurveyInfo:PresurveyInfo;
  wellInfo: WellInfo;
  wellInfoI: WellInfo;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, public presurveyDataServices: PresurveyDataServices, private router: Router, public surveyDataServices: SurveyDataServices, private toastr: ToastrService,) {
    this.sub = []
    this.id = "";
    this.runno='1';
      this.presurveyInfo={
  job_info: {
    client_rep: "",
    job_number: "",
    well_id: "",
    well_name: "",
    arrival_date: new Date(Date.now()).toISOString()
  },
  survey_info:[],
  tie_on_information:[],
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
  }};
    this.wellInfo = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 0.0, latitude_2: 0.0, latitude_3: 0.0, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }
    this.wellInfoI = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 10, latitude_2: 75, latitude_3: 12.35, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }

  }
  ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      this.runno = params['runNo'];
      this.sub.push(this.presurveyDataServices.PresurveyInfo$.pipe().subscribe({
        next: (data) => {
          this.presurveyInfo = data;
          this.wellInfo = this.presurveyInfo.well_info;
          console.log(this.wellInfo);
        }
      }))
      this.surveyDataServices.getSurveyCalculationDetails(this.id,this.runno).then((value)=>{

      });
      this.surveyDataServices.surveyCalculationDetailsError$.pipe().subscribe({
        next:(data)=>{
          this.surveyCalculationErrorFlag=data;

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
      formData.append('survey_type', '1');
      this.surveyDataServices.postSurveyFile(formData,this.id,this.runno).then((val) => {
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
      await this.surveyDataServices.IntiateSurveyCalculation(formData,this.id,this.runno);
    } else {
      console.error('No Id');
    }
  }



  navigateToQualityAnalysis() {
    this.router.navigate(['/survey/quality_analysis/', this.id,this.runno],);
  }

  navigateToSurveyCalculation() {
    if(this.surveyCalculationErrorFlag){
      this.calculateSurvey().then(()=>{
          this.router.navigate(['/survey/survey_calculation/', this.id,this.runno],);
      });
    }else{
      this.router.navigate(['/survey/survey_calculation/', this.id,this.runno],);
    }

  }

}

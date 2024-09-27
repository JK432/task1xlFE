import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { EditsurveyinformationComponent } from '../editsurveyinformation/editsurveyinformation.component';
import { EdittieoninformationComponent } from '../edittieoninformation/edittieoninformation.component';
import { EditwellinformationComponent } from '../editwellinformation/editwellinformation.component';
import { EditjobinformationComponent } from '../editjobinformation/editjobinformation.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../presurvey/services/data.service';
import { DataService as RundashDataService} from '../../services/data.service';

import { WellInfo } from '../../../../shared/interfaces/well_info';
import { PresurveyInfo } from '../../../../shared/interfaces/presurveyinfo';
import { SurveyInfo } from '../../../../shared/interfaces/surveyinfo';
import { TieOnInfo } from '../../../../shared/interfaces/tieoninfo';
import { ForignAsyncPipe } from '../../pipes/forign-async.pipe';
import { CommonModule } from '@angular/common';
import { JobDataComponent } from '../../../../shared/components/job-data/job-data.component';

@Component({
  selector: 'app-rundash',
  standalone: true,
  imports: [SharedModule, EditsurveyinformationComponent, EdittieoninformationComponent,ForignAsyncPipe, EditwellinformationComponent, EditjobinformationComponent,CommonModule,JobDataComponent],
  templateUrl: './rundash.component.html',
  styleUrl: './rundash.component.scss'
})
export class RundashComponent implements OnInit {
  emptysurveyInfo: SurveyInfo = {
      survey_info_id: 0,
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

  emptyTieonInfo:TieOnInfo={
      id: 0,
      measured_depth: 0,
      true_vertical_depth: 0,
      inclination: 0,
      latitude: 0,
      azimuth: 0,
      departure: 0,
      job_number: "",
      run_number: 0
    };
  selectedRun: number;
  private sub: Subscription[];
  selectedSurveyInfo: SurveyInfo;
  selectedTieOnInfo: TieOnInfo;
  id: string;
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
  wellInfo: WellInfo;
  wellInfoI: WellInfo;

  constructor(private route: ActivatedRoute, public presurveyDataServices: DataService, private router: Router,public rundashdataService:RundashDataService) {
    this.selectedRun = 1;
    this.sub = []
    this.id = "";
    rundashdataService.getMasterData();

    this.selectedSurveyInfo = {
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


    this.selectedTieOnInfo = {
      id: -1,
      measured_depth: 0,
      true_vertical_depth: 0,
      inclination: 0,
      latitude: 0,
      azimuth: 0,
      departure: 0,
      job_number: "",
      run_number: 0
    };

    this.wellInfo = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 0.0, latitude_2: 0.0, latitude_3: 0.0, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }
    this.wellInfoI = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 10, latitude_2: 75, latitude_3: 12.35, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }

  }
  convertToDecimalDegrees(latitude1: number, latitude2: number, latitude3: number): number {
    return latitude1 + (latitude2 / 60) + (latitude3 / 3600);
  }

  selectRun(runNumber:number){
    this.selectedRun = runNumber;
    if(this.presurveyInfo.survey_info.length>0){
          this.selectedSurveyInfo = this.presurveyInfo.survey_info.find(surveyInfo => surveyInfo.run_number === this.selectedRun)??this.emptysurveyInfo;
          this.selectedTieOnInfo = this.presurveyInfo.tie_on_information.find(tieonInfo => tieonInfo.run_number === this.selectedRun)??this.emptyTieonInfo;
          }
  }

  navigateToSurvey() {
    this.router.navigate(['/survey', this.wellInfo.job_number],);
  }

  ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];

      this.presurveyDataServices.getInfo(this.id);
      this.sub.push(this.presurveyDataServices.PresurveyInfo$.pipe().subscribe({
        next: (data) => {
          this.presurveyInfo = data;
          this.wellInfo = this.presurveyInfo.well_info;
          if(this.presurveyInfo.survey_info.length>0){
          this.selectedSurveyInfo = this.presurveyInfo.survey_info.find(surveyInfo => surveyInfo.run_number === this.selectedRun)??this.emptysurveyInfo;
          this.selectedTieOnInfo = this.presurveyInfo.tie_on_information.find(tieonInfo => tieonInfo.run_number === this.selectedRun)??this.emptyTieonInfo;
          }
          console.log(this.presurveyInfo);
        }
      }))
    }))

    console.log(this.id);
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => {
      s.unsubscribe();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { EditsurveyinformationComponent } from '../editsurveyinformation/editsurveyinformation.component';
import { EdittieoninformationComponent } from '../edittieoninformation/edittieoninformation.component';
import { EditwellinformationComponent } from '../editwellinformation/editwellinformation.component';
import { EditjobinformationComponent } from '../editjobinformation/editjobinformation.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../presurvey/services/data.service';
import { DataService as RundashDataService } from '../../services/data.service';

import { WellInfo } from '../../../../shared/interfaces/well_info';
import { PresurveyInfo } from '../../../../shared/interfaces/presurveyinfo';
import { SurveyInfo } from '../../../../shared/interfaces/surveyinfo';
import { TieOnInfo } from '../../../../shared/interfaces/tieoninfo';
import { ForignAsyncPipe } from '../../pipes/forign-async.pipe';
import { CommonModule } from '@angular/common';
import { JobDataComponent } from '../../../../shared/components/job-data/job-data.component';
import { ToastrService } from 'ngx-toastr';
import { ProgressService } from '../../../../shared/services/progress.service';
import { AddrunComponent } from '../addrun/addrun.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { SurveyType } from '../../../../shared/interfaces/survey-type';

@Component({
  selector: 'app-rundash',
  standalone: true,
  imports: [SharedModule, EditsurveyinformationComponent, EdittieoninformationComponent, ForignAsyncPipe, EditwellinformationComponent, EditjobinformationComponent, CommonModule, JobDataComponent, AddrunComponent],
  templateUrl: './rundash.component.html',
  styleUrl: './rundash.component.scss'
})
export class RundashComponent implements OnInit {

  surveyInfoForm: FormGroup;
  tieOnInfoForm: FormGroup;
  addRunForm: FormGroup;


  private sub: Subscription[];
  selectedStartDepthUnit: string = '';
  selectedTagDepthUnit: string = '';
  selectedProposalDirectionUnit: string = '';

  typeOfTools: string[] = []; selectedTypeOfTool: string = '';
  surveyTypes: SurveyType[] = []; selectedSurveyType: number = -1;
  holeSections: string[] = []; selectedHoleSection: string = '';
  surveyRunIns: string[] = []; selectedSurveyRunIn: string = '';
  minimumIds: string[] = []; selectedMinimumId: string = '';
  northReferences: string[] = []; selectedNorthReference: string = '';
  surveyCalculationMethod: string = '';
  geodeticSystem: string = '';
  mapZone: string = '';
  geodeticDatum: string = '';
  runNumber: string = '';
  id: string = '';
  currentPage: string = 'Run Info';
  surveyinfos: SurveyInfo[] = [];

  selectedMeasuredDepthUnit: string = '';
  selectedTrueVerticalDepthUnit: string = '';
  selectedInclinationUnit: string = '';
  selectedLatitudeUnit: string = '';
  selectedAzimuthUnit: string = '';
  selectedDepartureUnit: string = '';

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

  emptyTieonInfo: TieOnInfo = {
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
  selectedSurveyInfo: SurveyInfo;
  selectedTieOnInfo: TieOnInfo;

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


  constructor(private route: ActivatedRoute, public presurveyDataServices: DataService, private router: Router, public rundashdataService: RundashDataService, private toastr: ToastrService, public progressService: ProgressService, public fromService: FormService) {
    this.sub = [];

    this.id = "";
    this.addRunForm = this.fromService.addRunForm;
    this.surveyInfoForm = this.addRunForm.get('surveyInfoForm') as FormGroup;
    this.tieOnInfoForm = this.addRunForm.get('tieOnInfoForm') as FormGroup;
    this.selectedStartDepthUnit = this.presurveyDataServices.startDepthUnits.length == 0 ? '' : this.presurveyDataServices.startDepthUnits[0];
    this.selectedTagDepthUnit = this.presurveyDataServices.tagDepthUnits.length == 0 ? '' : this.presurveyDataServices.tagDepthUnits[0];
    this.selectedProposalDirectionUnit = this.presurveyDataServices.proposalDirectionUnits.length == 0 ? '' : this.presurveyDataServices.proposalDirectionUnits[0];

    this.selectedMeasuredDepthUnit = this.presurveyDataServices.meterFeetUnits.length == 0 ? '' : this.presurveyDataServices.meterFeetUnits[0];
    this.selectedTrueVerticalDepthUnit = this.presurveyDataServices.meterFeetUnits.length == 0 ? '' : this.presurveyDataServices.meterFeetUnits[0];
    this.selectedInclinationUnit = this.presurveyDataServices.inclinationUnits.length == 0 ? '' : this.presurveyDataServices.inclinationUnits[0];
    this.selectedLatitudeUnit = this.presurveyDataServices.meterFeetUnits.length == 0 ? '' : this.presurveyDataServices.meterFeetUnits[0];
    this.selectedAzimuthUnit = this.presurveyDataServices.inclinationUnits.length == 0 ? '' : this.presurveyDataServices.inclinationUnits[0];
    this.selectedDepartureUnit = this.presurveyDataServices.meterFeetUnits.length == 0 ? '' : this.presurveyDataServices.meterFeetUnits[0];



    this.selectedRun = 1;
    this.progressService.runno = this.selectedRun.toString();
    this.addRunForm = this.fromService.addRunForm;
    this.sub = []
    this.id = "";
    rundashdataService.getMasterData();


    this.sub.push(this.presurveyDataServices.getTypeOfToolsSubject().subscribe((typeOfTools) => {
      this.typeOfTools = typeOfTools;
      if (this.typeOfTools.length === 0) {
        this.selectedTypeOfTool = '';
      } else {
        if (this.selectedTypeOfTool === '') {
          this.selectedTypeOfTool = this.typeOfTools[0];
        }
      }
    }),
      this.presurveyDataServices.getHoleSectionSubject().subscribe((holeSections) => {
        this.holeSections = holeSections;
        if (this.holeSections.length === 0) {
          this.selectedHoleSection = '';
        } else {
          if (this.selectedHoleSection === '') {
            this.selectedHoleSection = this.holeSections[0];
          }
        }
      }),
      this.presurveyDataServices.getSurveyRunInSubject().subscribe((surveyRunIns) => {
        this.surveyRunIns = surveyRunIns;
        if (this.surveyRunIns.length === 0) {
          this.selectedSurveyRunIn = '';
        } else {
          if (this.selectedSurveyRunIn === '') {
            this.selectedSurveyRunIn = this.surveyRunIns[0];
          }
        }
      }),
      this.presurveyDataServices.getMinimumIdSubject().subscribe((minimumIds) => {
        this.minimumIds = minimumIds;
        if (this.minimumIds.length === 0) {
          this.selectedMinimumId = '';
        } else {
          if (this.selectedMinimumId === '') {
            this.selectedMinimumId = this.minimumIds[0];
          }
        }
      }),
      this.presurveyDataServices.getNorthReferenceSubject().subscribe((northReferences) => {
        this.northReferences = northReferences;
        if (this.northReferences.length === 0) {
          this.selectedNorthReference = '';
        } else {
          if (this.selectedNorthReference === '') {
            this.selectedNorthReference = this.northReferences[0];
          }
        }
      }),


      this.presurveyDataServices.getSurveyCalculationMethodsSubject().subscribe((surveyCalculationMethod) => {
        this.surveyCalculationMethod = surveyCalculationMethod;
      }),


      this.presurveyDataServices.getGeodeticSystemSubject().subscribe((geodeticSystem) => {
        this.geodeticSystem = geodeticSystem;
      }),

      this.presurveyDataServices.getMapZoneSubject().subscribe((mapZone) => {
        this.mapZone = mapZone;
      }),

      this.presurveyDataServices.getGeodeticDatumSubject().subscribe((geodeticDatum) => {
        this.geodeticDatum = geodeticDatum;
      }),

      this.presurveyDataServices.PresurveyInfo$.pipe().subscribe({
        next: (data) => {
          this.surveyinfos = data.survey_info;

          if (this.surveyinfos.length > 0) {
            this.surveyinfos
            const latestRunNumber = Math.max(...this.surveyinfos.map(info => Number(info.run_number)));
            this.surveyInfoForm.patchValue({
              runNo: latestRunNumber + 1,
            })
          } else {
          }
        }
      }))

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

    this.wellInfo = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 0.0, latitude_2: 0.0, latitude_3: 0.0, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: -1, }
    this.wellInfoI = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 10, latitude_2: 75, latitude_3: 12.35, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0, east_coorinates: 0, g_t: 0, max_gt: 0, max_wt: 0, min_gt: 0, min_wt: 0, north_coordinates: 0, w_t: 0, well_info_id: 0, }

  }
  convertToDecimalDegrees(latitude1: number, latitude2: number, latitude3: number): number {
    return latitude1 + (latitude2 / 60) + (latitude3 / 3600);
  }

  selectRun(runNumber: number) {
    this.progressService.runno = runNumber.toString();
    this.selectedRun = runNumber;
    if (this.presurveyInfo.survey_info.length > 0) {
      this.selectedSurveyInfo = this.presurveyInfo.survey_info.find(surveyInfo => surveyInfo.run_number === this.selectedRun) ?? this.emptysurveyInfo;
      this.selectedTieOnInfo = this.presurveyInfo.tie_on_information.find(tieonInfo => tieonInfo.run_number === this.selectedRun) ?? this.emptyTieonInfo;
    }
  }

  navigateToSurvey() {
    if (this.selectedRun > 0) {
      this.router.navigate(['/survey', this.wellInfo.job_number, this.selectedRun],);
    } else {
      this.toastr.warning('No Run Selected', 'Warning', { positionClass: 'toast-top-center' });
    }

  }

  ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];

      this.presurveyDataServices.getInfo(this.id);
      this.sub.push(this.presurveyDataServices.PresurveyInfo$.pipe().subscribe({
        next: (data) => {
          this.presurveyInfo = data;

          if (this.presurveyInfo.well_info) {
            this.wellInfo = this.presurveyInfo.well_info;
          } else {
            this.wellInfo = this.wellInfoI;
          }
          if (this.presurveyInfo.survey_info.length > 0) {
            this.selectedSurveyInfo = this.presurveyInfo.survey_info.find(surveyInfo => surveyInfo.run_number === this.selectedRun) ?? this.emptysurveyInfo;
            this.selectedTieOnInfo = this.presurveyInfo.tie_on_information.find(tieonInfo => tieonInfo.run_number === this.selectedRun) ?? this.emptyTieonInfo;
          } else {
            this.selectedSurveyInfo.survey_info_id = 0;
            this.selectedTieOnInfo.id = 0;
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

  onClose() {
    // this.addRunForm.reset();
    //     if (
    //   this.surveyInfoForm.get('runNo')?.value == '' ||
    //   this.surveyInfoForm.get('typeOfTool')?.value == '' ||
    //   this.surveyInfoForm.get('surveyType')?.value == '' ||
    //   this.surveyInfoForm.get('holeSection')?.value == '' ||
    //   this.surveyInfoForm.get('surveyRunIn')?.value === '' ||
    //   this.surveyInfoForm.get('minimumId')?.value === '' ||
    //   this.surveyInfoForm.get('northReference')?.value === '' ||
    //   this.surveyInfoForm.get('surveyCalculationMethods')?.value === '' ||
    //   this.surveyInfoForm.get('geodeticSystem')?.value === '' ||
    //   this.surveyInfoForm.get('geodeticDatum')?.value === '' ||
    //   this.surveyInfoForm.get('mapZone')?.value === '' ||
    //   this.surveyInfoForm.get('tagDepthUnit')?.value === '' ||
    //   this.surveyInfoForm.get('proposalDirectionUnit')?.value === '') {
    //   this.surveyInfoForm.patchValue({
    //     runNo: this.runNumber,
    //     typeOfTool: this.selectedTypeOfTool,
    //     surveyType: this.selectedSurveyType,
    //     holeSection: this.selectedHoleSection,
    //     surveyRunIn: this.selectedSurveyRunIn,
    //     minimumId: this.selectedMinimumId,
    //     northReference: this.selectedNorthReference,
    //     surveyCalculationMethods: this.surveyCalculationMethod,
    //     geodeticSystem: this.geodeticSystem,
    //     geodeticDatum: this.geodeticDatum,
    //     mapZone: this.mapZone,
    //     startDepthUnit: this.selectedStartDepthUnit,
    //     tagDepthUnit: this.selectedTagDepthUnit,
    //     proposalDirectionUnit: this.selectedProposalDirectionUnit
    //   });
    // } else {
    //   this.selectedTypeOfTool = this.surveyInfoForm.get('typeOfTool')?.value;
    //   this.selectedSurveyType = this.surveyInfoForm.get('surveyType')?.value;
    //   this.selectedHoleSection = this.surveyInfoForm.get('holeSection')?.value;
    //   this.selectedSurveyRunIn = this.surveyInfoForm.get('surveyRunIn')?.value;
    //   this.selectedMinimumId = this.surveyInfoForm.get('minimumId')?.value;
    //   this.selectedNorthReference = this.surveyInfoForm.get('surveyCalculationMethods')?.value;
    //   this.surveyCalculationMethod = this.surveyInfoForm.get('geodeticSystem')?.value;
    //   this.geodeticSystem = this.surveyInfoForm.get('geodeticDatum')?.value;
    //   this.geodeticDatum = this.surveyInfoForm.get('eastingUnit')?.value;
    //   this.mapZone = this.surveyInfoForm.get('mapZone')?.value;
    //   this.selectedStartDepthUnit = this.surveyInfoForm.get('startDepthUnit')?.value;
    //   this.selectedTagDepthUnit = this.surveyInfoForm.get('tagDepthUnit')?.value;
    //   this.selectedProposalDirectionUnit = this.surveyInfoForm.get('proposalDirectionUnit')?.value;
    // }


    // if (this.tieOnInfoForm.get('measuredDepthUnit')?.value == '' ||
    //   this.tieOnInfoForm.get('trueVerticalDepthUnit')?.value == '' ||
    //   this.tieOnInfoForm.get('inclinationUnit')?.value == '' ||
    //   this.tieOnInfoForm.get('latitudeUnit')?.value === '' ||
    //   this.tieOnInfoForm.get('azimuthUnit')?.value === '' ||
    //   this.tieOnInfoForm.get('departureUnit')?.value === '') {
    //   this.tieOnInfoForm.patchValue({
    //     measuredDepthUnit: this.selectedMeasuredDepthUnit,
    //     trueVerticalDepthUnit: this.selectedTrueVerticalDepthUnit,
    //     inclinationUnit: this.selectedInclinationUnit,
    //     latitudeUnit: this.selectedLatitudeUnit,
    //     azimuthUnit: this.selectedAzimuthUnit,
    //     departureUnit: this.selectedDepartureUnit,
    //   });
    // } else {
    //   this.selectedMeasuredDepthUnit = this.tieOnInfoForm.get('measuredDepthUnit')?.value;
    //   this.selectedTrueVerticalDepthUnit = this.tieOnInfoForm.get('trueVerticalDepthUnit')?.value;
    //   this.selectedInclinationUnit = this.tieOnInfoForm.get('inclinationUnit')?.value;
    //   this.selectedLatitudeUnit = this.tieOnInfoForm.get('latitudeUnit')?.value;
    //   this.selectedAzimuthUnit = this.tieOnInfoForm.get('azimuthUnit')?.value;
    //   this.selectedDepartureUnit = this.tieOnInfoForm.get('departureUnit')?.value;
    // }

  }

}

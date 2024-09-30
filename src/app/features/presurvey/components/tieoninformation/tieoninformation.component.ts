import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { FormsService } from '../../services/forms.service';
import { SwitcherService } from '../../services/switcher.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WellInfoPost } from '../../../../shared/interfaces/well_info_post';
import { SurveyInfoPost } from '../../../../shared/interfaces/surveyinfoPost';
import { TieOnInfoPost } from '../../../../shared/interfaces/tieOnInfoPost';
import { JobInfo } from '../../../../shared/interfaces/jobinfo';
import { PresurveyInfoPost } from '../../../../shared/interfaces/presurveyinfo';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProgressService } from '../../../../shared/services/progress.service';

@Component({
  selector: 'app-tieoninformation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tieoninformation.component.html',
  styleUrl: './tieoninformation.component.scss'
})
export class TieoninformationComponent {
  wellInfo: WellInfoPost = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 0.0, latitude_2: 0.0, latitude_3: 0.0, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0 }
  jobinfo: JobInfo = { client_rep: "", job_number: "", well_id: "", well_name: "",arrival_date:new Date(Date.now()).toISOString()}

  surveyInfo: SurveyInfoPost = {
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

  tieonInfo: TieOnInfoPost = {
    measured_depth: 0,
    true_vertical_depth: 0,
    inclination: 0,
    latitude: 0,
    azimuth: 0,
    departure: 0,
    job_number: "",
    run_number:-1,
  };

  progress: Map<string, boolean> = new Map<string, boolean>();

  // startJobForm: FormGroup;
  // jobInfoForm: FormGroup;
  wellInfoForm: FormGroup;
  surveyInfoForm: FormGroup;
  tieOnInfoForm: FormGroup;
  presurveyForm: FormGroup;
  selectedMeasuredDepthUnit: string = '';
  selectedTrueVerticalDepthUnit: string = '';
  selectedInclinationUnit: string = '';
  selectedLatitudeUnit: string = '';
  selectedAzimuthUnit: string = '';
  selectedDepartureUnit: string = '';

  private sub: Subscription[];
  id: string;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private formsServices: FormsService, public data: DataService, private toastr: ToastrService, private switcher: SwitcherService, private router: Router,public progressService:ProgressService) {
    this.sub = []
    this.id ="";

    this.presurveyForm = this.formsServices.presurveyForm;
    // this.jobInfoForm = this.presurveyForm.get('jobInfoForm') as FormGroup;
    this.tieOnInfoForm = this.presurveyForm.get('tieOnInfoForm') as FormGroup;
    // this.startJobForm = this.presurveyForm.get('startJobForm') as FormGroup;
    this.wellInfoForm = this.presurveyForm.get('wellInfoForm') as FormGroup;
    this.surveyInfoForm = this.presurveyForm.get('surveyInfoForm') as FormGroup;

    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    });

    this.selectedMeasuredDepthUnit = this.data.meterFeetUnits.length == 0 ? '' : this.data.meterFeetUnits[0];
    this.selectedTrueVerticalDepthUnit = this.data.meterFeetUnits.length == 0 ? '' : this.data.meterFeetUnits[0];
    this.selectedInclinationUnit = this.data.inclinationUnits.length == 0 ? '' : this.data.inclinationUnits[0];
    this.selectedLatitudeUnit = this.data.meterFeetUnits.length == 0 ? '' : this.data.meterFeetUnits[0];
    this.selectedAzimuthUnit = this.data.inclinationUnits.length == 0 ? '' : this.data.inclinationUnits[0];
    this.selectedDepartureUnit = this.data.meterFeetUnits.length == 0 ? '' : this.data.meterFeetUnits[0];

    if (this.tieOnInfoForm.get('measuredDepthUnit')?.value == '' ||
      this.tieOnInfoForm.get('trueVerticalDepthUnit')?.value == '' ||
      this.tieOnInfoForm.get('inclinationUnit')?.value == '' ||
      this.tieOnInfoForm.get('latitudeUnit')?.value === '' ||
      this.tieOnInfoForm.get('azimuthUnit')?.value === '' ||
      this.tieOnInfoForm.get('departureUnit')?.value === '') {
      this.tieOnInfoForm.patchValue({
        measuredDepthUnit: this.selectedMeasuredDepthUnit,
        trueVerticalDepthUnit: this.selectedTrueVerticalDepthUnit,
        inclinationUnit: this.selectedInclinationUnit,
        latitudeUnit: this.selectedLatitudeUnit,
        azimuthUnit: this.selectedAzimuthUnit,
        departureUnit: this.selectedDepartureUnit,
      });
    } else {
      this.selectedMeasuredDepthUnit = this.tieOnInfoForm.get('measuredDepthUnit')?.value;
      this.selectedTrueVerticalDepthUnit = this.tieOnInfoForm.get('trueVerticalDepthUnit')?.value;
      this.selectedInclinationUnit = this.tieOnInfoForm.get('inclinationUnit')?.value;
      this.selectedLatitudeUnit = this.tieOnInfoForm.get('latitudeUnit')?.value;
      this.selectedAzimuthUnit = this.tieOnInfoForm.get('azimuthUnit')?.value;
      this.selectedDepartureUnit = this.tieOnInfoForm.get('departureUnit')?.value;
    }

  }

    ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
    }))

    console.log(this.id);
  }

  getDirtyControls(formGroup: FormGroup): string[] {
    const dirtyControls: string[] = [];
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.invalid) {
        dirtyControls.push(key);
      }
    });
    return dirtyControls;
  }

  onSubmit() {
    if (this.tieOnInfoForm.invalid) {
      this.tieOnInfoForm.markAllAsTouched();
      return;
    } else {
      this.presurveyForm.patchValue({
        tieOnInfoForm: this.tieOnInfoForm
      });
      console.log(this.presurveyForm)
      this.formsServices.updatePreSurvayForm(this.presurveyForm);
      this.progress.set('Tie-On Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Tie-On Info', 'Asset Info');
      this.toastr.success('Saved Tie On Information', 'Sucess', { positionClass: 'toast-top-center' });

      // if (this.presurveyForm.invalid) {
      //   const dirtyControls = this.getDirtyControls(this.presurveyForm);
      //   if (dirtyControls[0]) {
      //     this.toastr.warning(`Check ${dirtyControls[0]}, Some values are Missing`, 'Warning', { positionClass: 'toast-top-center' });
      //   } else {
      //     this.toastr.warning(`Check Every Form, Some values are Missing`, 'Warning', { positionClass: 'toast-top-center' });
      //   }
      //   this.tieOnInfoForm.markAllAsTouched();

      // } else {

      //   this.wellInfo = {
      //     central_meridian: +this.wellInfoForm.get("centralMeridian")?.value,
      //     easting: +this.wellInfoForm.get("easting")?.value,
      //     expected_well_temp: +this.wellInfoForm.get("expectedWellTemp")?.value,
      //     expected_wellbore_inclination: +this.wellInfoForm.get("expectedWellInclination")?.value,
      //     GLE: +this.wellInfoForm.get("gle")?.value,
      //     job_number: this.id,
      //     latitude_1: +this.wellInfoForm.get("latDeg")?.value,
      //     latitude_2: +this.wellInfoForm.get("latMin")?.value,
      //     latitude_3: +this.wellInfoForm.get("latSec")?.value,
      //     longitude_1: +this.wellInfoForm.get("lngDeg")?.value,
      //     longitude_2: +this.wellInfoForm.get("lngMin")?.value,
      //     longitude_3: +this.wellInfoForm.get("lngSec")?.value,
      //     northing: +this.wellInfoForm.get("northing")?.value,
      //     ref_datum: this.wellInfoForm.get("refDatum")?.value,
      //     ref_elivation: this.wellInfoForm.get("refElevation")?.value,
      //     RKB: +this.wellInfoForm.get("rkb")?.value,
      //     well_id: +this.wellInfoForm.get("wellId")?.value,
      //     well_type: +this.wellInfoForm.get("wellType")?.value
      //   }

      //   this.surveyInfo = {
      //     run_name: this.surveyInfoForm.get("runName")?.value,
      //     run_number: +this.surveyInfoForm.get("runNo")?.value,
      //     survey_run_in: this.surveyInfoForm.get("surveyRunIn")?.value,
      //     minimum_id: this.surveyInfoForm.get("minimumId")?.value,
      //     north_reference: this.surveyInfoForm.get("northReference")?.value,
      //     survey_calculation_method: this.surveyInfoForm.get("surveyCalculationMethods")?.value,
      //     map_zone: this.surveyInfoForm.get("mapZone")?.value,
      //     geodetic_system: this.surveyInfoForm.get("geodeticSystem")?.value,
      //     geodetic_datum: this.surveyInfoForm.get("geodeticDatum")?.value,
      //     start_depth: +this.surveyInfoForm.get("startDepth")?.value,
      //     tag_depth: +this.surveyInfoForm.get("tagDepth")?.value,
      //     proposal_direction: +this.surveyInfoForm.get("proposalDirection")?.value,
      //     job_number:this.id,
      //     type_of_tool:1,
      //     survey_type: this.surveyInfoForm.get("surveyType")?.value,
      //     hole_section:1,
      //   }

      //   this.tieonInfo = {
      //     measured_depth: +this.tieOnInfoForm.get('measuredDepth')?.value,
      //     true_vertical_depth: +this.tieOnInfoForm.get('trueVerticalDepth')?.value,
      //     inclination: +this.tieOnInfoForm.get('inclination')?.value,
      //     latitude: +this.tieOnInfoForm.get('latitude')?.value,
      //     azimuth: +this.tieOnInfoForm.get('azimuth')?.value,
      //     departure: +this.tieOnInfoForm.get('departure')?.value,
      //     job_number:this.id,
      //     run_number:+this.surveyInfoForm.get("runNo")?.value,
      //   };

      //   this.jobinfo = {
      //     client_rep: this.wellInfoForm.get('clientRepresentative')?.value,
      //     job_number: this.id,
      //     well_id: this.wellInfoForm.get('wellId')?.value,
      //     well_name: this.wellInfoForm.get('wellName')?.value,
      //     arrival_date:new Date(Date.now()).toISOString().split('T')[0],
      //   }
      //   console.log(this.wellInfo)
      //   console.log(this.surveyInfo)
      //   console.log(this.tieonInfo)
      //   const presurveyInfo:PresurveyInfoPost = {job_info:this.jobinfo,survey_info:this.surveyInfo,tie_on_information:this.tieonInfo,well_info:this.wellInfo,}
      //   console.log(presurveyInfo);
      //   this.progress.set('Tie-On Info', true)
      //   this.switcher.updateProgress(this.progress);
      //   this.switcher.swicthPage('Tie-On Info', 'Asset Info');
      //   // this.toastr.success('Saved Tie-On Information', 'Sucess', { positionClass: 'toast-top-center' });

      //   // this.data.postInfo(presurveyInfo).then((value) => {
      //   //   if (value) {
      //   //     this.progressService.setProgress(this.wellInfo.job_number,true)
      //   //     this.router.navigate(['/dash/jobdetails', this.wellInfo.job_number],);
      //   //   }
      //   // });
      // }

    }

  }

  onBack() {
    this.presurveyForm.patchValue({
      tieOnInfoForm: this.tieOnInfoForm
    });
    console.log(this.presurveyForm)
    this.formsServices.updatePreSurvayForm(this.presurveyForm);
    this.switcher.swicthPage('Tie-On Info', 'Run Info', true);
    // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  }

  tieInToSurface() {
    this.tieOnInfoForm.patchValue({
      measuredDepth: 0,
      trueVerticalDepth: 0,
      inclination: 0,
      latitude: 0,
      azimuth: 0,
      departure: 0
    });
    console.log(this.presurveyForm)
    this.formsServices.updatePreSurvayForm(this.presurveyForm);
    // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  }

}

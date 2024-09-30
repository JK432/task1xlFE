import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobInfo } from '../../../../shared/interfaces/jobinfo';
import { SurveyInfoPost } from '../../../../shared/interfaces/surveyinfoPost';
import { TieOnInfoPost } from '../../../../shared/interfaces/tieOnInfoPost';
import { WellInfoPost } from '../../../../shared/interfaces/well_info_post';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProgressService } from '../../../../shared/services/progress.service';
import { SwitcherService } from '../../services/switcher.service';
import { PresurveyInfoPost } from '../../../../shared/interfaces/presurveyinfo';
import { CostCenter, Employee, GyroSenser, IntialAssetData, JobAssetPost, Vehicle } from '../../../../shared/interfaces/asset';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-assetinformation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule, SharedModule, NgSelectModule, FormsModule],
  templateUrl: './assetinformation.component.html',
  styleUrl: './assetinformation.component.scss'
})
export class AssetinformationComponent implements OnInit {

  selectedCostCenter: number = -1;
  selectedGyroSensor: number = -1;
  selectedVehicle: number = -1;
  selectedEmployee: Employee = { emp_designation: "", emp_id: "", emp_name: "", emp_short_name: "", id: -1, };
  selectedEmp_1: number = -1;
  selectedEmp_2: Employee | null = null;
  selectedEmp_3: Employee | null = null;
  selectedEmp_4: Employee | null = null;
  selectedEmp_5: Employee | null = null;
  selectedEmp_6: Employee | null = null;
  selectedEmp_7: Employee | null = null;
  costCenters: CostCenter[] = [];
  gyroSensors: GyroSenser[] = [];
  vehicles: Vehicle[] = [];
  employess: Employee[] = [];
  selectedEmployes: Employee[] = [];

  wellInfo: WellInfoPost = { central_meridian: 0.0, easting: 0.0, expected_well_temp: 0.0, expected_wellbore_inclination: 0.0, GLE: 0.0, job_number: "", latitude_1: 0.0, latitude_2: 0.0, latitude_3: 0.0, longitude_1: 0.0, longitude_2: 0.0, longitude_3: 0.0, northing: 0.0, ref_datum: "", ref_elivation: "", RKB: 0.0, well_id: 0.0, well_type: 0.0 }
  jobinfo: JobInfo = { client_rep: "", job_number: "", well_id: "", well_name: "", arrival_date: new Date(Date.now()).toISOString() }

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
    run_number: -1,
  };

  jobAsset: JobAssetPost = { cost_center: -1, gyro_data: -1, vehicle: -1, job_number: "", emp_1: -1, emp_2: null, emp_3: null, emp_4: null, emp_5: null, emp_6: null, emp_7: null, }

  private sub: Subscription[] = [];
  id: string = "";


  wellInfoForm: FormGroup;
  surveyInfoForm: FormGroup;
  tieOnInfoForm: FormGroup;
  presurveyForm: FormGroup;
  assetForm: FormGroup;
  progress: Map<string, boolean> = new Map<string, boolean>();
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private formsServices: FormsService, public data: DataService, private toastr: ToastrService, private switcher: SwitcherService, private router: Router, public progressService: ProgressService) {
    this.presurveyForm = this.formsServices.presurveyForm;
    // this.jobInfoForm = this.presurveyForm.get('jobInfoForm') as FormGroup;
    this.tieOnInfoForm = this.presurveyForm.get('tieOnInfoForm') as FormGroup;
    // this.startJobForm = this.presurveyForm.get('startJobForm') as FormGroup;
    this.wellInfoForm = this.presurveyForm.get('wellInfoForm') as FormGroup;
    this.surveyInfoForm = this.presurveyForm.get('surveyInfoForm') as FormGroup;
    this.assetForm = this.presurveyForm.get('assetInfoForm') as FormGroup;


    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    });

  }

  ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
    }))

    this.sub.push(this.data.assetMaster$.subscribe((intialdata: IntialAssetData) => {
      console.log("Asset master Data");
      console.log(intialdata);
      this.costCenters = intialdata.cost_centers;
      this.gyroSensors = intialdata.gyro_sensers;
      this.vehicles = intialdata.vehicles;
      this.employess = intialdata.employee;
      this.selectedCostCenter = this.costCenters.find(cost_center => cost_center.id == this.assetForm.get('cost_center')?.value)?.id ?? this.costCenters[0]?.id ?? -1;
      this.selectedGyroSensor = this.gyroSensors.find(gyro_sensor => gyro_sensor.id == this.assetForm.get('gyro_data')?.value)?.id ?? this.gyroSensors[0]?.id ?? -1;
      this.selectedVehicle = this.vehicles.find(vehicle => vehicle.id == this.assetForm.get('vehicle')?.value)?.id ?? this.vehicles[0]?.id ?? -1;
      this.selectedEmployee = this.employess.find(employee => employee.id == this.assetForm.get('emp_1')?.value) ?? this.employess[0] ?? this.selectedEmployee;
      this.selectedEmp_2 = this.employess.find(employee => employee.id == this.assetForm.get('emp_2')?.value) ?? null;
      this.selectedEmp_3 = this.employess.find(employee => employee.id == this.assetForm.get('emp_3')?.value) ?? null;
      this.selectedEmp_4 = this.employess.find(employee => employee.id == this.assetForm.get('emp_4')?.value) ?? null;
      this.selectedEmp_5 = this.employess.find(employee => employee.id == this.assetForm.get('emp_5')?.value) ?? null;
      this.selectedEmp_6 = this.employess.find(employee => employee.id == this.assetForm.get('emp_6')?.value) ?? null;
      this.selectedEmp_7 = this.employess.find(employee => employee.id == this.assetForm.get('emp_7')?.value) ?? null;
      if (this.selectedEmployee.id != -1) {
        this.selectedEmployes.push(this.selectedEmployee);
      }
      if (this.selectedEmp_2 != null) {
        this.selectedEmployes.push(this.selectedEmp_2)
      }
      if (this.selectedEmp_3 != null) {
        this.selectedEmployes.push(this.selectedEmp_3)
      }
      if (this.selectedEmp_4 != null) {
        this.selectedEmployes.push(this.selectedEmp_4)
      }
      if (this.selectedEmp_5 != null) {
        this.selectedEmployes.push(this.selectedEmp_5)
      }
      if (this.selectedEmp_6 != null) {
        this.selectedEmployes.push(this.selectedEmp_6)
      }
      if (this.selectedEmp_7 != null) {
        this.selectedEmployes.push(this.selectedEmp_7)
      }

      this.assetForm.patchValue({
        cost_center: this.selectedCostCenter,
        gyro_data: this.selectedGyroSensor,
        vehicle: this.selectedVehicle,
        emp_1: this.selectedEmployee.id,
        emp_2: this.selectedEmp_2 != null ? this.selectedEmp_2.id : null,
        emp_3: this.selectedEmp_3 != null ? this.selectedEmp_3.id : null,
        emp_4: this.selectedEmp_4 != null ? this.selectedEmp_4.id : null,
        emp_5: this.selectedEmp_5 != null ? this.selectedEmp_5.id : null,
        emp_6: this.selectedEmp_6 != null ? this.selectedEmp_6.id : null,
        emp_7: this.selectedEmp_7 != null ? this.selectedEmp_7.id : null,
      });
    }))
  }

  onChange() {

    this.assetForm.patchValue({
      emp_1: this.selectedEmployes[0] ? this.selectedEmployes[0].id : null,
      emp_2: this.selectedEmployes[1] ? this.selectedEmployes[1].id : null,
      emp_3: this.selectedEmployes[2] ? this.selectedEmployes[2].id : null,
      emp_4: this.selectedEmployes[3] ? this.selectedEmployes[3].id : null,
      emp_5: this.selectedEmployes[4] ? this.selectedEmployes[4].id : null,
      emp_6: this.selectedEmployes[5] ? this.selectedEmployes[5].id : null,
      emp_7: this.selectedEmployes[6] ? this.selectedEmployes[6].id : null,
    });
    // this.selectedEmployes.forEach((emp)=>{

    // })
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
    this.onChange();
    console.log(this.presurveyForm)
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    } else {
      this.presurveyForm.patchValue({
        assetInfoForm: this.assetForm
      });
      console.log(this.presurveyForm)
      this.formsServices.updatePreSurvayForm(this.presurveyForm);
      this.progress.set('Asset Info', true)
      this.switcher.updateProgress(this.progress);

      this.toastr.success('Saved Asset Information', 'Sucess', { positionClass: 'toast-top-center' });

      if (this.presurveyForm.invalid) {
        const dirtyControls = this.getDirtyControls(this.presurveyForm);
        if (dirtyControls[0]) {
          this.toastr.warning(`Check ${dirtyControls[0]}, Some values are Missing`, 'Warning', { positionClass: 'toast-top-center' });
        } else {
          this.toastr.warning(`Check Every Form, Some values are Missing`, 'Warning', { positionClass: 'toast-top-center' });
        }
        this.tieOnInfoForm.markAllAsTouched();

      } else {

        this.wellInfo = {
          central_meridian: +this.wellInfoForm.get("centralMeridian")?.value,
          easting: +this.wellInfoForm.get("easting")?.value,
          expected_well_temp: +this.wellInfoForm.get("expectedWellTemp")?.value,
          expected_wellbore_inclination: +this.wellInfoForm.get("expectedWellInclination")?.value,
          GLE: +this.wellInfoForm.get("gle")?.value,
          job_number: this.id,
          latitude_1: +this.wellInfoForm.get("latDeg")?.value,
          latitude_2: +this.wellInfoForm.get("latMin")?.value,
          latitude_3: +this.wellInfoForm.get("latSec")?.value,
          longitude_1: +this.wellInfoForm.get("lngDeg")?.value,
          longitude_2: +this.wellInfoForm.get("lngMin")?.value,
          longitude_3: +this.wellInfoForm.get("lngSec")?.value,
          northing: +this.wellInfoForm.get("northing")?.value,
          ref_datum: this.wellInfoForm.get("refDatum")?.value,
          ref_elivation: this.wellInfoForm.get("refElevation")?.value,
          RKB: +this.wellInfoForm.get("rkb")?.value,
          well_id: +this.wellInfoForm.get("wellId")?.value,
          well_type: +this.wellInfoForm.get("wellType")?.value
        }

        this.surveyInfo = {
          run_name: this.surveyInfoForm.get("runName")?.value,
          run_number: +this.surveyInfoForm.get("runNo")?.value,
          survey_run_in: this.surveyInfoForm.get("surveyRunIn")?.value,
          minimum_id: this.surveyInfoForm.get("minimumId")?.value,
          north_reference: this.surveyInfoForm.get("northReference")?.value,
          survey_calculation_method: this.surveyInfoForm.get("surveyCalculationMethods")?.value,
          map_zone: this.surveyInfoForm.get("mapZone")?.value,
          geodetic_system: this.surveyInfoForm.get("geodeticSystem")?.value,
          geodetic_datum: this.surveyInfoForm.get("geodeticDatum")?.value,
          start_depth: +this.surveyInfoForm.get("startDepth")?.value,
          tag_depth: +this.surveyInfoForm.get("tagDepth")?.value,
          proposal_direction: +this.surveyInfoForm.get("proposalDirection")?.value,
          job_number: this.id,
          type_of_tool: 1,
          survey_type: this.surveyInfoForm.get("surveyType")?.value,
          hole_section: 1,
        }

        this.tieonInfo = {
          measured_depth: +this.tieOnInfoForm.get('measuredDepth')?.value,
          true_vertical_depth: +this.tieOnInfoForm.get('trueVerticalDepth')?.value,
          inclination: +this.tieOnInfoForm.get('inclination')?.value,
          latitude: +this.tieOnInfoForm.get('latitude')?.value,
          azimuth: +this.tieOnInfoForm.get('azimuth')?.value,
          departure: +this.tieOnInfoForm.get('departure')?.value,
          job_number: this.id,
          run_number: +this.surveyInfoForm.get("runNo")?.value,
        };

        this.jobinfo = {
          client_rep: this.wellInfoForm.get('clientRepresentative')?.value,
          job_number: this.id,
          well_id: this.wellInfoForm.get('wellId')?.value,
          well_name: this.wellInfoForm.get('wellName')?.value,
          arrival_date: new Date(Date.now()).toISOString().split('T')[0],
        }

        this.jobAsset = {
          cost_center: +this.assetForm.get('cost_center')?.value,
          gyro_data: +this.assetForm.get('gyro_data')?.value,
          job_number: this.id,
          vehicle: +this.assetForm.get('vehicle')?.value,
          emp_1: +this.assetForm.get('emp_1')?.value,
          emp_2: +this.assetForm.get('emp_2')?.value == -1 ? null : +this.assetForm.get('emp_2')?.value,
          emp_3: +this.assetForm.get('emp_3')?.value == -1 ? null : +this.assetForm.get('emp_3')?.value,
          emp_4: +this.assetForm.get('emp_4')?.value == -1 ? null : +this.assetForm.get('emp_4')?.value,
          emp_5: +this.assetForm.get('emp_5')?.value == -1 ? null : +this.assetForm.get('emp_5')?.value,
          emp_6: +this.assetForm.get('emp_6')?.value == -1 ? null : +this.assetForm.get('emp_6')?.value,
          emp_7: +this.assetForm.get('emp_7')?.value == -1 ? null : +this.assetForm.get('emp_7')?.value,
        };
        console.log(this.wellInfo)
        console.log(this.surveyInfo)
        console.log(this.tieonInfo)
        const presurveyInfo: PresurveyInfoPost = { job_info: this.jobinfo, survey_info: this.surveyInfo, tie_on_information: this.tieonInfo, well_info: this.wellInfo, }
        console.log(presurveyInfo);
        this.progress.set('Asset Info', true)
        this.switcher.updateProgress(this.progress);
        this.toastr.success('Saved Asset Info Information', 'Sucess', { positionClass: 'toast-top-center' });

        this.data.postInfo(presurveyInfo).then((value) => {
          if (value) {
            this.data.postAsset(this.jobAsset).then((val) => {
              if (val) {
                this.progressService.setProgress(this.wellInfo.job_number, true)
                this.router.navigate(['/dash/jobdetails', this.wellInfo.job_number],);
              }
            })
          }
        });
      }

    }

  }

  onBack() {
    this.presurveyForm.patchValue({
      tieOnInfoForm: this.tieOnInfoForm
    });
    console.log(this.presurveyForm)
    this.formsServices.updatePreSurvayForm(this.presurveyForm);
    this.switcher.swicthPage('Asset Info', 'Tie-On Info', true);
    // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  }

}

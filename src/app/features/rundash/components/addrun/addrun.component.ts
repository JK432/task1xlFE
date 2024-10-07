import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SurveyType } from '../../../../shared/interfaces/survey-type';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { DataService as PresurveyDataService } from '../../../presurvey/services/data.service';
import { DataService as rundaashDataSevice } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SwitcherService } from '../../services/switcher.service';
import { MasterData } from '../../../../shared/interfaces/master-data';
import { SurveyInfo } from '../../../../shared/interfaces/surveyinfo';
import { SurveyInfoPost } from '../../../../shared/interfaces/surveyinfoPost';
import { TieOnInfo } from '../../../../shared/interfaces/tieoninfo';
import { TieOnInfoPost } from '../../../../shared/interfaces/tieOnInfoPost';

@Component({
  selector: 'app-addrun',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addrun.component.html',
  styleUrl: './addrun.component.scss'
})

export class AddrunComponent implements OnInit, OnDestroy {
  progress: Map<string, boolean> = new Map<string, boolean>();
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

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, public formsService: FormService, public presurveyData: PresurveyDataService, private toastr: ToastrService, public switcher: SwitcherService, public runDash: rundaashDataSevice) {
    this.sub = [];

    this.id = "";
    this.addRunForm = this.formsService.addRunForm;
    this.surveyInfoForm = this.addRunForm.get('surveyInfoForm') as FormGroup;
    this.tieOnInfoForm = this.addRunForm.get('tieOnInfoForm') as FormGroup;
    this.selectedStartDepthUnit = this.presurveyData.startDepthUnits.length == 0 ? '' : this.presurveyData.startDepthUnits[0];
    this.selectedTagDepthUnit = this.presurveyData.tagDepthUnits.length == 0 ? '' : this.presurveyData.tagDepthUnits[0];
    this.selectedProposalDirectionUnit = this.presurveyData.proposalDirectionUnits.length == 0 ? '' : this.presurveyData.proposalDirectionUnits[0];

    this.selectedMeasuredDepthUnit = this.presurveyData.meterFeetUnits.length == 0 ? '' : this.presurveyData.meterFeetUnits[0];
    this.selectedTrueVerticalDepthUnit = this.presurveyData.meterFeetUnits.length == 0 ? '' : this.presurveyData.meterFeetUnits[0];
    this.selectedInclinationUnit = this.presurveyData.inclinationUnits.length == 0 ? '' : this.presurveyData.inclinationUnits[0];
    this.selectedLatitudeUnit = this.presurveyData.meterFeetUnits.length == 0 ? '' : this.presurveyData.meterFeetUnits[0];
    this.selectedAzimuthUnit = this.presurveyData.inclinationUnits.length == 0 ? '' : this.presurveyData.inclinationUnits[0];
    this.selectedDepartureUnit = this.presurveyData.meterFeetUnits.length == 0 ? '' : this.presurveyData.meterFeetUnits[0];

    this.sub.push(

      this.switcher.getProgress().subscribe((progress) => {
        this.progress = progress;
      }),

      this.switcher.getPageSubject().subscribe((currentPage) => {
        this.currentPage = currentPage;
        console.log(this.currentPage);
      }),

      this.presurveyData.getTypeOfToolsSubject().subscribe((typeOfTools) => {
        this.typeOfTools = typeOfTools;
        if (this.typeOfTools.length === 0) {
          this.selectedTypeOfTool = '';
        } else {
          if (this.selectedTypeOfTool === '') {
            this.selectedTypeOfTool = this.typeOfTools[0];
          }
        }
      }),
      this.presurveyData.getHoleSectionSubject().subscribe((holeSections) => {
        this.holeSections = holeSections;
        if (this.holeSections.length === 0) {
          this.selectedHoleSection = '';
        } else {
          if (this.selectedHoleSection === '') {
            this.selectedHoleSection = this.holeSections[0];
          }
        }
      }),
      this.presurveyData.getSurveyRunInSubject().subscribe((surveyRunIns) => {
        this.surveyRunIns = surveyRunIns;
        if (this.surveyRunIns.length === 0) {
          this.selectedSurveyRunIn = '';
        } else {
          if (this.selectedSurveyRunIn === '') {
            this.selectedSurveyRunIn = this.surveyRunIns[0];
          }
        }
      }),
      this.presurveyData.getMinimumIdSubject().subscribe((minimumIds) => {
        this.minimumIds = minimumIds;
        if (this.minimumIds.length === 0) {
          this.selectedMinimumId = '';
        } else {
          if (this.selectedMinimumId === '') {
            this.selectedMinimumId = this.minimumIds[0];
          }
        }
      }),
      this.presurveyData.getNorthReferenceSubject().subscribe((northReferences) => {
        this.northReferences = northReferences;
        if (this.northReferences.length === 0) {
          this.selectedNorthReference = '';
        } else {
          if (this.selectedNorthReference === '') {
            this.selectedNorthReference = this.northReferences[0];
          }
        }
      }),


      this.presurveyData.getSurveyCalculationMethodsSubject().subscribe((surveyCalculationMethod) => {
        this.surveyCalculationMethod = surveyCalculationMethod;
      }),


      this.presurveyData.getGeodeticSystemSubject().subscribe((geodeticSystem) => {
        this.geodeticSystem = geodeticSystem;
      }),

      this.presurveyData.getMapZoneSubject().subscribe((mapZone) => {
        this.mapZone = mapZone;
      }),

      this.presurveyData.getGeodeticDatumSubject().subscribe((geodeticDatum) => {
        this.geodeticDatum = geodeticDatum;
      }),

      this.presurveyData.PresurveyInfo$.pipe().subscribe({
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
      }),


    )

    if (
      this.surveyInfoForm.get('runNo')?.value == '' ||
      this.surveyInfoForm.get('typeOfTool')?.value == '' ||
      this.surveyInfoForm.get('surveyType')?.value == '' ||
      this.surveyInfoForm.get('holeSection')?.value == '' ||
      this.surveyInfoForm.get('surveyRunIn')?.value === '' ||
      this.surveyInfoForm.get('minimumId')?.value === '' ||
      this.surveyInfoForm.get('northReference')?.value === '' ||
      this.surveyInfoForm.get('surveyCalculationMethods')?.value === '' ||
      this.surveyInfoForm.get('geodeticSystem')?.value === '' ||
      this.surveyInfoForm.get('geodeticDatum')?.value === '' ||
      this.surveyInfoForm.get('mapZone')?.value === '' ||
      this.surveyInfoForm.get('tagDepthUnit')?.value === '' ||
      this.surveyInfoForm.get('proposalDirectionUnit')?.value === '') {
      this.surveyInfoForm.patchValue({
        runNo: this.runNumber,
        typeOfTool: this.selectedTypeOfTool,
        surveyType: this.selectedSurveyType,
        holeSection: this.selectedHoleSection,
        surveyRunIn: this.selectedSurveyRunIn,
        minimumId: this.selectedMinimumId,
        northReference: this.selectedNorthReference,
        surveyCalculationMethods: this.surveyCalculationMethod,
        geodeticSystem: this.geodeticSystem,
        geodeticDatum: this.geodeticDatum,
        mapZone: this.mapZone,
        startDepthUnit: this.selectedStartDepthUnit,
        tagDepthUnit: this.selectedTagDepthUnit,
        proposalDirectionUnit: this.selectedProposalDirectionUnit
      });
    } else {
      this.selectedTypeOfTool = this.surveyInfoForm.get('typeOfTool')?.value;
      this.selectedSurveyType = this.surveyInfoForm.get('surveyType')?.value;
      this.selectedHoleSection = this.surveyInfoForm.get('holeSection')?.value;
      this.selectedSurveyRunIn = this.surveyInfoForm.get('surveyRunIn')?.value;
      this.selectedMinimumId = this.surveyInfoForm.get('minimumId')?.value;
      this.selectedNorthReference = this.surveyInfoForm.get('surveyCalculationMethods')?.value;
      this.surveyCalculationMethod = this.surveyInfoForm.get('geodeticSystem')?.value;
      this.geodeticSystem = this.surveyInfoForm.get('geodeticDatum')?.value;
      this.geodeticDatum = this.surveyInfoForm.get('eastingUnit')?.value;
      this.mapZone = this.surveyInfoForm.get('mapZone')?.value;
      this.selectedStartDepthUnit = this.surveyInfoForm.get('startDepthUnit')?.value;
      this.selectedTagDepthUnit = this.surveyInfoForm.get('tagDepthUnit')?.value;
      this.selectedProposalDirectionUnit = this.surveyInfoForm.get('proposalDirectionUnit')?.value;
    }


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
    this.runDash.masterData$.subscribe((data: MasterData) => {
      this.surveyTypes = data.survey_type;
      this.selectedSurveyType = this.surveyTypes.find(surveyTpe => surveyTpe.id == this.surveyInfoForm.get('surveyType')?.value)?.id ?? this.surveyTypes[0]?.id ?? 1;
      this.surveyInfoForm.patchValue({
        surveyType: this.selectedSurveyType,
      });
    })
    console.log(this.id);
  }

  onBack() {
    this.addRunForm.patchValue({
      surveyInfoForm: this.surveyInfoForm
    });
    // console.log(this.presurveyForm)
    this.formsService.updatePreSurvayForm(this.surveyInfoForm);
    this.switcher.swicthPage('Tie-On Info', 'Run Info', true);
    // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.forEach((s) => {
      s.unsubscribe();
    })
  }

  onSubmitSurveyInfo() {
    if (this.surveyInfoForm.invalid) {
      this.surveyInfoForm.markAllAsTouched();
      return;
    } else {
      this.addRunForm.patchValue({
        surveyInfoForm: this.surveyInfoForm
      });
      console.log(this.addRunForm)
      // this.formsService.updatePreSurvayForm(this.preserveyForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN
      this.progress.set('Run Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Run Info', 'Tie-On Info');
      this.toastr.success('Saved Run Information', 'Sucess', { positionClass: 'toast-top-center' });
    }
  }

  onSubmitTieOnInfo() {
    if (this.surveyInfoForm.invalid) {
      this.surveyInfoForm.markAllAsTouched();
      return;
    } else {
      this.addRunForm.patchValue({
        surveyInfoForm: this.surveyInfoForm
      });
      console.log(this.addRunForm)
      // this.formsService.updatePreSurvayForm(this.preserveyForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN
      this.progress.set('Run Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Run Info', 'Tie-On Info');
      let surveyInfo = <SurveyInfoPost>{
        geodetic_datum: this.surveyInfoForm.get('geodeticDatum')?.value,
        geodetic_system: this.surveyInfoForm.get('geodeticSystem')?.value,

        job_number: this.id,
        map_zone: this.surveyInfoForm.get('mapZone')?.value,
        minimum_id: this.surveyInfoForm.get('minimumId')?.value,
        north_reference: this.surveyInfoForm.get('northReference')?.value,
        proposal_direction: +this.surveyInfoForm.get('proposalDirection')?.value,
        run_name: this.surveyInfoForm.get('runName')?.value,
        run_number: +this.surveyInfoForm.get('runNo')?.value,
        start_depth: +this.surveyInfoForm.get('startDepth')?.value,
        survey_calculation_method: this.surveyInfoForm.get('surveyCalculationMethods')?.value,
        survey_run_in: this.surveyInfoForm.get('surveyRunIn')?.value,
        survey_type: +this.surveyInfoForm.get('surveyType')?.value,
        tag_depth: +this.surveyInfoForm.get('tagDepth')?.value,
        type_of_tool: 1,
        hole_section: 1,
      }

      let tieonInfo = <TieOnInfoPost>{
        measured_depth: +this.tieOnInfoForm.get('measuredDepth')?.value,
        true_vertical_depth: +this.tieOnInfoForm.get('trueVerticalDepth')?.value,
        inclination: +this.tieOnInfoForm.get('inclination')?.value,
        latitude: +this.tieOnInfoForm.get('latitude')?.value,
        azimuth: +this.tieOnInfoForm.get('azimuth')?.value,
        departure: +this.tieOnInfoForm.get('departure')?.value,
        job_number: this.id,
        run_number: +this.surveyInfoForm.get("runNo")?.value,
      };
      console.log(tieonInfo);
      this.runDash.addRun(surveyInfo, tieonInfo).then((val)=>{
        if(val){
          this.toastr.success('Saved Run Information', 'Sucess', { positionClass: 'toast-top-center' });
        }
      })
    }
  }

  changePage(prev: string, next: string) {
    this.switcher.swicthPage(prev, next);
    console.log(next);
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
    // this.formsServices.updatePreSurvayForm(this.presurveyForm);
    // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  }


}

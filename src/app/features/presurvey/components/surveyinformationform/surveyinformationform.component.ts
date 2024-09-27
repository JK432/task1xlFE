import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { FormsService } from '../../services/forms.service';
import { SwitcherService } from '../../services/switcher.service';
import { CommonModule } from '@angular/common';
import { DataService as RundashData } from '../../../rundash/services/data.service';
import { MasterData } from '../../../../shared/interfaces/master-data';
import { SurveyType } from '../../../../shared/interfaces/survey-type';

@Component({
  selector: 'app-surveyinformationform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './surveyinformationform.component.html',
  styleUrl: './surveyinformationform.component.scss'
})
export class SurveyinformationformComponent implements OnInit {
  progress: Map<string, boolean> = new Map<string, boolean>();
  surveyInfoForm: FormGroup;
  preserveyForm: FormGroup;

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
  runNumber:string = '';


  constructor(private formBuilder: FormBuilder, private formsServices: FormsService, public data: DataService, private toastr: ToastrService, private switcher: SwitcherService,private runDashData:RundashData) {

    this.surveyInfoForm = this.formsServices.presurveyForm.get('surveyInfoForm') as FormGroup;
    this.preserveyForm = this.formsServices.presurveyForm;
    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    });

    this.selectedStartDepthUnit = this.data.startDepthUnits.length == 0 ? '' : this.data.startDepthUnits[0];
    this.selectedTagDepthUnit = this.data.tagDepthUnits.length == 0 ? '' : this.data.tagDepthUnits[0];
    this.selectedProposalDirectionUnit = this.data.proposalDirectionUnits.length == 0 ? '' : this.data.proposalDirectionUnits[0];


    this.data.getTypeOfToolsSubject().subscribe((typeOfTools) => {
      this.typeOfTools = typeOfTools;
      if (this.typeOfTools.length === 0) {
        this.selectedTypeOfTool = '';
      } else {
        if (this.selectedTypeOfTool === '') {
          this.selectedTypeOfTool = this.typeOfTools[0];
        }
      }
    });

    this.data.getHoleSectionSubject().subscribe((holeSections) => {
      this.holeSections = holeSections;
      if (this.holeSections.length === 0) {
        this.selectedHoleSection = '';
      } else {
        if (this.selectedHoleSection === '') {
          this.selectedHoleSection = this.holeSections[0];
        }
      }
    });

    this.data.getSurveyRunInSubject().subscribe((surveyRunIns) => {
      this.surveyRunIns = surveyRunIns;
      if (this.surveyRunIns.length === 0) {
        this.selectedSurveyRunIn = '';
      } else {
        if (this.selectedSurveyRunIn === '') {
          this.selectedSurveyRunIn = this.surveyRunIns[0];
        }
      }
    });

    this.data.getMinimumIdSubject().subscribe((minimumIds) => {
      this.minimumIds = minimumIds;
      if (this.minimumIds.length === 0) {
        this.selectedMinimumId = '';
      } else {
        if (this.selectedMinimumId === '') {
          this.selectedMinimumId = this.minimumIds[0];
        }
      }
    });

    this.data.getNorthReferenceSubject().subscribe((northReferences) => {
      this.northReferences = northReferences;
      if (this.northReferences.length === 0) {
        this.selectedNorthReference = '';
      } else {
        if (this.selectedNorthReference === '') {
          this.selectedNorthReference = this.northReferences[0];
        }
      }
    });


    this.data.getSurveyCalculationMethodsSubject().subscribe((surveyCalculationMethod) => {
      this.surveyCalculationMethod = surveyCalculationMethod;
    });


    this.data.getGeodeticSystemSubject().subscribe((geodeticSystem) => {
      this.geodeticSystem = geodeticSystem;
    });

    this.data.getMapZoneSubject().subscribe((mapZone) => {
      this.mapZone = mapZone;
    });

    this.data.getGeodeticDatumSubject().subscribe((geodeticDatum) => {
      this.geodeticDatum = geodeticDatum;
    });

    this.data.getRunNumberSubject().subscribe((runNumber)=>{
      this.runNumber = runNumber;
    });


    if (
      this.surveyInfoForm.get('runNo')?.value==''||
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
        runNo:this.runNumber,
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

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.runDashData.masterData$.subscribe((data: MasterData) => {
      this.surveyTypes = data.survey_type;
      this.selectedSurveyType = this.surveyTypes.find(surveyTpe => surveyTpe.id == this.surveyInfoForm.get('surveyType')?.value)?.id ?? this.surveyTypes[0]?.id ?? -1;
      this.surveyInfoForm.patchValue({
          surveyType: this.selectedSurveyType,
        });
    })

  }


  onSubmit() {
    if (this.surveyInfoForm.invalid) {
      this.surveyInfoForm.markAllAsTouched();
      return;
    } else {
      this.preserveyForm.patchValue({
        surveyInfoForm: this.surveyInfoForm
      });
      console.log(this.preserveyForm)
      this.formsServices.updatePreSurvayForm(this.preserveyForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN
      this.progress.set('Run Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Run Info', 'Tie-On Info');
      this.toastr.success('Saved Run Information', 'Sucess', { positionClass: 'toast-top-center' });
    }
  }


      onBack() {
      this.preserveyForm.patchValue({
        surveyInfoForm: this.surveyInfoForm
      });
      console.log(this.preserveyForm)
      this.formsServices.updatePreSurvayForm(this.preserveyForm);
      this.switcher.swicthPage('Run Info', 'Job and Well Info',true);
      // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  }

}

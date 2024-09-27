import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SwitcherService } from '../../services/switcher.service';
import { CommonModule } from '@angular/common';
import { DataService as RundashData } from '../../../rundash/services/data.service';
import { MasterData } from '../../../../shared/interfaces/master-data';
import { WellType } from '../../../../shared/interfaces/well-type';
@Component({
  selector: 'app-wellinformationform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './wellinformationform.component.html',
  styleUrl: './wellinformationform.component.scss'
})
export class WellinformationformComponent {
  progress: Map<string, boolean> = new Map<string, boolean>();
  wellInfoForm: FormGroup;
  preserveyForm: FormGroup;
  refElevations: string[] = []; selectedrefElevation: string = '';
  refDatums: string[] = []; selectedrefDatum: string = '';
  wellTypes: WellType[] = []; selectedwellType: number = -1;

  masterData: MasterData = { customers: [], hole_section: [], rig_master: [], service_type: [], survey_type: [], tools_type: [], unit_of_measure: [], well_type: [] };

  selectedLatUnit: string = '';
  selectedLngUnit: string = '';
  selectedNorthingUnit: string = '';
  selectedEastingUnit: string = '';
  selectedExpectedWellTempUnit: string = '';
  selectedExpectedWellInclinationUnit: string = '';
  selectedCentralMeridianUnit: string = '';
  selectedGleUnit: string = '';
  selectedRkbUnit: string = '';




  constructor(private formBuilder: FormBuilder, private formsServices: FormsService, public data: DataService, private toastr: ToastrService, private switcher: SwitcherService,private rundashData: RundashData) {

    this.selectedLatUnit = this.data.latUnits.length == 0 ? '' : this.data.latUnits[0];
    this.selectedLngUnit = this.data.lngUnits.length == 0 ? '' : this.data.lngUnits[0];
    this.selectedNorthingUnit = this.data.northingUnits.length == 0 ? '' : this.data.northingUnits[0];
    this.selectedEastingUnit = this.data.eastingUnits.length == 0 ? '' : this.data.eastingUnits[0];
    this.selectedExpectedWellTempUnit = this.data.expectedWellTempUnits.length == 0 ? '' : this.data.expectedWellTempUnits[0];
    this.selectedExpectedWellInclinationUnit = this.data.expectedWellInclinationUnits.length == 0 ? '' : this.data.expectedWellInclinationUnits[0];
    this.selectedCentralMeridianUnit = this.data.centralMeridianUnits.length == 0 ? '' : this.data.centralMeridianUnits[0];
    this.selectedGleUnit = this.data.gleUnits.length == 0 ? '' : this.data.gleUnits[0];
    this.selectedRkbUnit = this.data.rkbUnits.length == 0 ? '' : this.data.rkbUnits[0];

    this.preserveyForm = this.formsServices.presurveyForm;
    this.wellInfoForm = this.preserveyForm.get('wellInfoForm') as FormGroup;


    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    });

    this.data.getRefElevationSubject().subscribe((refElevation) => {
      this.refElevations = refElevation;
      if (this.refElevations.length == 0) {
        this.selectedrefElevation = ""
      } else {
        if (this.selectedrefElevation == '') { this.selectedrefElevation = this.refElevations[0]; }
      }
    })

    this.data.getRefDatumSubject().subscribe((refDatums) => {
      this.refDatums = refDatums;
      if (this.refDatums.length == 0) {
        this.selectedrefDatum = ""
      } else {
        if (this.selectedrefDatum == '') { this.selectedrefDatum = this.refDatums[0]; }
      }
    })


    this.rundashData.masterData$.subscribe((data: MasterData) => {
      this.masterData = data;
      this.wellTypes = this.masterData.well_type;
      this.selectedwellType = this.wellTypes.find(wtype => wtype.id == this.wellInfoForm.get('wellType')?.value)?.id ?? this.wellTypes[0]?.id ?? -1;
      this.wellInfoForm.patchValue({
          wellType: this.selectedwellType,
        });
    })

    if (this.wellInfoForm.get('refElevation')?.value == '' ||
      this.wellInfoForm.get('refDatum')?.value == '' ||
      this.wellInfoForm.get('gleUnit')?.value === '' ||
      this.wellInfoForm.get('rkbUnit')?.value === '' ||
      this.wellInfoForm.get('latUnit')?.value === '' ||
      this.wellInfoForm.get('lngUnit')?.value === '' ||
      this.wellInfoForm.get('northingUnit')?.value === '' ||
      this.wellInfoForm.get('eastingUnit')?.value === '' ||
      this.wellInfoForm.get('expectedWellTempUnit')?.value === '' ||
      this.wellInfoForm.get('expectedWellInclinationUnit')?.value === '' ||
      this.wellInfoForm.get('centralMeridianUnit')?.value === '') {
      this.wellInfoForm.patchValue({
        refElevation: this.selectedrefElevation,
        refDatum: this.selectedrefDatum,
        rkbUnit: this.selectedRkbUnit,
        gleUnit: this.selectedGleUnit,
        latUnit: this.selectedLatUnit,
        lngUnit: this.selectedLngUnit,
        northingUnit: this.selectedNorthingUnit,
        eastingUnit: this.selectedEastingUnit,
        expectedWellTempUnit: this.selectedExpectedWellTempUnit,
        expectedWellInclinationUnit: this.selectedExpectedWellInclinationUnit,
        centralMeridianUnit: this.selectedCentralMeridianUnit
      });
    } else {
      this.selectedrefElevation = this.wellInfoForm.get('refElevation')?.value;
      this.selectedrefDatum = this.wellInfoForm.get('refDatum')?.value;
      this.selectedRkbUnit = this.wellInfoForm.get('rkbUnit')?.value;
      this.selectedGleUnit = this.wellInfoForm.get('gleUnit')?.value;
      this.selectedLatUnit = this.wellInfoForm.get('latUnit')?.value;
      this.selectedLngUnit = this.wellInfoForm.get('lngUnit')?.value;
      this.selectedNorthingUnit = this.wellInfoForm.get('northingUnit')?.value;
      this.selectedEastingUnit = this.wellInfoForm.get('eastingUnit')?.value;
      this.selectedExpectedWellTempUnit = this.wellInfoForm.get('expectedWellTempUnit')?.value;
      this.selectedExpectedWellInclinationUnit = this.wellInfoForm.get('expectedWellInclinationUnit')?.value;
      this.selectedCentralMeridianUnit = this.wellInfoForm.get('centralMeridianUnit')?.value;
    }
  }

  onSubmit() {
    if (this.wellInfoForm.invalid) {
      this.wellInfoForm.markAllAsTouched();
      return;
    } else {
      this.preserveyForm.patchValue({
        wellInfoForm: this.wellInfoForm
      });
      console.log(this.preserveyForm)
      this.formsServices.updatePreSurvayForm(this.preserveyForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN

      this.progress.set('Job and Well Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Job and Well Info', 'Run Info');
      this.toastr.success('Saved Well Information', 'Sucess', { positionClass: 'toast-top-center' });
    }

  }

  //     onBack() {
  //     this.preserveyForm.patchValue({
  //       wellInfoForm: this.wellInfoForm
  //     });
  //     console.log(this.preserveyForm)
  //     this.formsServices.updatePreSurvayForm(this.preserveyForm);
  //     this.switcher.swicthPage('Well Info', 'Job Info',true);
  //     // this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-bottom-right' });
  // }

  ngOnDestroy() {

  }




}

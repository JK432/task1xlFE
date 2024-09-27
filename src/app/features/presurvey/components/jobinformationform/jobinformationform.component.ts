import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SwitcherService } from '../../services/switcher.service';
import { CommonModule } from '@angular/common';
import { RigMaster } from '../../../../shared/interfaces/rig-master';
import { MasterData } from '../../../../shared/interfaces/master-data';
import { DataService as RundashDataService} from '../../../rundash/services/data.service';

@Component({
  selector: 'app-jobinformationform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './jobinformationform.component.html',
  styleUrl: './jobinformationform.component.scss'
})
export class JobinformationformComponent {
  progress: Map<string, boolean> = new Map<string, boolean>();
  jobInfoForm: FormGroup;
  rigNos: RigMaster[] = []; selectedrigNo: number = -1;
  preserveyForm: FormGroup;
  masterData:MasterData = {customers:[],hole_section:[],rig_master:[],service_type:[],survey_type:[],tools_type:[],unit_of_measure:[],well_type:[]}

  constructor(private formBuilder: FormBuilder, private formsServices: FormsService, private data: DataService, private toastr: ToastrService, private switcher: SwitcherService,public rundashData:RundashDataService) {
    this.preserveyForm = this.formsServices.presurveyForm;
    this.jobInfoForm = this.preserveyForm.get('jobInfoForm') as FormGroup;
    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    }).unsubscribe();

    this.rundashData.masterData$.subscribe((data: MasterData) => {
      this.masterData = data;
      this.rigNos = this.masterData.rig_master;
      this.selectedrigNo = this.rigNos.find(rnos => rnos.id == this.jobInfoForm.get('rigNo')?.value)?.id ?? this.rigNos[0]?.id ?? -1;
      console.log(`${this.selectedrigNo} Selected RigNos`);
      console.log(this.masterData);
      this.jobInfoForm.patchValue({
          rigNo: this.selectedrigNo,
        });
    })



  }

  onSubmit() {
    if (this.jobInfoForm.invalid) {
      this.jobInfoForm.markAllAsTouched();
      return;
    } else {
      this.preserveyForm.patchValue({
        jobInfoForm: this.jobInfoForm
      });
      console.log(this.preserveyForm)
      this.formsServices.updatePreSurvayForm(this.preserveyForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN
      this.progress.set('Job Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Job Info', 'Well Info');
      this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-top-center' });
    }

  }

    onBack() {
      this.preserveyForm.patchValue({
        jobInfoForm: this.jobInfoForm
      });
      console.log(this.preserveyForm)
      this.formsServices.updatePreSurvayForm(this.preserveyForm);
      this.switcher.swicthPage('Job Info', 'Job Start Info',true);
  }

  ngOnDestroy() {

  }

}

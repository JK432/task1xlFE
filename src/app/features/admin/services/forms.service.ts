import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ValidationService } from '../../../shared/services/validation.service';

const addJobFormSubject = new BehaviorSubject<FormGroup>(new FormGroup({}));
@Injectable({
  providedIn: 'root'
})
export class FormsService {
  addJobForm: FormGroup;
  addJobForm$ = addJobFormSubject.asObservable();


  constructor(private formBuilder: FormBuilder, private validate: ValidationService) {


    this.addJobForm = this.formBuilder.group({
      jobDetailsForm: this.formBuilder.group({
        jobNumber: ['', [Validators.required, Validators.pattern('^OM\\d+$'),]],
        serviceType: [-1, [Validators.required,ValidationService.isIntialValue(-1)]],
        location: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        customer: [-1, [Validators.required,ValidationService.isIntialValue(-1)]],
        rigNo: [-1, [Validators.required,ValidationService.isIntialValue(-1)]],
        unitOfMeasure: [-1, [Validators.required,ValidationService.isIntialValue(-1)]],
        estimatedDate: ['', [Validators.required, ValidationService.isDateFuture()]],
      }),

      assignInfoForm: this.formBuilder.group({
        assignto: [[], [Validators.required,]],
      }),

      assetInfoForm: this.formBuilder.group({
        assetInfo: [[], Validators.required]
      }),


    })
  }
  // PRESURVEY FROM GROUP



  // FUNCTION TO BE CALLED TO UPDATE THE JOBSTARTFORM.
  updateAddJobForm(presurveyForm: FormGroup) {
    addJobFormSubject.next(presurveyForm);
  }
}

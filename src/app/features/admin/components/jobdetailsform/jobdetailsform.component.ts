import { AfterViewInit, booleanAttribute, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IntialData } from '../../../../shared/interfaces/intial-data';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceType } from '../../../../shared/interfaces/service-type';
import { FormsService } from '../../services/forms.service';
import { ToastrService } from 'ngx-toastr';
import { SwitcherService } from '../../services/switcher.service';
import { RigMaster } from '../../../../shared/interfaces/rig-master';
import { Customer } from '../../../../shared/interfaces/customer';
import { UnitOfMeasure } from '../../../../shared/interfaces/unit-of-measure';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobdetailsform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jobdetailsform.component.html',
  styleUrl: './jobdetailsform.component.scss'
})
export class JobdetailsformComponent {
  intialData: IntialData = { rig_master: [], service_type: [], unit_of_measure: [], customers: [] } as IntialData
  progress: Map<string, boolean> = new Map<string, boolean>();
  jobDetailForm: FormGroup;
  serviceTypes: ServiceType[] = []; selectedServiceType: number = -1;
  rigNos: RigMaster[] = []; selectedRigNo: number = -1;
  customers: Customer[] = []; selectedCustomer: number = -1;
  units: UnitOfMeasure[] = []; selectedUnit: number = -1;
  addJobForm: FormGroup;

  constructor(public data: DataService, public formsServices: FormsService, private toastr: ToastrService, private switcher: SwitcherService,private cdref: ChangeDetectorRef,) {
    this.jobDetailForm = this.formsServices.addJobForm.get('jobDetailsForm') as FormGroup;
    this.addJobForm = this.formsServices.addJobForm;
    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    })
    this.data.intialData$.pipe(
    ).subscribe((intialData) => {
      this.intialData = intialData;
      this.loadData();
    }
    );

  }

  loadData() {
      this.setServiceType();
      this.setRigNo();
      this.setUnitOfMeasure();
      this.setCustomers();
  }

  setServiceType() {
    this.serviceTypes = this.intialData.service_type;
    if (this.serviceTypes.length == 0) {
      this.selectedServiceType = -1;
    } else {
      // If no service type is selected, default to the first available service type
      if (this.selectedServiceType == -1) {
        this.selectedServiceType = this.serviceTypes[0].id;
        // this.selectedServiceType = this.jobDetailForm.get('serviceType')?.value;
      }
    }
    // If the form's serviceType is -1, update the form with the selected value
    if (this.jobDetailForm.get('serviceType')?.value == -1) {
      console.log("this.jobDetailForm.get('serviceType')?.value == -1")
      this.jobDetailForm.patchValue({
        serviceType: this.selectedServiceType,
      });
    } else {
      // If the form already has a value, use that to set the selectedServiceType
      this.selectedServiceType = this.jobDetailForm.get('serviceType')?.value;
    }
  }

  setRigNo() {
    this.rigNos = this.intialData.rig_master;
    if (this.rigNos.length == 0) {
      this.selectedRigNo = -1
    } else {
      if (this.selectedRigNo == -1) {
        this.selectedRigNo = this.rigNos[0].id;
      }
    }
    if (this.jobDetailForm.get('rigNo')?.value == -1) {
      this.jobDetailForm.patchValue({
        rigNo: this.selectedRigNo,
      });
    } else {
      this.selectedRigNo = this.jobDetailForm.get('rigNo')?.value;
    }
  }

  setUnitOfMeasure() {
    this.units = this.intialData.unit_of_measure;
    if (this.units.length == 0) {
      this.selectedUnit = -1
    } else {
      if (this.selectedUnit == -1) {
        this.selectedUnit = this.units[0].id;
      }
    }
    if (this.jobDetailForm.get('unitOfMeasure')?.value == -1) {
      this.jobDetailForm.patchValue({
        unitOfMeasure: this.selectedUnit,
      });
    } else {
      this.selectedUnit = this.jobDetailForm.get('unitOfMeasure')?.value;
    }
  }

  setCustomers() {
    this.customers = this.intialData.customers;
    if (this.customers.length == 0) {
      this.selectedCustomer = -1
    } else {
      if (this.selectedCustomer == -1) {
        this.selectedCustomer = this.customers[0].customer_id;
      }
    }
    if (this.jobDetailForm.get('customer')?.value == -1) {
      this.jobDetailForm.patchValue({
        customer: this.selectedCustomer,
      });
    } else {
      this.selectedCustomer = this.jobDetailForm.get('customer')?.value;
    }
  }

  onSubmit() {
    if (this.jobDetailForm.invalid) {
      this.jobDetailForm.markAllAsTouched();
      return;
    } else {
      this.addJobForm.patchValue({
        jobDetailForm: this.jobDetailForm
      });
      console.log(this.addJobForm)
      this.formsServices.updateAddJobForm(this.addJobForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN
      this.progress.set('Job Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Job Info', 'Assign Info');
      this.toastr.success('Saved Job Information', 'Sucess', { positionClass: 'toast-top-center' });
    }
  }



}

import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { DataService as RundashData } from '../../../rundash/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SwitcherService } from '../../services/switcher.service';
import { ServiceType } from '../../../../shared/interfaces/service-type';
import { ChangeDetectorRef } from '@angular/core';
import { MasterData } from '../../../../shared/interfaces/master-data';
import { Customer } from '../../../../shared/interfaces/customer';
import { UnitOfMeasure } from '../../../../shared/interfaces/unit-of-measure';

@Component({
  selector: 'app-startjobform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './startjobform.component.html',
  styleUrl: './startjobform.component.scss'
})
export class StartjobformComponent implements AfterViewInit {
  progress: Map<string, boolean> = new Map<string, boolean>();
  startJobForm: FormGroup;
  serviceTypes: ServiceType[] = []; selectedServiceType: number = -1;
  customers: Customer[] = []; selectedCustomer: number = -1;
  units: UnitOfMeasure[] = []; selectedUnit: number = -1;
  preserveyForm: FormGroup;
  masterData: MasterData = { customers: [], hole_section: [], rig_master: [], service_type: [], survey_type: [], tools_type: [], unit_of_measure: [], well_type: [] };


  constructor(private cdref: ChangeDetectorRef, private formBuilder: FormBuilder, private formsServices: FormsService, private data: DataService, private toastr: ToastrService, private switcher: SwitcherService, private rundashData: RundashData) {
    console.log('called the constructor');
    this.startJobForm = this.formsServices.presurveyForm.get('startJobForm') as FormGroup;
    this.preserveyForm = this.formsServices.presurveyForm;

    this.switcher.getProgress().subscribe((progress) => {
      this.progress = progress;
    })

    this.rundashData.masterData$.subscribe((data: MasterData) => {
      this.masterData = data;
      this.serviceTypes = this.masterData.service_type;
      this.selectedServiceType = this.serviceTypes.find(stype => stype.id == this.startJobForm.get('serviceType')?.value)?.id ?? this.serviceTypes[0]?.id ?? -1;

      this.customers = this.masterData.customers;
      this.selectedCustomer = this.customers.find(customer => customer.customer_id == this.startJobForm.get('customer')?.value)?.customer_id ?? this.customers[0]?.customer_id ?? -1;
      console.log(this.customers);

      this.units = this.masterData.unit_of_measure;
      console.log(this.units);
      this.selectedUnit = this.units.find(unit => unit.id == this.startJobForm.get('unitOfMeasure')?.value)?.id ?? this.units[0]?.id ?? -1;

      this.startJobForm.patchValue({
          serviceType: this.selectedServiceType,
          unitOfMeasure: this.selectedUnit,
          customer:this.selectedCustomer
        });
    })


    // this.data.getServiceSubject().subscribe((serviceTypes) => {
    //   this.serviceTypes = serviceTypes;
    //   if (this.serviceTypes.length == 0) {
    //     this.selectedServiceType = -1
    //   } else {
    //     if (this.selectedServiceType == -1) {
    //       console.log(this.serviceTypes);
    //       this.selectedServiceType = this.serviceTypes[0].id;
    //       console.log(`Selected Service ${this.selectedServiceType},serviceType of 0 ${serviceTypes[0].id}`);
    //     }
    //   }

    //   if (this.startJobForm.get('serviceType')?.value == -1) {
    //     console.log(`from form ${this.startJobForm.get('serviceType')?.value} Selected  ${this.selectedServiceType}`)

    //     this.startJobForm.patchValue({
    //       serviceType: this.selectedServiceType,
    //     });
    //   } else {
    //     console.log(`from form serviceType ${this.startJobForm.get('serviceType')?.value}`)
    //     this.selectedServiceType = this.startJobForm.get('serviceType')?.value;
    //   }


    //   this.cdref.detectChanges();
    // })

    // this.data.getCustomerSubject().subscribe((customers) => {
    //   // this.customers = customers;
    //   if (this.customers.length == 0) {
    //     this.selectedCustomer = ""
    //   } else {
    //     // if (this.selectedCustomer == '') { this.selectedCustomer = this.customers[0]; }
    //   }
    // });

    // this.data.getUnitOfMeasureSubject().subscribe((units) => {
    //   // this.units = units;
    //   if (this.units.length == 0) {
    //     this.selectedUnit = '';
    //   } else {
    //     // if (this.selectedUnit == '') { this.selectedUnit = this.units[0]; }
    //   }
    // });

    // if (this.startJobForm.get('serviceType')?.value == -1 || this.startJobForm.get('customer')?.value == -1 || this.startJobForm.get('unitOfMeasure')?.value == -1) {
    //   this.startJobForm.patchValue({
    //     serviceType: this.selectedServiceType,
    //     customer: this.selectedCustomer,
    //     unitOfMeasure: this.selectedUnit,
    //   });
    // } else {
    //   this.selectedServiceType = this.startJobForm.get('serviceType')?.value;
    //   this.selectedCustomer = this.startJobForm.get('customer')?.value;
    //   this.selectedUnit = this.startJobForm.get('unitOfMeasure')?.value;
    // }
    // console.log(this.selectedServiceType);

  }

  ngAfterViewInit(): void {

  }

  onSubmit() {
    if (this.startJobForm.invalid) {
      this.startJobForm.markAllAsTouched();
      return;
    } else {
      this.preserveyForm.patchValue({
        startJobForm: this.startJobForm
      });
      console.log(this.preserveyForm)
      console.log(this.startJobForm.get('serviceType')?.value)
      this.formsServices.updatePreSurvayForm(this.preserveyForm);
      // POST JOB INFORMATION USING HTTP CLIENT THEN
      this.progress.set('Job Start Info', true)
      this.switcher.updateProgress(this.progress);
      this.switcher.swicthPage('Job Start Info', 'Job Info');
      this.toastr.success('Saved Job Start Information', 'Sucess', { positionClass: 'toast-top-center' });
    }
  }
}

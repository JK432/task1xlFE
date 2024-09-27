import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';
import { IntialData } from '../../../shared/interfaces/intial-data';

@Pipe({
  name: 'serviceType',
  standalone: true
})
export class ServiceTypePipe implements PipeTransform {
  intialData:IntialData = {customers:[],rig_master:[],service_type:[],unit_of_measure:[],}
  constructor(public data:DataService){
    this.data.intialData$.subscribe((data:IntialData)=>{
        this.intialData = data;
    })
  }

transform(value: number, field: string): string {
    if (value == null || field == null) {
      return 'Invalid input';
    }

    switch (field) {
      case 'RIGNO':
        return this.intialData.rig_master.find(rigno => rigno.id === value)?.rig_number ?? 'Not Found';

      case 'SERVICETYPE':
        return this.intialData.service_type.find(sType => sType.id === value)?.service_type ?? 'Not Found';

      case 'CUSTOMER':
        return this.intialData.customers.find(customer => customer.customer_id === value)?.customer_name ?? 'Not Found';

      case 'UNITOFMEASUREMENT':
        return this.intialData.unit_of_measure.find(unit => unit.id === value)?.unit_of_measure ?? 'Not Found';

      default:
        return 'Unknown field';
    }
  }

}

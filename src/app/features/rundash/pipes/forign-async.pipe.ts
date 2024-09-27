import { Pipe, PipeTransform } from '@angular/core';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { DataService } from '../services/data.service';
import { MasterData } from '../../../shared/interfaces/master-data';

@Pipe({
  name: 'forignAsync',
  standalone: true
})
export class ForignAsyncPipe implements PipeTransform {
  masterData: MasterData = { rig_master: [], service_type: [], unit_of_measure: [], customers: [], hole_section: [], survey_type: [], tools_type: [], well_type: [] }




  constructor(public data: DataService) {
    this.data.masterData$.subscribe((data: MasterData) => {
      this.masterData = data;
    })
  }

  transform(value: number, field: string): string {
    console.log(field + value);
    console.log(this.masterData.well_type)
    if (value == null || field == null) {
      return 'Invalid input';
    }
    if(field == 'CUSTOMER'){
      console.log(this.masterData.customers)
    }

    switch (field) {
      case 'RIGNO':
        return this.masterData.rig_master.find(rigno => rigno.id === value)?.rig_number ?? 'Not Found';

      case 'SERVICETYPE':
        return this.masterData.service_type.find(sType => sType.id === value)?.service_type ?? 'Not Found';

      case 'CUSTOMER':
        return this.masterData.customers.find(customer => customer.customer_id === value)?.customer_name ?? 'Not Found';

      case 'UNITOFMEASUREMENT':
        return this.masterData.unit_of_measure.find(unit => unit.id === value)?.unit_of_measure ?? 'Not Found';

      //     case 'HOLESECTION':
      // return this.masterData.hole_section.find(hole_section => hole_section.id === value)?.minimum_id ?? 'Not Found';
      case 'SURVEYTYPE':
        return this.masterData.survey_type.find(survey_type => survey_type.id === value)?.survey_types ?? 'Not Found';

      case 'TOOLSTYPE':
        return this.masterData.tools_type.find(tools_type => tools_type.id === value)?.type_of_tools ?? 'Not Found';

      case 'WELLTYPE':
        return this.masterData.well_type.find(well_type => well_type.id === value)?.well_type ?? 'Not Found';

      default:
        return 'Unknown field';
    }

  }
}


// import { Pipe, PipeTransform } from '@angular/core';
// import { DataService } from '../services/data.service';
// import { IntialData } from '../../../shared/interfaces/intial-data';

// @Pipe({
//   name: 'serviceType',
//   standalone: true
// })
// export class ServiceTypePipe implements PipeTransform {
//   intialData:IntialData = {customers:[],rig_master:[],service_type:[],unit_of_measure:[],}
//   constructor(public data:DataService){
//     this.data.intialData$.subscribe((data:IntialData)=>{
//         this.intialData = data;
//     })
//   }


//   }

// }

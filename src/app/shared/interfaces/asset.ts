export interface CostCenter {
  id:number;
  header:string;
}


export interface Employee {
  id:number,
  emp_id: string;
  emp_name: string;
  emp_short_name:string,
  emp_designation:string,
}

  //  "id": 1,
  //       "emp_id": "TT-01",
  //       "emp_name": "T. Santosh Kumar",
  //       "emp_short_name": "Santosh Kumar",
  //       "emp_designation":

export interface GyroSenser {
  id: number;
  asset_code: string;
  asset_group: string;
  asset_main_category: string;
  asset_description: string;
  serial_no: string;
  status: string;
}

export interface Vehicle {
  id: number;
  asset_code: string;
  physical_location: string;
  asset_main_category: string;
  asset_description: string;
  serial_no: string;
  status: string;
}

export interface JobAssetPost {
  job_number: string;
  cost_center: number;
  gyro_data: number;
  vehicle: number;
  emp_1: number;
  emp_2: number | null;
  emp_3: number | null;
  emp_4: number | null;
  emp_5: number | null;
  emp_6: number | null;
  emp_7: number | null;
}

export interface JobAssetGet{
  job_number: string;
  cost_center: CostCenter;
  gyro_data: GyroSenser;
  vehicle: Vehicle;
  emp_1: Employee | null;
  emp_2: Employee | null;
  emp_3: Employee | null;
  emp_4: Employee | null;
  emp_5: Employee | null;
  emp_6: Employee | null;
  emp_7: Employee | null;
}

export interface IntialAssetData {
  cost_centers:CostCenter[],
  employee:Employee[],
  gyro_sensers:GyroSenser[],
  vehicles:Vehicle[],
}


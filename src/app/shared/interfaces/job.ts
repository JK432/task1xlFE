export interface Job {
  id:number;
  jobNo:string;
  rigNo:string;
  wellId:string;
  arrivalDate:Date;
  customer:string;
  service:string;
  wellName:string;
  clientRep:string;
  enteredDate:string;
  lastUpdated:string;
}


export interface JobGDB {
  id:number;
  job_number:string;
  service:number;
  location:string;
  assign_to:number;
  customer:number;
  rig_number:number;
  unit_of_measure:number;
  estimated_date:string;
  job_created_date:string;
}

export interface JobGDBPost extends Omit<JobGDB, "id"> {
}



    // {
    //     "job_number": "OM1001",
    //     "location": "muscat",
    //     "assign_to": 18,
    //     "customer": 1,
    //     "rig_number": 1,
    //     "unit_of_measure": 1,
    //     "estimated_date": "2024-09-09T16:29:00Z",
    //     "service": 1,
    //     "job_created_date": "2024-09-09T12:30:14.155260Z"
    // }

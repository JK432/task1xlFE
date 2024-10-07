export interface SOEEvent {
  id: number;
  action: string;
}

//     {
// "id": 1,
//   "action": "job has been started"
//     },

export interface SOEpost {
  job_number:string,
  action_id:number,
}

// {
//   "id": 15,
//     "soe_desc": "job has been started",
//       "created_at": "2024-10-07T02:00:48.139704Z",
//         "job_number": "OM1016"
// }

export interface SOEget {
  id: number,
  soe_desc: string,
  created_at:string,
  job_number:string,
}

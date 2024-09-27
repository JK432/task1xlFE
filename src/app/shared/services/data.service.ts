import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JobGDB } from '../interfaces/job';
import { HttpclientService } from './httpclient.service';
import { finalize } from 'rxjs/internal/operators/finalize';



const JobSubject = new BehaviorSubject<JobGDB>({assign_to:-1,customer:1,estimated_date:"",id:-1,job_created_date:"",job_number:"",location:"",rig_number:-1,service:-1,unit_of_measure:-1,});
const JobLoadingSubject = new BehaviorSubject<boolean>(false);
const JobErrorSubject = new BehaviorSubject<boolean>(false);

@Injectable({
  providedIn: 'root'
})
export class DataService {
   job$ = JobSubject.asObservable();
   jobLoading$ = JobLoadingSubject.asObservable();

  constructor(public httpClientService:HttpclientService) { }

    getInfo(id: string) {
    return new Promise((resolve, reject,) => {
      JobLoadingSubject.next(true);
      this.httpClientService.getJob(id).pipe(
        finalize(() => JobLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: JobGDB) => {
            JobSubject.next(data);
            resolve(true);
          },
          error: (error) => {
            console.error('Error fetching data', error);
            reject(false);
          },
        }
      );
    });
  }
}

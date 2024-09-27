import { Injectable } from '@angular/core';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpclientService } from './httpclient.service';
import { Job, JobGDB, JobGDBPost } from '../../../shared/interfaces/job';
import { finalize } from 'rxjs/internal/operators/finalize';
import { FieldEmployee } from '../../../shared/interfaces/fieldemployee';
import { CustomError } from '../../../core/class/CustomErrorClass';

const JobSubject = new BehaviorSubject<JobGDB[]>([]);
const jobGetLoadingSubject = new BehaviorSubject<boolean>(false);
const jobPostLoadingSubject = new BehaviorSubject<boolean>(false);
const jobGetErrorSubject = new BehaviorSubject<boolean>(false);
const jobPostErrorSubject = new BehaviorSubject<boolean>(false);

const intialDataSubject = new BehaviorSubject<IntialData>({ rig_master: [], service_type: [], unit_of_measure: [],customers:[], });
const intialDataGetLoadingSubject = new BehaviorSubject<boolean>(false);
const intialDataErrorSubject = new BehaviorSubject<boolean>(false);

const fieldEmployeeSubject = new BehaviorSubject<FieldEmployee[]>([]);
const fieldEmployeeGetLoadingSubject = new BehaviorSubject<boolean>(false);
const fieldEmployeeGetErrorSubject = new BehaviorSubject<boolean>(false);

@Injectable({
  providedIn: 'root'
})
export class DataService {

  jobs$ = JobSubject.asObservable();
  jobGetLoading$ = jobGetLoadingSubject.asObservable();
  jobGetError$ = jobGetErrorSubject.asObservable();
  jobPostLoading$ = jobPostLoadingSubject.asObservable();
  jobPostError$ = jobPostErrorSubject.asObservable();

  intialData$ = intialDataSubject.asObservable();
  intialDataGetLoading$ = intialDataGetLoadingSubject.asObservable();
  intialDataError$ = intialDataErrorSubject.asObservable();

  fieldemployee$ = fieldEmployeeSubject.asObservable();
  fieldemployeeGetLoading$ = fieldEmployeeGetLoadingSubject.asObservable();
  fieldemployeeGetError$ = fieldEmployeeGetErrorSubject.asObservable();


  constructor(private httpClient: HttpclientService) { }

  postJob(job:JobGDBPost) {
    return new Promise((resolve, reject,) => {
    jobPostLoadingSubject.next(true);
    this.httpClient.postJob(job).pipe(
      finalize(() => jobPostLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: JobGDB) => {
          JobSubject.next(JobSubject.value.concat(data));
          resolve(true);
        },
        error: (error) => {
          console.error('Error on posting job data', error.message);
          reject();
          throw new CustomError("Error on posting job data");

        },
      }
    );
});
  }

  getJob() {
    jobGetLoadingSubject.next(true);
    this.httpClient.getJob().pipe(
      finalize(() => jobGetLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: [JobGDB]) => {
          JobSubject.next(data);
          console.log(data);
        },
        error: (error) => {
          console.error('Error on geting job list', error.message);
          throw new CustomError("Error on geting job list");
        },
      }
    );
  }

  updateJob() { }

  getIntialData() {
    console.log("GetIntial Data Called");
    intialDataGetLoadingSubject.next(true);
    this.httpClient.getIntialData().pipe(
      finalize(() => intialDataGetLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: IntialData) => {
          intialDataSubject.next(data);
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching data', error);
          intialDataSubject.next({ rig_master: [], service_type: [], unit_of_measure: [],customers:[] });
        },
      }
    );
  }

  getFieldEmployee(){
    fieldEmployeeGetLoadingSubject.next(true);
    this.httpClient.getFieldEmployeeData().pipe(
      finalize(() => fieldEmployeeGetLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: [FieldEmployee]) => {
          fieldEmployeeSubject.next(data);
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching data', error);
          fieldEmployeeSubject.next([]);
        },
      }
    );
  }


}

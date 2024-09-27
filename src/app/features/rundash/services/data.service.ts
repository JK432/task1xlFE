import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JobGDB } from '../../../shared/interfaces/job';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { HttpclientService } from './httpclient.service';
import { CustomError } from '../../../core/class/CustomErrorClass';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MasterData } from '../../../shared/interfaces/master-data';


const JobSubject = new BehaviorSubject<JobGDB[]>([]);
const jobGetLoadingSubject = new BehaviorSubject<boolean>(false);
const jobGetErrorSubject = new BehaviorSubject<boolean>(false);

const masterDataSubject = new BehaviorSubject<MasterData>({ rig_master: [], service_type: [], unit_of_measure: [],customers:[],hole_section:[],survey_type:[],tools_type:[],well_type:[] });
const masterDataGetLoadingSubject = new BehaviorSubject<boolean>(false);
const masterDataErrorSubject = new BehaviorSubject<boolean>(false);


@Injectable({
  providedIn: 'root'
})
export class DataService {
  jobs$ = JobSubject.asObservable();
  jobGetLoading$ = jobGetLoadingSubject.asObservable();
  jobGetError$ = jobGetErrorSubject.asObservable();

  masterData$ = masterDataSubject.asObservable();
  masterDataGetLoading$ = masterDataGetLoadingSubject.asObservable();
  masterDataError$ = masterDataErrorSubject.asObservable();

  constructor(private httpClient: HttpclientService) { }
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

    getMasterData() {
    masterDataGetLoadingSubject.next(true);
    this.httpClient.getMasterData().pipe(
      finalize(() => masterDataGetLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: MasterData) => {
          masterDataSubject.next(data);
          console.log(data);
          // masterDataGetLoadingSubject.next(false)
        },
        error: (error) => {
          console.error('Error fetching data', error);
          // masterDataGetLoadingSubject.next(false)
          masterDataSubject.next({ rig_master: [], service_type: [], unit_of_measure: [],customers:[],hole_section:[],survey_type:[],tools_type:[],well_type:[] });
        },
      }
    );
  }
}

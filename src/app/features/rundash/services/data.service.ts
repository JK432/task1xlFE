import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JobGDB } from '../../../shared/interfaces/job';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { HttpclientService } from './httpclient.service';
import { CustomError } from '../../../core/class/CustomErrorClass';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MasterData } from '../../../shared/interfaces/master-data';
import { SurveyInfoPost } from '../../../shared/interfaces/surveyinfoPost';
import { TieOnInfoPost } from '../../../shared/interfaces/tieOnInfoPost';
import { SurveyInfo } from '../../../shared/interfaces/surveyinfo';
import { TieOnInfo } from '../../../shared/interfaces/tieoninfo';
import { DataService as presurveyDataService } from '../../presurvey/services/data.service';


const JobSubject = new BehaviorSubject<JobGDB[]>([]);
const jobGetLoadingSubject = new BehaviorSubject<boolean>(false);
const jobGetErrorSubject = new BehaviorSubject<boolean>(false);

const masterDataSubject = new BehaviorSubject<MasterData>({ rig_master: [], service_type: [], unit_of_measure: [], customers: [], hole_section: [], survey_type: [], tools_type: [], well_type: [] });
const masterDataGetLoadingSubject = new BehaviorSubject<boolean>(false);
const masterDataErrorSubject = new BehaviorSubject<boolean>(false);

const postRunLoadingSubject = new BehaviorSubject<boolean>(false);

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

  constructor(private httpClient: HttpclientService, private presurveyDataService: presurveyDataService) { }
  getJob() {
    jobGetLoadingSubject.next(true);
    this.httpClient.getJob().pipe(
      finalize(() => jobGetLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: [JobGDB]) => {

          JobSubject.next(data.sort((a, b) => {
            return new Date(b.job_created_date).getTime() - new Date(a.job_created_date).getTime();
          }));
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
          masterDataSubject.next({ rig_master: [], service_type: [], unit_of_measure: [], customers: [], hole_section: [], survey_type: [], tools_type: [], well_type: [] });
        },
      }
    );
  }

  addRun(surveyinfo: SurveyInfoPost, tieonInfo: TieOnInfoPost) {
    return new Promise<boolean>((resolve, reject,) => {
      postRunLoadingSubject.next(true);
      this.httpClient.postRun(surveyinfo).pipe(
        finalize(() => postRunLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: SurveyInfo) => {
            let surveyinfor = <SurveyInfo>data;
            this.httpClient.postTieOn(tieonInfo).pipe().subscribe({
              next: (tieon: TieOnInfo) => {
                let tieoninfor = <TieOnInfo>tieon;
                this.presurveyDataService.updatePresurveyForRun(surveyinfor, tieoninfor)
                resolve(true);
              }
            })
            // masterDataGetLoadingSubject.next(false)
          },
          error: (error) => {
            console.error('Error Posting data', error);
            reject(false);
            // masterDataGetLoadingSubject.next(false)
          },
        }
      );
    });

  }
}

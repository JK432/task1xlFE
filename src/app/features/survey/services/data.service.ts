import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QualityAnalysis } from '../../../shared/interfaces/qa';
import { finalize } from 'rxjs/internal/operators/finalize';
import { CustomError } from '../../../core/class/CustomErrorClass';
import { SurveyIntialCalculation } from '../../../shared/interfaces/survey-intial-calculation';
import { SurveyCalculationDetails } from '../../../shared/interfaces/survey-calculation-details';


const qualityAnalysisSubject = new BehaviorSubject<QualityAnalysis>({ results: [], status: "no_data", success_count: 0, g_t_percentage: "", g_t_score: "", w_t_percentage: "", w_t_score: "" });
const qualityAnalysisPostLoadingSubject = new BehaviorSubject<boolean>(false);
const qualityAnalysisErrorSubject = new BehaviorSubject<boolean>(false);

const stationDeleteloadingSubject = new BehaviorSubject<boolean>(false);

const surveyCalculationDetailsSubject = new BehaviorSubject<SurveyCalculationDetails>({
  status: 'no_data',
  survey_details: [],
  max_inclination: 0.0,
  last_row: {
    header_id: 0,
    closure_distance: 0,
    closure_direction: 0,
    vertical_section: 0.0
  }
});
const surveyCalculationDetailsPostLoadingSubject = new BehaviorSubject<boolean>(false);
const surveyCalculationDetailsErrorSubject = new BehaviorSubject<boolean>(false);


@Injectable({
  providedIn: 'root'
})
export class DataService {
  qualityAnalysis$ = qualityAnalysisSubject.asObservable();
  qualityAnalysisPostLoading$ = qualityAnalysisPostLoadingSubject.asObservable();
  qualityAnalysisError$ = qualityAnalysisErrorSubject.asObservable();

  stationDeleteLoading$ = stationDeleteloadingSubject.asObservable();

  surveyCalculationDetails$ = surveyCalculationDetailsSubject.asObservable();
  surveyCalculationDetailsPostLoading$ = surveyCalculationDetailsPostLoadingSubject.asObservable();
  surveyCalculationDetailsError$ = surveyCalculationDetailsErrorSubject.asObservable();

  constructor(private httpClient: HttpclientService) {
  }

  postSurveyFile(formData: FormData, jobno: string, runno: string) {
    return new Promise((resolve, reject,) => {
      qualityAnalysisPostLoadingSubject.next(true);
      this.httpClient.postSurveyFile(formData, jobno, runno).pipe(
        finalize(() => qualityAnalysisPostLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: QualityAnalysis) => {
            qualityAnalysisSubject.next(data);
            console.log(data);
            resolve(true);
          },
          error: (error) => {
            console.error('Error on Survey Calculation', typeof (error.error.error) == undefined ? "" : error.error.error);
            reject();
            throw new CustomError("Error on survey calculation \n" + typeof (error.error.error) == undefined ? "" : error.error.error);
          },
        }
      );
    });
  }

  postSurveyCalculation(formData: FormData,job_number:string,run_number:string) {
    return new Promise((resolve, reject,) => {
      // qualityAnalysisPostLoadingSubject.next(true);
      this.httpClient.postCalculationDetails(formData,job_number,run_number).pipe(
        finalize(() => surveyCalculationDetailsPostLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: SurveyCalculationDetails) => {
            surveyCalculationDetailsSubject.next(data);
            console.log(data);
            resolve(true);
          },
          error: (error) => {
            console.error('Error on Survey Calculation', typeof (error.error.error) == undefined ? "" : error.error.error);
            reject();
            throw new CustomError("Error on survey calculation \n" + typeof (error.error.error) == undefined ? "" : error.error.error);

          },
        }
      );
    });
  }

  IntiateSurveyCalculation(formData: FormData,job_number:string,run_number:string) {
    return new Promise((resolve, reject,) => {
      surveyCalculationDetailsPostLoadingSubject.next(true);
      this.httpClient.postIntiateCalculation(formData,job_number,run_number).pipe(
        // finalize(() => qualityAnalysisPostLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: SurveyIntialCalculation) => {
            console.log(data);
            this.postSurveyCalculation(formData,job_number,run_number).then(() => {
              resolve(true);
            });
            // qualityAnalysisSubject.next(data);
          },
          error: (error) => {
            console.error('Error on Survey Calculation', typeof (error.error.error) == undefined ? "" : error.error.error);
            reject();
            throw new CustomError("Error on survey calculation \n" + typeof (error.error.error) == undefined ? "" : error.error.error);

          },
        }
      );
    });
  }

  getQualityAnalysis(job_number: string, runno: string) {
    return new Promise((resolve, reject,) => {
      qualityAnalysisPostLoadingSubject.next(true);
      this.httpClient.getQualityAnalysis(job_number, runno).pipe(
        finalize(() => qualityAnalysisPostLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: QualityAnalysis) => {
            qualityAnalysisSubject.next(data);
            console.log(data);
            resolve(true);
          },
          error: (error) => {
            console.error('Error on Geting Quality Analysis', typeof (error.error.error) == undefined ? "" : error.error.error);
            reject();
            throw new CustomError("Error on Geting Quality Analysis \n" + typeof (error.error.error) == undefined ? "" : error.error.error);
          },
        }
      );
    });

  }

  getSurveyCalculationDetails(job_number: string, runno: string) {
    return new Promise((resolve, reject,) => {
      surveyCalculationDetailsPostLoadingSubject.next(true);
      this.httpClient.getSurveyCalculationDetails(job_number, runno).pipe(
        finalize(() => surveyCalculationDetailsPostLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: SurveyCalculationDetails) => {
            surveyCalculationDetailsErrorSubject.next(false);
            surveyCalculationDetailsSubject.next(data);
            console.log(data);
            resolve(true);
          },
          error: (error) => {
            if(error.error){
              surveyCalculationDetailsErrorSubject.next(true);
            }
            console.log(error.error)

            // console.error('Error on Geting Survey Calculation', typeof (error.error.error) == undefined ? "" : error.error.error);
            reject(false);
            // throw new CustomError("Error on Geting Survey Calculation \n" + typeof (error.error.error) == undefined ? "" : error.error.error);
          },
        }
      );
    });

  }

  deleteQAStation(stationId: number, job_number: string,runno:string) {
    return new Promise((resolve, reject,) => {
      stationDeleteloadingSubject.next(true);
      this.httpClient.deleteSurveyStation(stationId, job_number,runno).pipe(
        finalize(() => stationDeleteloadingSubject.next(false))
      ).subscribe(
        {
          next: (data: QualityAnalysis) => {
            qualityAnalysisSubject.next(data);
            console.log(data);
            resolve(true);
          },
          error: (error) => {
            console.error('Error on Deleting Survey Station', typeof (error.error.error) == undefined ? "" : error.error.error);
            reject();
            throw new CustomError("Error on Deleting Survey Station \n" + typeof (error.error.error) == undefined ? "" : error.error.error);
          },
        }
      );
    })
  }

}

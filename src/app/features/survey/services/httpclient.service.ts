import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { QualityAnalysis } from '../../../shared/interfaces/qa';
import { SurveyIntialCalculation } from '../../../shared/interfaces/survey-intial-calculation';
import { SurveyCalculationDetails } from '../../../shared/interfaces/survey-calculation-details';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient){}

  postSurveyFile(formData:FormData,jobno:string,runno:string){
    return this.http.post<QualityAnalysis>(environment.serverAPI.ROOT +environment.serverAPI.QUALITY_ANALYSIS+jobno+'/'+runno+'/',formData)
  }
    postIntiateCalculation(formData:FormData,jobno:string,runno:string){
    return this.http.post<SurveyIntialCalculation>(environment.serverAPI.ROOT +environment.serverAPI.SURVEY_INTIAL_CALCULATION,formData)
  }
    postCalculationDetails(formData:FormData,jobno:string,runno:string){
    return this.http.post<SurveyCalculationDetails>(environment.serverAPI.ROOT +environment.serverAPI.SURVEY_CALCULATION_DETAILS,formData)
  }
    getQualityAnalysis(jobno:string,runno:string){
      return this.http.get<QualityAnalysis>(environment.serverAPI.ROOT+environment.serverAPI.QUALITY_ANALYSIS+jobno+'/'+runno+'/',)
    }

    getSurveyCalculationDetails(jobno:string,runno:string){
      return this.http.get<SurveyCalculationDetails>(environment.serverAPI.ROOT+environment.serverAPI.SURVEY_CALCULATION_DETAILS+jobno+'/'+runno+'/',)
    }
       deleteSurveyStation(stationId:number,job_number:string,runno:string){
      return this.http.delete<QualityAnalysis>(environment.serverAPI.ROOT+environment.serverAPI.QUALITY_ANALYSIS+job_number+'/'+runno+'/' + stationId+'/',)
    }
}

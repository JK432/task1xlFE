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

  postSurveyFile(formData:FormData){
    return this.http.post<QualityAnalysis>(environment.serverAPI.ROOT +environment.serverAPI.QUALITY_ANALYSIS,formData)
  }
    postIntiateCalculation(formData:FormData){
    return this.http.post<SurveyIntialCalculation>(environment.serverAPI.ROOT +environment.serverAPI.SURVEY_INTIAL_CALCULATION,formData)
  }
    postCalculationDetails(formData:FormData){
    return this.http.post<SurveyCalculationDetails>(environment.serverAPI.ROOT +environment.serverAPI.SURVEY_CALCULATION_DETAILS,formData)
  }
    getQualityAnalysis(job_number:string){
      return this.http.get<QualityAnalysis>(environment.serverAPI.ROOT+environment.serverAPI.QUALITY_ANALYSIS+job_number+'/',)
    }
       deleteSurveyStation(stationId:number,job_number:string){
      return this.http.delete<QualityAnalysis>(environment.serverAPI.ROOT+environment.serverAPI.QUALITY_ANALYSIS+job_number+'/' + stationId+'/',)
    }
}

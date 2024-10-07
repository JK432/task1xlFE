import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { JobGDB } from '../../../shared/interfaces/job';
import { MasterData } from '../../../shared/interfaces/master-data';
import { SurveyInfoPost } from '../../../shared/interfaces/surveyinfoPost';
import { TieOnInfoPost } from '../../../shared/interfaces/tieOnInfoPost';
import { SurveyInfo } from '../../../shared/interfaces/surveyinfo';
import { TieOnInfo } from '../../../shared/interfaces/tieoninfo';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient) { }
    getMasterData(){
    return this.http.get<MasterData>(environment.serverAPI.ROOT +environment.serverAPI.MASTER_DATA)
  }

  getJob(){
    return this.http.get<[JobGDB]>(environment.serverAPI.ROOT +environment.serverAPI.POST_JOB)
  }

  postRun(surveyinfo:SurveyInfoPost){
    return this.http.post<SurveyInfo>(environment.serverAPI.ROOT + environment.serverAPI.RUN_INFO,surveyinfo)
  }

  postTieOn(tieoninfo:TieOnInfoPost){
    return this.http.post<TieOnInfo>(environment.serverAPI.ROOT + environment.serverAPI.TIE_ON_INFO,tieoninfo)
  }
}

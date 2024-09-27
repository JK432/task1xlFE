import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { JobGDB } from '../../../shared/interfaces/job';
import { MasterData } from '../../../shared/interfaces/master-data';

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
}

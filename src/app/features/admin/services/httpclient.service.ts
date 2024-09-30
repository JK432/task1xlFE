import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IntialData } from '../../../shared/interfaces/intial-data';
import { FieldEmployee } from '../../../shared/interfaces/fieldemployee';
import { Job, JobGDB, JobGDBPost } from '../../../shared/interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient) {}

  getIntialData(){
    return this.http.get<IntialData>(environment.serverAPI.ROOT + environment.serverAPI.MASTER_DATA)
  }

  getFieldEmployeeData(){
    return this.http.get<[FieldEmployee]>(environment.serverAPI.FIELD_EMPLOYEE)
  }

  postJob(job:JobGDBPost){
    return this.http.post<JobGDB>(environment.serverAPI.ROOT +environment.serverAPI.POST_JOB,job)
  }

  getJob(){
    return this.http.get<[JobGDB]>(environment.serverAPI.ROOT +environment.serverAPI.POST_JOB)
  }

}

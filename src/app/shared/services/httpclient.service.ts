import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobGDB } from '../interfaces/job';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient) { }
  getJob(id:string){
      return this.http.get<JobGDB>(environment.serverAPI.ROOT +environment.serverAPI.POST_JOB+id+'/')
  }

}

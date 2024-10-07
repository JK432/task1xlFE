import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SOEEvent, SOEget, SOEpost } from '../../../shared/interfaces/soe';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient) { }

  getSOE(jobno:string) {
    return this.http.get<[SOEget]>(environment.serverAPI.ROOT + environment.serverAPI.SOE + jobno +'/')
  }
  getEvent() {
    return this.http.get<[SOEEvent]>(environment.serverAPI.ROOT + environment.serverAPI.EVENT)
  }
  postSOE(jobno: string,soe:SOEpost) {
    return this.http.post<SOEget>(environment.serverAPI.ROOT + environment.serverAPI.SOE + jobno + '/',soe)
  }
}

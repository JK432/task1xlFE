import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Progress } from '../interfaces/progress';
import { Observable } from 'rxjs';



const ProgressSubject = new BehaviorSubject<Progress>({currentjob:"",presurvey_form:false,});
const ProgressLoadingSubject = new BehaviorSubject<boolean>(false);
const ProgressErrorSubject = new BehaviorSubject<boolean>(false);


@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  ProgressLoading$:Observable<boolean> = ProgressLoadingSubject.asObservable();
  Progress$:Observable<Progress> = ProgressSubject.asObservable();
  ProgressError$:Observable<boolean> = ProgressErrorSubject.asObservable();

  runno:string = '1';

  constructor(){}

  setProgress(jobNo:string,presurvey_form:boolean){
    ProgressSubject.next({currentjob:jobNo,presurvey_form:presurvey_form});
  }






}

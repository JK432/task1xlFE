import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SOEEvent, SOEget, SOEpost } from '../../../shared/interfaces/soe';
import { finalize, Observable } from 'rxjs';
import { CustomError } from '../../../core/class/CustomErrorClass';
const SoeSubject = new BehaviorSubject<SOEget[]>([]);
const SoeGetLoadingSubject = new BehaviorSubject<boolean>(false);
const SoePostLoadingSubject = new BehaviorSubject<boolean>(false);
const SoeErrorSubject = new BehaviorSubject<boolean>(false);

const EventSubject = new BehaviorSubject<SOEEvent[]>([]);
const GetEventLoadingSubject = new BehaviorSubject<boolean>(false);

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Soe$ = SoeSubject.asObservable();
  SoeLoading$ = SoeGetLoadingSubject.asObservable();
  Event$ = EventSubject.asObservable();
  EventLoading$ = GetEventLoadingSubject.asObservable();
  SoePostLoading$ = SoePostLoadingSubject.asObservable();

  constructor(public httpClient:HttpclientService) {
  }

  // getAction(job_no: string) {
  //   SoeGetLoadingSubject.next(true);
  //   this.httpClient.getSOE(job_no).pipe(
  //     finalize(() => SoeGetLoadingSubject.next(false))
  //   ).subscribe(
  //     {
  //       next: (data: [SOEget]) => {

  //         SoeSubject.next(data.sort((a, b) => {
  //           return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //         }));
  //         console.log(data);
  //       },
  //       error: (error) => {
  //         console.error('Error on geting SOE list', error.message);
  //         throw new CustomError("Error on geting SOE list");
  //       },
  //     }
  //   );
  // }


  getSoe(job_no:string) {
    SoeGetLoadingSubject.next(true);
    this.httpClient.getSOE(job_no).pipe(
      finalize(() => SoeGetLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: [SOEget]) => {

          SoeSubject.next(data.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }));
          console.log(data);
        },
        error: (error) => {
          console.error('Error on geting SOE list', error.message);
          throw new CustomError("Error on geting SOE list");
        },
      }
    );
  }


  addSoe(job_no: string,soe_post:SOEpost) {
    return new Promise<boolean>((resolve, reject,) => {
      SoePostLoadingSubject.next(true);
      this.httpClient.postSOE(job_no,soe_post).pipe(
        finalize(() => SoePostLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: SOEget) => {
            let soes = SoeSubject.getValue();
            soes.push(data);
            SoeSubject.next(soes);
            resolve(true)
          },
          error: (error) => {
            console.error('Error Posting data', error);
            reject(false);
          },
        }
      );
    });

  }

  getEvent(){
    GetEventLoadingSubject.next(true);
    this.httpClient.getEvent().pipe(
      finalize(() => GetEventLoadingSubject.next(false))
    ).subscribe(
      {
        next: (data: [SOEEvent]) => {
          EventSubject.next(data);
          console.log(data);
        },
        error: (error) => {
          console.error('Error on geting SOE Events', error.message);
          throw new CustomError("Error on geting SOE Events");
        },
      }
    );
  }

}

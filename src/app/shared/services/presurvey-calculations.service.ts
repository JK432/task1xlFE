import { Injectable } from '@angular/core';

export interface GtWt{
  gt:number;
  wt:number;
  gtUnit:string;
  mingt:number;
  maxgt:number;
  minwt:number;
  maxwt:number;
  lat:number;
  lng:number;
}


@Injectable({
  providedIn: 'root'
})



export class PresurveyCalculationsService {

  constructor() { }

  calculateGtWt(latDeg:number,latMin:number,latSec:number,lngDeg:number,lngMin:number,lngSec:number){}


}


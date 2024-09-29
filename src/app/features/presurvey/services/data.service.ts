import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs/internal/AsyncSubject';
import { HttpclientService } from './httpclient.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { LsclientService } from '../../../shared/services/lsclient.service';
import { MasterData } from '../../../shared/interfaces/master-data';
import { IndexdbClientService } from './indexdb-client.service';
import { ServiceType } from '../../../shared/interfaces/service-type';
import { WellInfo } from '../../../shared/interfaces/well_info';
import { WellInfoPost } from '../../../shared/interfaces/well_info_post';
import { CustomError } from '../../../core/class/CustomErrorClass';
import { JobInfoPost } from '../../../shared/interfaces/jobinfopost';
import { SurveyInfoPost } from '../../../shared/interfaces/surveyinfoPost';
import { TieOnInfoPost } from '../../../shared/interfaces/tieOnInfoPost';
import { PresurveyInfo, PresurveyInfoPost } from '../../../shared/interfaces/presurveyinfo';



// FOR HTTP SERVICE SUBJECT ENDS.
// WELLIFO,WELLINFO LOADING,WELLINFO ERROR SUBJECT,

const PreSurveyDataSubject = new BehaviorSubject<PresurveyInfo>({
  job_info: {
    client_rep: "",
    job_number: "",
    well_id: "",
    well_name: "",
    arrival_date: new Date(Date.now()).toISOString()
  },
  survey_info: [],
  tie_on_information:[],
  well_info: {
    east_coorinates: 0,
    g_t: 0,
    max_gt: 0,
    max_wt: 0,
    min_gt: 0,
    min_wt: 0,
    north_coordinates: 0,
    w_t: 0,
    well_info_id: 0,
    central_meridian: 0.0,
    easting: 0.0,
    expected_well_temp: 0.0,
    expected_wellbore_inclination: 0.0,
    GLE: 0.0,
    job_number: "",
    latitude_1: 0.0,
    latitude_2: 0.0,
    latitude_3: 0.0,
    longitude_1: 0.0,
    longitude_2: 0.0,
    longitude_3: 0.0,
    northing: 0.0,
    ref_datum: "",
    ref_elivation: "",
    RKB: 0.0,
    well_id: 0.0,
    well_type: 0.0
  }
});
// const GetInfoSubject = new BehaviorSubject<boolean>(false);
const GetWellInfoErrorSubject = new BehaviorSubject<boolean>(false);
const InfoLoadingSubject = new BehaviorSubject<boolean>(false);
const PostWellInfoErrorSubject = new BehaviorSubject<boolean>(false);
// HTTP SERVICE SUBJECTS END

// FOR ALL DATA POST
// const AllInfoSubject = new BehaviorSubject<WellInfo[]>([]);



const serviceTypeSubject = new BehaviorSubject<ServiceType[]>([]);
const customerSubject = new BehaviorSubject<string[]>([]);
const unitOfMeasureSubject = new BehaviorSubject<string[]>([]);
const rigNoSubject = new BehaviorSubject<string[]>([]);
const refElevationSubject = new BehaviorSubject<string[]>([]);
const refDatumSubject = new BehaviorSubject<string[]>([]);
const wellTypeSubject = new BehaviorSubject<string[]>([]);

const runNumberSubject = new BehaviorSubject<string>('');
const typeOfToolsSubject = new BehaviorSubject<string[]>([]);
const surveyTypeSubject = new BehaviorSubject<string[]>([]);
const holeSectionSubject = new BehaviorSubject<string[]>([]);
const surveyRunInSubject = new BehaviorSubject<string[]>([]);
const minimumIdSubject = new BehaviorSubject<string[]>([]);
const northReferenceSubject = new BehaviorSubject<string[]>([]);
const surveyCalculationMethodsSubject = new BehaviorSubject<string>('');
const geodeticSystemSubject = new BehaviorSubject<string>('');
const mapZoneSubject = new BehaviorSubject<string>('');
const geodeticDatumSubject = new BehaviorSubject<string>('');
// const startDepthUnitsSubject = new BehaviorSubject<string[]>([]);
// const tagDepthUnitsSubject = new BehaviorSubject<string[]>([]);
// const proposalDirectionUnitsSubject = new BehaviorSubject<string[]>([]);



@Injectable({
  providedIn: 'root'
})
export class DataService {
  PresurveyInfo$ = PreSurveyDataSubject.asObservable();
  Infoloading$ = InfoLoadingSubject.asObservable();

  latUnits: string[] = ['N', 'S'];
  lngUnits: string[] = ['E', 'W'];
  northingUnits: string[] = ['mN', 'mS'];
  eastingUnits: string[] = ['mE', 'mW'];
  expectedWellTempUnits: string[] = ['C'];
  expectedWellInclinationUnits: string[] = ['°'];
  centralMeridianUnits: string[] = ['E'];
  gleUnits: string[] = ['m'];
  rkbUnits: string[] = ['m'];

  startDepthUnits: string[] = ['m'];
  tagDepthUnits: string[] = ['m'];
  proposalDirectionUnits: string[] = ['°'];

  meterFeetUnits: string[] = ['m', 'ft'];
  inclinationUnits: string[] = ['°'];

  constructor(private httpclientservice: HttpclientService, private localStorage: LsclientService, private indexDBService: IndexdbClientService, private httpClientService: HttpclientService) {

    // this.syncMasterData();

    // CALL LOCAL STORAGE TO PUT DATA.
    // CALL A FUNCTION TO GET DATA FROM HTTP CLIENT SERVICE AND PUSH TO THE SUBJECT.
    // UPDATE THE RUN
    // serviceTypeSubject.next(this.indexDBService.service_types$.);

    unitOfMeasureSubject.next(['m', 'ft']);

    rigNoSubject.next(["26", "38", "80", "81", "126", "101", "102", "103", "1", "104",
      "138", "116", "32", "53", "96", "97", "113", "43", "31", "58",
      "44", "59", "129", "72", "62", "115", "117", "140", "118", "95",
      "139", "99", "49", "10", "50", "62", "98", "19", "58", "83",
      "84", "114", "45", "63", "64", "74", "111", "110", "122", "123",
      "75", "76", "306", "128", "127", "142", "88", "82", "144", "81",
      "Rigless 80"]);


    refElevationSubject.next(['Mean Sea Level(MSL)']);

    refDatumSubject.next(['RKB/DFE']);

    wellTypeSubject.next(['Vertical', 'Deviated']);



    typeOfToolsSubject.next([
      'HA SERIES',
      'HASS 500 SERIES',
      'HASS 11000 SERIES',
    ]);

    surveyTypeSubject.next([
      'Drop'
    ]);

    holeSectionSubject.next([
      "4 1/2 \"",
      "7 \"",
      "8 1/2 \"",
      "9 5/8 \"",
      "12 1/4 \"",
      "13 3/8 \"",
      "16 \"",
      "18 \"",
      "24 \"",
      "32 \"",
      "36 \"",
      "40 \""
    ]);

    surveyRunInSubject.next([
      "7\" Casing",
      "9 5/8\" Casing",
      "13 3/8\" Casing",
      "18 5/8\" Casing",
      "20\" Casing",
      "4\" Drillpipe",
      "4 1/2\" Drillpipe",
      "5\" Drillpipe"
    ]);

    minimumIdSubject.next([
      "2\"",
      "5 1/4\"",
      "8\"",
      "12 1/8\"",
      "17 1/2\"",
      "18 1/4\""
    ]);

    northReferenceSubject.next(['geodeticDatumSubject']);

    surveyCalculationMethodsSubject.next('Minimum Curvature');

    geodeticSystemSubject.next('Universal Transverse Mercator');

    mapZoneSubject.next('Zone 40N (54E to 60E)');

    geodeticDatumSubject.next('PSD 93');

    this.getRunNumber();

  }

  // syncMasterData(){
  //   this.indexDBService.removeAllServiceType()
  // }

  getRunNumber() {
    const no = this.localStorage.getItem('RUN_NO')
    let runNo: number = 0;
    if (no && !isNaN(no)) {
      runNo = Number(no);
    } else { }
    runNumberSubject.next(String(runNo));
  }


  // WELLIFO GET HTTP REQUEST RESPONSE FUNCTION.

  getInfo(id: string) {
    return new Promise((resolve, reject,) => {
      InfoLoadingSubject.next(true);
      this.httpClientService.getAllInfo(id).pipe(
        finalize(() => InfoLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: PresurveyInfo) => {
            PreSurveyDataSubject.next(data);
            resolve(true)
          },
          error: (error) => {
            reject(false);
            console.error('Error fetching data', error);
          },
        }
      );
    });
  }

  postInfo(presurveyinfo: PresurveyInfoPost) {
    return new Promise((resolve, reject,) => {
      InfoLoadingSubject.next(true);
      this.httpClientService.postAllInfo(presurveyinfo).pipe(
        finalize(() => InfoLoadingSubject.next(false))
      ).subscribe(
        {
          next: (data: PresurveyInfo) => {
            PreSurveyDataSubject.next(data);
            resolve(true);
          },
          error: (error) => {
            throw new CustomError("Error on posting job data");
            reject();
          },
        }
      );
    });
  }




  getRunNumberSubject() {
    return runNumberSubject.asObservable();
  }

  getServiceSubject() {
    return this.indexDBService.service_types$;
  }

  getCustomerSubject() {
    return customerSubject.asObservable();
  }

  getUnitOfMeasureSubject() {
    return unitOfMeasureSubject.asObservable();
  }

  getRigNoSubject() {
    return rigNoSubject.asObservable();
  }

  getRefElevationSubject() {
    return refElevationSubject.asObservable();
  }

  getRefDatumSubject() {
    return refDatumSubject.asObservable();
  }

  getWellTypeSubject() {
    return wellTypeSubject.asObservable();
  }

  getTypeOfToolsSubject() {
    return typeOfToolsSubject.asObservable();
  }

  getSurveyTypeSubject() {
    return surveyTypeSubject.asObservable();
  }

  getHoleSectionSubject() {
    return holeSectionSubject.asObservable();
  }

  getSurveyRunInSubject() {
    return surveyRunInSubject.asObservable();
  }

  getMinimumIdSubject() {
    return minimumIdSubject.asObservable();
  }

  getNorthReferenceSubject() {
    return northReferenceSubject.asObservable();
  }

  getSurveyCalculationMethodsSubject() {
    return surveyCalculationMethodsSubject.asObservable();
  }

  getGeodeticSystemSubject() {
    return geodeticSystemSubject.asObservable();
  }

  getMapZoneSubject() {
    return mapZoneSubject.asObservable();
  }

  getGeodeticDatumSubject() {
    return geodeticDatumSubject.asObservable();
  }



}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: true,
  firebase: {
    apiKey: "***************************************",
    authDomain: "************************",
    projectId: "***********************************",
    storageBucket: "************************",
    messagingSenderId: "*********************",
    appId: "*******************************************",
    measurementId: "*********************"
  },

  serverAPI: {
    ROOT: "http://3.28.183.230:8000/api/",
    AUTHENTICATION: "http://localhost:4200/assets/files/intialdata.json",
    INTIALDATA: "http://localhost:4200/assets/files/intialdata.json",
    FIELD_EMPLOYEE: "http://localhost:4200/assets/files/fieldemployee.json",
    POST_JOB: "create-job/",
    MASTER_DATA: "master-data/",
    WELL_INFO: "well-info/",
    QUALITY_ANALYSIS: "upload-excel/",
    SURVEY_INTIAL_CALCULATION: "surveycalculation/",
    SURVEY_CALCULATION_DETAILS: "surveycalculationdetails/",
    CREATE_JOB_DETAILS: "create-job-detail/",
    GET_JOB_DETAILS: "job-data/",
    COST_CENTER: "asset-master/",
    VEHICLE_DATA: "vehicle-data/",
    EMPLOYEE_DATA: "employee/",
    GYRO_DATA: "gyro-data/",
    JOB_ASSETS: "get-jobassets/",
    RUN_INFO: "surveyinfo/",
    TIE_ON_INFO: "tieoninfo/",
    SOE: "soe/",
    EVENT: "asset/",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

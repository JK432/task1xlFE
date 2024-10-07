import{a as d}from"./chunk-NY5GKKF2.js";import{a as i}from"./chunk-5DENEAAF.js";import{M as h,Nb as x,P as b,c as l,w as c}from"./chunk-U53D5TZM.js";var g=(()=>{let s=class s{constructor(e){this.http=e}postSurveyFile(e,r,n){return this.http.post(i.serverAPI.ROOT+i.serverAPI.QUALITY_ANALYSIS+r+"/"+n+"/",e)}postIntiateCalculation(e,r,n){return this.http.post(i.serverAPI.ROOT+i.serverAPI.SURVEY_INTIAL_CALCULATION,e)}postCalculationDetails(e,r,n){return this.http.post(i.serverAPI.ROOT+i.serverAPI.SURVEY_CALCULATION_DETAILS,e)}getQualityAnalysis(e,r){return this.http.get(i.serverAPI.ROOT+i.serverAPI.QUALITY_ANALYSIS+e+"/"+r+"/")}getSurveyCalculationDetails(e,r){return this.http.get(i.serverAPI.ROOT+i.serverAPI.SURVEY_CALCULATION_DETAILS+e+"/"+r+"/")}deleteSurveyStation(e,r,n){return this.http.delete(i.serverAPI.ROOT+i.serverAPI.QUALITY_ANALYSIS+r+"/"+n+"/"+e+"/")}};s.\u0275fac=function(r){return new(r||s)(b(x))},s.\u0275prov=h({token:s,factory:s.\u0275fac,providedIn:"root"});let u=s;return u})();var p=new l({results:[],status:"no_data",success_count:0,g_t_percentage:"",g_t_score:"",w_t_percentage:"",w_t_score:""}),f=new l(!1),A=new l(!1),m=new l(!1),y=new l({status:"no_data",survey_details:[],max_inclination:0,last_row:{header_id:0,closure_distance:0,closure_direction:0,vertical_section:0}}),v=new l(!1),_=new l(!1),D=(()=>{let s=class s{constructor(e){this.httpClient=e,this.qualityAnalysis$=p.asObservable(),this.qualityAnalysisPostLoading$=f.asObservable(),this.qualityAnalysisError$=A.asObservable(),this.stationDeleteLoading$=m.asObservable(),this.surveyCalculationDetails$=y.asObservable(),this.surveyCalculationDetailsPostLoading$=v.asObservable(),this.surveyCalculationDetailsError$=_.asObservable()}postSurveyFile(e,r,n){return new Promise((a,o)=>{f.next(!0),this.httpClient.postSurveyFile(e,r,n).pipe(c(()=>f.next(!1))).subscribe({next:t=>{p.next(t),console.log(t),a(!0)},error:t=>{throw p.next({status:"no_data",g_t_percentage:"",g_t_score:"",results:[],success_count:0,w_t_percentage:"",w_t_score:""}),console.error("Error on Survey Calculation",typeof t.error.error==null?"":t.error.error),o(),new d(`Error on survey calculation 
`+typeof t.error.error==null?"":t.error.error)}})})}postSurveyCalculation(e,r,n){return new Promise((a,o)=>{this.httpClient.postCalculationDetails(e,r,n).pipe(c(()=>v.next(!1))).subscribe({next:t=>{y.next(t),console.log(t),a(!0)},error:t=>{throw y.next({last_row:{closure_direction:0,closure_distance:0,header_id:0,vertical_section:0},max_inclination:0,status:"no_data",survey_details:[]}),console.error("Error on Survey Calculation",typeof t.error.error==null?"":t.error.error),o(),new d(`Error on survey calculation 
`+typeof t.error.error==null?"":t.error.error)}})})}IntiateSurveyCalculation(e,r,n){return new Promise((a,o)=>{v.next(!0),this.httpClient.postIntiateCalculation(e,r,n).pipe().subscribe({next:t=>{console.log(t),this.postSurveyCalculation(e,r,n).then(()=>{a(!0)})},error:t=>{throw console.error("Error on Survey Calculation",typeof t.error.error==null?"":t.error.error),o(),new d(`Error on survey calculation 
`+typeof t.error.error==null?"":t.error.error)}})})}getQualityAnalysis(e,r){return new Promise((n,a)=>{f.next(!0),this.httpClient.getQualityAnalysis(e,r).pipe(c(()=>f.next(!1))).subscribe({next:o=>{p.next(o),console.log(o),n(!0)},error:o=>{p.next({status:"no_data",g_t_percentage:"",g_t_score:"",results:[],success_count:0,w_t_percentage:"",w_t_score:""}),console.error("Error on Geting Quality Analysis",typeof o.error.error==null?"":o.error.error),a(!1)}})})}getSurveyCalculationDetails(e,r){return new Promise((n,a)=>{v.next(!0),this.httpClient.getSurveyCalculationDetails(e,r).pipe(c(()=>v.next(!1))).subscribe({next:o=>{_.next(!1),y.next(o),console.log(o),n(!0)},error:o=>{y.next({last_row:{closure_direction:0,closure_distance:0,header_id:0,vertical_section:0},max_inclination:0,status:"no_data",survey_details:[]}),o.error&&_.next(!0),console.log(o.error),a(!1)}})})}deleteQAStation(e,r,n){return new Promise((a,o)=>{m.next(!0),this.httpClient.deleteSurveyStation(e,r,n).pipe(c(()=>m.next(!1))).subscribe({next:t=>{p.next(t),console.log(t),a(!0)},error:t=>{throw console.error("Error on Deleting Survey Station",typeof t.error.error==null?"":t.error.error),o(),new d(`Error on Deleting Survey Station 
`+typeof t.error.error==null?"":t.error.error)}})})}};s.\u0275fac=function(r){return new(r||s)(b(g))},s.\u0275prov=h({token:s,factory:s.\u0275fac,providedIn:"root"});let u=s;return u})();export{D as a};

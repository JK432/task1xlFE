import{a as r}from"./chunk-O4YZWSNL.js";import{E as e,H as p,Q as l}from"./chunk-5OVQF42F.js";import{aa as s,fa as o,g as d}from"./chunk-RBD7S4WU.js";var m=new d(new p({})),i=new Map;i.set("Job Start Info",1);i.set("Job Info",2);i.set("Well Info",3);i.set("Run Info",4);i.set("Tie-On Info",5);var N=(()=>{let t=class t{constructor(n,a){this.formBuilder=n,this.validate=a,this.startJobForm={order:1,formName:"Job Start Info"},this.jobInfoForm={order:2,formName:"Job Info"},this.wellInfoForm={order:3,formName:"Well Info"},this.surveyInfoForm={order:4,formName:"Run Info"},this.tieOnInfoForm={order:5,formName:"Tie-On Info"},this.presurveyForm=this.formBuilder.group({wellInfoForm:this.formBuilder.group({clientRepresentative:["",[e.required,e.pattern(".*\\S.*")]],wellName:["",[e.required,e.pattern(".*\\S.*")]],wellId:["",[e.required,e.pattern(".*\\S.*")]],latDeg:["",[e.required,r.isNumber(),r.isLatitude(),e.pattern(".*\\S.*")]],latMin:["",[e.required,r.isNumber(),r.isMinSec(),e.pattern(".*\\S.*")]],latSec:["",[e.required,r.isNumber(),r.isMinSec(),e.pattern(".*\\S.*")]],latUnit:["",e.required],lngDeg:["",[e.required,r.isLongitude(),e.pattern(".*\\S.*")]],lngMin:["",[e.required,r.isMinSec(),e.pattern(".*\\S.*")]],lngSec:["",[e.required,r.isMinSec(),e.pattern(".*\\S.*")]],lngUnit:["",e.required],northing:["",[e.required,r.isNorthing(),e.pattern(".*\\S.*")]],northingUnit:["",e.required],easting:["",[e.required,r.isEasting(),e.pattern(".*\\S.*")]],eastingUnit:["",e.required],refElevation:["",[e.required,e.pattern(".*\\S.*")]],refDatum:["",e.required],wellType:[-1,e.required],expectedWellTemp:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],expectedWellTempUnit:["",e.required],expectedWellInclination:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],expectedWellInclinationUnit:["",e.required],centralMeridian:["",[e.required,r.isCentralMeridian(),e.pattern(".*\\S.*")]],centralMeridianUnit:["",e.required],gle:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],gleUnit:["",e.required],rkb:["",[e.required,r.isNumber(),e.pattern(".*\\S.*"),r.isBetweenTen()]],rkbUnit:["",e.required]},{validators:[r.isVertical(),r.isDeviated()]}),surveyInfoForm:this.formBuilder.group({runName:["",[e.required,e.pattern(".*\\S.*")]],runNo:[{value:"",disabled:!0},[e.required,r.isNumber(),e.pattern(".*\\S.*")]],typeOfTool:["",[e.required,e.pattern(".*\\S.*")]],surveyType:[-1,[e.required,e.pattern(".*\\S.*")]],holeSection:["",[e.required,e.pattern(".*\\S.*")]],surveyRunIn:["",[e.required,e.pattern(".*\\S.*")]],minimumId:[{value:"",disabled:!0},[e.required,e.pattern(".*\\S.*")]],northReference:["",[e.required,e.pattern(".*\\S.*")]],surveyCalculationMethods:[{value:"",disabled:!0},[e.required,e.pattern(".*\\S.*")]],geodeticSystem:[{value:"",disabled:!0},[e.required,e.pattern(".*\\S.*")]],geodeticDatum:[{value:"",disabled:!0},[e.required,e.pattern(".*\\S.*")]],mapZone:[{value:"",disabled:!0},[e.required,e.pattern(".*\\S.*")]],startDepth:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],startDepthUnit:["",e.required],tagDepth:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],tagDepthUnit:["",e.required],proposalDirection:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],proposalDirectionUnit:["",e.required]}),tieOnInfoForm:this.formBuilder.group({measuredDepth:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],measuredDepthUnit:["",[e.required]],trueVerticalDepth:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],trueVerticalDepthUnit:["",[e.required]],inclination:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],inclinationUnit:["",[e.required]],latitude:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],latitudeUnit:["",[e.required]],azimuth:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],azimuthUnit:["",[e.required]],departure:["",[e.required,r.isNumber(),e.pattern(".*\\S.*")]],departureUnit:["",[e.required]]})})}updatePreSurvayForm(n){m.next(n)}getFormSubject(){return m.asObservable()}};t.\u0275fac=function(a){return new(a||t)(o(l),o(r))},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let u=t;return u})();export{N as a};

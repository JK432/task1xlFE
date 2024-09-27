import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncSubject } from 'rxjs/internal/AsyncSubject';
import { ValidationService } from '../../../shared/services/validation.service';
import { Formpage } from '../../../shared/interfaces/formpage';
import { ServiceType } from '../../../shared/interfaces/service-type';



const preSurveySubject = new BehaviorSubject<FormGroup>(new FormGroup({}));

const FormOrder: Map<string, number> = new Map<string, number>();

FormOrder.set('Job Start Info', 1);
FormOrder.set('Job Info', 2);
FormOrder.set('Well Info', 3);
FormOrder.set('Run Info', 4);
FormOrder.set('Tie-On Info', 5);


@Injectable({
  providedIn: 'root'
})


export class FormsService {
  startJobForm: Formpage = {
    order: 1,
    formName: 'Job Start Info'
  };
  jobInfoForm: Formpage = {
    order: 2,
    formName: 'Job Info'
  };
  wellInfoForm: Formpage = {
    order: 3,
    formName: 'Well Info'
  };
  surveyInfoForm: Formpage = {
    order: 4,
    formName: 'Run Info'
  };
  tieOnInfoForm: Formpage = {
    order: 5,
    formName: 'Tie-On Info'
  };



  presurveyForm: FormGroup;


  // startJobForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private validate: ValidationService) {


    // PRESURVEY FROM GROUP
    this.presurveyForm = this.formBuilder.group({
      // startJobForm: this.formBuilder.group({
      //   serviceType: [-1, [Validators.required]],
      //   jobNumber: ['', [Validators.required, Validators.pattern('^OM\\d+$'),]],
      //   customer: [-1, Validators.required],
      //   unitOfMeasure: [-1, Validators.required],
      //   estimatedDate: ["", [Validators.required, ValidationService.isDateFuture()]],
      // }),

      // jobInfoForm: this.formBuilder.group({
      //   clientRepresentative: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
      //   rigNo: [-1, [Validators.required,]],
      //   wellName: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
      //   wellId: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
      //   location: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
      // }),

      wellInfoForm: this.formBuilder.group({
        clientRepresentative: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        wellName: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        wellId: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        latDeg: ['', [Validators.required, ValidationService.isNumber(), ValidationService.isLatitude(), Validators.pattern('.*\\S.*')]],
        latMin: ['', [Validators.required, ValidationService.isNumber(), ValidationService.isMinSec(), Validators.pattern('.*\\S.*')]],
        latSec: ['', [Validators.required, ValidationService.isNumber(), ValidationService.isMinSec(), Validators.pattern('.*\\S.*')]],
        latUnit: ['', Validators.required,],

        lngDeg: ['', [Validators.required, ValidationService.isLongitude(), Validators.pattern('.*\\S.*')]],
        lngMin: ['', [Validators.required, ValidationService.isMinSec(), Validators.pattern('.*\\S.*')]],
        lngSec: ['', [Validators.required, ValidationService.isMinSec(), Validators.pattern('.*\\S.*')]],
        lngUnit: ['', Validators.required,],

        northing: ['', [Validators.required, ValidationService.isNorthing(), Validators.pattern('.*\\S.*')]],
        northingUnit: ['', Validators.required,],

        easting: ['', [Validators.required, ValidationService.isEasting(), Validators.pattern('.*\\S.*')]],
        eastingUnit: ['', Validators.required,],

        refElevation: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        refDatum: ['', Validators.required],

        wellType: [-1, Validators.required],

        expectedWellTemp: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        expectedWellTempUnit: ['', Validators.required],

        expectedWellInclination: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        expectedWellInclinationUnit: ['', Validators.required],

        centralMeridian: ['', [Validators.required, ValidationService.isCentralMeridian(), Validators.pattern('.*\\S.*')]],
        centralMeridianUnit: ['', Validators.required],

        gle: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        gleUnit: ['', Validators.required],

        rkb: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*'),ValidationService.isBetweenTen()]],
        rkbUnit: ['', Validators.required],
      }, {
        validators: [ValidationService.isVertical(), ValidationService.isDeviated()],
      }),

      surveyInfoForm: this.formBuilder.group({
        runName: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        runNo: [{ value: '', disabled: true }, [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],

        typeOfTool: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        surveyType: [-1, [Validators.required, Validators.pattern('.*\\S.*')]],
        holeSection: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        surveyRunIn: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        minimumId: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('.*\\S.*')]],

        northReference: ['', [Validators.required, Validators.pattern('.*\\S.*')]],
        surveyCalculationMethods: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('.*\\S.*')]],
        geodeticSystem: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('.*\\S.*')]],
        geodeticDatum: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('.*\\S.*')]],
        mapZone: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('.*\\S.*')]],

        startDepth: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        startDepthUnit: ['', Validators.required],

        tagDepth: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        tagDepthUnit: ['', Validators.required],

        proposalDirection: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        proposalDirectionUnit: ['', Validators.required],
      }),

      tieOnInfoForm: this.formBuilder.group({
        measuredDepth: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        measuredDepthUnit: ['', [Validators.required,]],

        trueVerticalDepth: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        trueVerticalDepthUnit: ['', [Validators.required,]],

        inclination: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        inclinationUnit: ['', [Validators.required,]],

        latitude: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        latitudeUnit: ['', [Validators.required,]],

        azimuth: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        azimuthUnit: ['', [Validators.required,]],

        departure: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        departureUnit: ['', [Validators.required,]],
      }),
    })
  }

  // FUNCTION TO BE CALLED TO UPDATE THE JOBSTARTFORM.
  updatePreSurvayForm(presurveyForm: FormGroup) {
    preSurveySubject.next(presurveyForm);
  }

  getFormSubject() {
    return preSurveySubject.asObservable();
  }

}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

const addRunFormSubject = new BehaviorSubject<FormGroup>(new FormGroup({}));

@Injectable({
  providedIn: 'root'
})

export class FormService {
  addRunForm: FormGroup;
  editSurveyForm: FormGroup;
  editWellForm: FormGroup;
  editTieOnForm: FormGroup;
  editAssetForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private validate: ValidationService) {
    this.addRunForm = this.formBuilder.group({

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
    });

    this.editWellForm = this.formBuilder.group({
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

      rkb: ['', [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*'), ValidationService.isBetweenTen()]],
      rkbUnit: ['', Validators.required],
    }, {
      validators: [ValidationService.isVertical(), ValidationService.isDeviated()],
    });

    this.editSurveyForm = this.formBuilder.group({
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
    });

    this.editTieOnForm = this.formBuilder.group({
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
    });

    this.editAssetForm = this.formBuilder.group({
        cost_center: [-1, [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        gyro_data: [-1, [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],

        vehicle: [-1, [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],

        emp_1: [-1, [Validators.required, ValidationService.isNumber(), Validators.pattern('.*\\S.*')]],
        emp_2: [null, [ValidationService.isNullOrNumber(), Validators.pattern('.*\\S.*')]],
        emp_3: [null, [ValidationService.isNullOrNumber(), Validators.pattern('.*\\S.*')]],
        emp_4: [null, [ValidationService.isNullOrNumber(), Validators.pattern('.*\\S.*')]],
        emp_5: [null, [ValidationService.isNullOrNumber(), Validators.pattern('.*\\S.*')]],
        emp_6: [null, [ValidationService.isNullOrNumber(), Validators.pattern('.*\\S.*')]],
        emp_7: [null, [ValidationService.isNullOrNumber(), Validators.pattern('.*\\S.*')]],
    });


}

  updatePreSurvayForm(addRunForm: FormGroup) {
    addRunFormSubject.next(addRunForm);
  }



}

import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static isNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }
      var inValid = /\s/;


      const isSpace = inValid.test(value);

      const isNumber = !isNaN(parseFloat(value)) && isFinite(Number(value))  && !isSpace;

      return !isNumber ? { isNumber: true } : null;
    }
  }

  static isLatitude(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if the value is a finite number and within the range of -90 to 90
      const isLatitude = isFinite(value) && Math.abs(value) <= 90;

      return !isLatitude ? { isLatitude: true } : null;
    };
  }

  static isLongitude(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if the value is a finite number and within the range of -180 to 180
      const isLongitude = isFinite(value) && Math.abs(value) <= 180;

      return !isLongitude ? { isLongitude: true } : null;
    };
  }

  static isMinSec(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;


      const isMinSec = isFinite(value) && value <= 60 && value >= 0;

      return !isMinSec ? { isMinSec: true } : null;
    };
  }

  static isEasting(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const isEasting = isFinite(value) && value <= 900000 && value >= 100000;

      return !isEasting ? { isEasting: true } : null;
    };
  }

  static isNorthing(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const isNorthing = isFinite(value) && value <= 10000000 && value >= 0;

      return !isNorthing ? { isNorthing: true } : null;
    };
  }

  static isCentralMeridian(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const isCentralMeridian = isFinite(value) && value <= 177 && value >= -177;

      return !isCentralMeridian ? { isCentralMeridian: true } : null;
    };
  }

    static isBetweenTen(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const isBetweenTen = isFinite(value) && value < 10 && value > -10;

      return !isBetweenTen ? { isBetweenTen: true } : null;
    };
  }

static isDateFuture():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const inputDate = new Date(value);
      const today = new Date();
      const isDate = inputDate instanceof Date;
      let isFutureOrToday = false;

      if(isDate){
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      isFutureOrToday = inputDate >= today;
      }
      const isDateFuture = isDate && isFutureOrToday
      return !isDateFuture ? { isDateFuture: true } : null;
    };
  }

  static isIntialValue(intial:number):ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isIntialValue = intial != value
      return !isIntialValue ? { isIntialValue: true } : null;
    };
  }

static isVertical(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }
    const formGroup = control as FormGroup;
    const expectedWellInclination = formGroup.get('expectedWellInclination');
    const wellType = formGroup.get('wellType');
    if (!expectedWellInclination || !wellType) {
      return null;
    }
    const wellTypeValue = wellType.value;
    const expectedWellInclinationValue = expectedWellInclination.value;
    const isNumber = !isNaN(parseFloat(expectedWellInclinationValue)) && isFinite(Number(expectedWellInclinationValue));

    if (isNumber && Number(expectedWellInclinationValue) > 12) {
      if(wellTypeValue == 'Vertical'){
        console.log("true");
        return { isVertical: true };
      }
    }
    return null;
  };
}

static isDeviated(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }
    const formGroup = control as FormGroup;
    const expectedWellInclination = formGroup.get('expectedWellInclination');
    const wellType = formGroup.get('wellType');
    if (!expectedWellInclination || !wellType) {
      return null;
    }
    const wellTypeValue = wellType.value;
    const expectedWellInclinationValue = expectedWellInclination.value;
    const isNumber = !isNaN(parseFloat(expectedWellInclinationValue)) && isFinite(Number(expectedWellInclinationValue));

    if (isNumber && Number(expectedWellInclinationValue) < 12) {
      if(wellTypeValue == 'Deviated'){
        console.log("true");
        return { isDeviated: true };
      }
    }
    return null;
  };
}


}

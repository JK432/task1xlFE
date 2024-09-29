import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injector, Injectable } from '@angular/core';
import { CustomError } from '../class/CustomErrorClass';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {

  }
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  handleError(error: Error | HttpErrorResponse) {
    console.error(error);
    // console.log(`Error ${error}`);
    if (error instanceof HttpErrorResponse) {
      console.log(error);
    }
    else if (error instanceof CustomError) {
      this.toastrService.error(error.message, 'Error', { positionClass: 'toast-top-center' });
    }
    else {
      // this.toastrService.error("Something went worng", 'Error', { positionClass: 'toast-top-center' });
    }
  }
}

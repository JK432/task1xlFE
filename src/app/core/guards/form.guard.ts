import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProgressService } from '../../shared/services/progress.service';
import { Progress } from '../../shared/interfaces/progress';
import { take } from 'rxjs/internal/operators/take';
import { ToastrService } from 'ngx-toastr';

export const formGuard: CanActivateFn = (route, state) => {
const toster = inject(ToastrService);
const jobNo = route.paramMap.get('jobNo');
const router = inject(Router);
const progressService = inject(ProgressService);
let progress:Progress={currentjob:"",presurvey_form:false}
progressService.Progress$.pipe(take(1)).subscribe((value:Progress )=> {
  progress = value;
  console.log('Current value:', value);
});

if(progress.presurvey_form){
  return true;
}else{
  // toster.warning(`Fill the form`, 'Warning', { positionClass: 'toast-top-center' });
  // router.navigate(['/presurvey/form/',jobNo],)
  // return false;
  return true;
}
};

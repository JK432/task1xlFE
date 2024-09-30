import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProgressService } from '../../shared/services/progress.service';
import { Progress } from '../../shared/interfaces/progress';
import { take } from 'rxjs/internal/operators/take';

export const jobGuard: CanActivateFn = (route, state) => {

const jobNo = route.paramMap.get('jobNo');
const router = inject(Router);

const progressService = inject(ProgressService);
let progress:Progress={currentjob:"",presurvey_form:false}
progressService.Progress$.pipe(take(1)).subscribe((value:Progress )=> {
  progress = value;
  console.log('Current value:', value);
});

if(jobNo==progress.currentjob){
  return true;
}else{
  // router.navigate(['/dash'])
  // return false;
  return true;
}
};

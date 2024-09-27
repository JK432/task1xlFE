import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LsclientService } from '../../../../shared/services/lsclient.service';

@Component({
  selector: 'app-instruction',
  standalone: true,
  imports: [SharedModule,FormsModule],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.scss'
})
export class InstructionComponent {
  constructor(private toastr: ToastrService,private router: Router, private localStorage:LsclientService){}
  isChecked = false;

  startjob(){
    if(this.isChecked){
      this.localStorage.setItem('RUN_NO',1);
      // CALL SERVICES FOR START JOB
      this.router.navigate(['/presurvey/']);

    }else{
      this.toastr.warning('Confirm the CheckBox', 'Check the Box',{positionClass: 'toast-bottom-right' });
    }
  }

}

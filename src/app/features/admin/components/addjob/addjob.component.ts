import { Component } from '@angular/core';
import { SwitcherService } from '../../services/switcher.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { JobdetailsformComponent } from '../jobdetailsform/jobdetailsform.component';
import { AssetdetailsformComponent } from '../assetdetailsform/assetdetailsform.component';
import { AssigndetailsformComponent } from '../assigndetailsform/assigndetailsform.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-addjob',
  standalone: true,
  imports: [SharedModule,CommonModule,JobdetailsformComponent,AssetdetailsformComponent,AssigndetailsformComponent],
  templateUrl: './addjob.component.html',
  styleUrl: './addjob.component.scss'
})
export class AddjobComponent {
    progress:Map<string,boolean> = new Map<string,boolean>([
    ['Job Info', false],
    ['Assign Info', false],
    ['Asset Info', false],
  ]);

  currentPage:string='Job Info';
  progressSubject:Observable<Map<string, boolean>>;
  pageSubject:Observable<string>;

  constructor(private switcher:SwitcherService,private data:DataService){
    this.data.getIntialData();
    this.data.getFieldEmployee();
    this.progressSubject = this.switcher.getProgress();
    this.pageSubject = this.switcher.getPageSubject();

    this.progressSubject.subscribe((progress)=>{
      this.progress = progress;
    })

    this.pageSubject.subscribe((currentPage)=>{
      this.currentPage = currentPage;
      console.log(this.currentPage);
    })
  }

  changePage(prev:string,next:string){
    this.switcher.swicthPage(prev,next);
    console.log(next);
  }

  // ngOnDestroy(): void {
  //   this.pageSubject.
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.

  // }

}

import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StartjobformComponent } from '../startjobform/startjobform.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { SwitcherService } from '../../services/switcher.service';
import { CommonModule } from '@angular/common';
import { JobinformationformComponent } from '../jobinformationform/jobinformationform.component';
import { WellinformationformComponent } from '../wellinformationform/wellinformationform.component';
import { SurveyinformationformComponent } from "../surveyinformationform/surveyinformationform.component";
import { TieoninformationComponent } from "../tieoninformation/tieoninformation.component";
import { DataService } from '../../../rundash/services/data.service';
import { JobDataComponent } from '../../../../shared/components/job-data/job-data.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presurvey',
  standalone: true,
  imports: [SharedModule, StartjobformComponent, CommonModule, JobinformationformComponent, WellinformationformComponent, SurveyinformationformComponent, TieoninformationComponent,JobDataComponent],
  templateUrl: './presurvey.component.html',
  styleUrl: './presurvey.component.scss'
})
export class PresurveyComponent implements OnInit{
  private sub: Subscription[];
  progress:Map<string,boolean> = new Map<string,boolean>([
    // ['Job Start Info', false],
    // ['Job Info', false],
    ['Job and Well Info', false],
    ['Run Info', false],
    ['Tie-On Info', false],
  ]);
  currentPage:string='Job and Well Info';
  id:string;

  constructor(private formBuilder: FormBuilder, private formServices: FormsService, private switcher:SwitcherService,public rundashDataService:DataService,private router: Router,private route: ActivatedRoute) {
    this.sub=[];
    this.id ="";
    this.rundashDataService.getMasterData();
    this.switcher.getProgress().subscribe((progress)=>{
      this.progress = progress;
    })

    this.switcher.getPageSubject().subscribe((currentPage)=>{
      this.currentPage = currentPage;
      console.log(this.currentPage);
    })
  }

    ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
    }))

    console.log(this.id);
  }

  changePage(prev:string,next:string){
    this.switcher.swicthPage(prev,next);
    console.log(next);
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { AddrunComponent } from '../../../rundash/components/addrun/addrun.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { JobDataComponent } from '../../../../shared/components/job-data/job-data.component';
import { SOEEvent, SOEget, SOEpost } from '../../../../shared/interfaces/soe';
import { DataService } from '../../services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoursAgoPipe } from '../../../../shared/pipes/hours-ago.pipe';

@Component({
  selector: 'app-soe',
  standalone: true,
  imports: [CommonModule, SharedModule, JobDataComponent, ReactiveFormsModule, FormsModule, HoursAgoPipe],
  templateUrl: './soe.component.html',
  styleUrl: './soe.component.scss'
})

export class SoeComponent implements OnInit {
  private sub: Subscription[];
  public id = "";
  SelectedEvent:number = 0;
  Events = <SOEEvent[]>[];
  SOEs = <SOEget[]>[];
  constructor(private route: ActivatedRoute,public data:DataService){
    this.data.getEvent();
    this.sub= [];
    this.id = "";

    this.sub.push(this.data.Event$.subscribe((events) => {
      this.Events = events;
      if (this.Events.length === 0) {
      } else {
        if(this.SelectedEvent == 0 ){
          this.SelectedEvent = this.Events[0].id;
        }
      }
    }),

  )

  }

  ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      this.data.getSoe(this.id);
    }),
      this.data.Soe$.subscribe((soe) => {
        this.SOEs = soe;
      }),
  )
    console.log(this.id);
  }
  addEvent(){
    console.log(this.SelectedEvent);
    if(this.SelectedEvent!=0){
      let Soe = <SOEpost>{action_id:this.SelectedEvent,job_number:this.id}
      console.log(Soe);
      this.data.addSoe(this.id, Soe);
    }
  }


}

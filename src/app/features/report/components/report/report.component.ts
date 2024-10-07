import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JobDataComponent } from '../../../../shared/components/job-data/job-data.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule,JobDataComponent,SharedModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  private sub: Subscription[];
  public id = "";

  constructor(private route: ActivatedRoute,) {
    this.sub = [];
    this.id = "";
  }


  
}

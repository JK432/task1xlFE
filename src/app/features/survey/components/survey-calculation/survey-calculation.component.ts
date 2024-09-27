import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SurveyCalculationDetails } from '../../../../shared/interfaces/survey-calculation-details';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ImportSurveyComponent } from '../../modals/import-survey/import-survey.component';
import { StatusColorPipe } from '../../pipes/status-color.pipe';

@Component({
  selector: 'app-survey-calculation',
  standalone: true,
  imports: [ImportSurveyComponent,SharedModule,CommonModule,StatusColorPipe,UpperCasePipe],
  templateUrl: './survey-calculation.component.html',
  styleUrl: './survey-calculation.component.scss'
})
export class SurveyCalculationComponent implements OnInit{
  selectedFile: File | null = null;
  private sub: Subscription[];
  id:string = "";
  surveyCalculationDetails:SurveyCalculationDetails = {results:[],status:"no_data",max_inclination:0.0,message:"no Data"}
  constructor(private route: ActivatedRoute,public dataServices:DataService){

          this.sub= [];
          this.sub.push(this.dataServices.surveyCalculationDetails$.pipe().subscribe({next:(data)=>{
          this.surveyCalculationDetails = data;
          console.log(this.surveyCalculationDetails);
      }}))
  }

   ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      console.log("Caluculate survey");
      // this.calculateSurvey();
   }))
  }

  //   calculateSurvey(): void {
  //   if (this.id) {
  //     const formData = new FormData();
  //     formData.append('job_number', this.id);
  //     this.dataServices.IntiateSurveyCalculation(formData);
  //   } else {
  //     console.error('No Id');
  //   }
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

    onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('job_number', this.id);
      formData.append('survey_type', '1');
      this.dataServices.postSurveyFile(formData).then(()=>{
        // this.calculateSurvey();
      });
      console.log(this.selectedFile);
    } else {
      console.error('No file selected');
    }
  }

}

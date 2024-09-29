import { Component, OnInit } from '@angular/core';
import { ImportSurveyComponent } from '../../modals/import-survey/import-survey.component';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { QualityAnalysis } from '../../../../shared/interfaces/qa';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { StatusColorPipe } from '../../pipes/status-color.pipe';
import { DataService as SurveyDataServices } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { PresurveyInfo } from '../../../../shared/interfaces/presurveyinfo';
import { WellInfo } from '../../../../shared/interfaces/well_info';
import { DataService as PresurveydataService } from '../../../presurvey/services/data.service';
@Component({
  selector: 'app-quality-analysis',
  standalone: true,
  imports: [ImportSurveyComponent, SharedModule, CommonModule, StatusColorPipe, UpperCasePipe],
  templateUrl: './quality-analysis.component.html',
  styleUrl: './quality-analysis.component.scss'
})

export class QualityAnalysisComponent implements OnInit {
  wellInfo: WellInfo = {
    east_coorinates: 0,
    g_t: 0,
    max_gt: 0,
    max_wt: 0,
    min_gt: 0,
    min_wt: 0,
    north_coordinates: 0,
    w_t: 0,
    well_info_id: 0,
    central_meridian: 0.0,
    easting: 0.0,
    expected_well_temp: 0.0,
    expected_wellbore_inclination: 0.0,
    GLE: 0.0,
    job_number: "",
    latitude_1: 0.0,
    latitude_2: 0.0,
    latitude_3: 0.0,
    longitude_1: 0.0,
    longitude_2: 0.0,
    longitude_3: 0.0,
    northing: 0.0,
    ref_datum: "",
    ref_elivation: "",
    RKB: 0.0,
    well_id: 0.0,
    well_type: 0.0,
  }
  clickedbutton: number = 0;
  selectedFile: File | null = null;
  private sub: Subscription[];
  id: string = "";
  runno: string = "1";
  qualityAnalysis: QualityAnalysis = { results: [], status: "no_data", success_count: 0, g_t_percentage: "", g_t_score: "", w_t_percentage: "", w_t_score: "" }
  constructor(private route: ActivatedRoute, public dataServices: DataService, public surveyDataServices: SurveyDataServices, private toastr: ToastrService, public presurveyDataService: PresurveydataService) {
    this.sub = [];
    this.sub.push(this.dataServices.qualityAnalysis$.pipe().subscribe({
      next: (data) => {
        this.qualityAnalysis = data;
        console.log(this.qualityAnalysis);
      }
    }))
  }

  ngOnInit(): void {

    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      this.runno = params['runNo'];
      if (this.id.match('^OM\\d+$')) {
        this.dataServices.getQualityAnalysis(this.id, this.runno);
        this.surveyDataServices.getSurveyCalculationDetails(this.id,this.runno).then((value)=>{

      });
      }
    }))

    this.presurveyDataService.getInfo(this.id);
    this.sub.push(this.presurveyDataService.PresurveyInfo$.pipe().subscribe({
      next: (data) => {
        if (data.well_info) {
          this.wellInfo = data.well_info;
        } else {
          this.wellInfo = {
            east_coorinates: 0,
            g_t: 0,
            max_gt: 0,
            max_wt: 0,
            min_gt: 0,
            min_wt: 0,
            north_coordinates: 0,
            w_t: 0,
            well_info_id: -1,
            central_meridian: 0.0,
            easting: 0.0,
            expected_well_temp: 0.0,
            expected_wellbore_inclination: 0.0,
            GLE: 0.0,
            job_number: "",
            latitude_1: 0.0,
            latitude_2: 0.0,
            latitude_3: 0.0,
            longitude_1: 0.0,
            longitude_2: 0.0,
            longitude_3: 0.0,
            northing: 0.0,
            ref_datum: "",
            ref_elivation: "",
            RKB: 0.0,
            well_id: 0.0,
            well_type: 0.0,
          };
        }

      }
    }))
  }



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
      this.surveyDataServices.postSurveyFile(formData,this.id,this.runno);
      console.log(this.selectedFile);
    } else {
      console.error('No file selected');
    }
  }

  generatePDF() {
    const data = document.getElementById('qualityAnalysisPdf');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208; // Width of the PDF page
      const pageHeight = 295; // Height of the PDF page
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight; // Remaining height of the image content

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      let position = 0;

      // Add the first page image
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 2);
      heightLeft -= pageHeight; // Subtract the page height from the remaining height

      // If the remaining content is larger than one page, add new pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 2; // Move to the next page position
        pdf.addPage(); // Add a new page
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight; // Subtract the page height again
      }

      pdf.save(`${this.id}_QualityAnalysis.pdf`); // Save the generated PDF
    });
  }

  generatePDF2() {

    this.qualityAnalysis.results.forEach((res, $index) => {

    });




    const htmlString = `
   <div class="table-responsive m-2 !mt-0 !mb-[0rem]" id="qualityAnalysisPdf">
            <table class="table !p-0 !pt-4 !text-center min-w-full">
              <thead class="">
                <tr class=" table-primary border-b border-defaultborder">
                  <th scope="col " class="!text-center">Survey<br>Stations</th>
                  <th scope="col" class="!text-center">Measure<br>Depth</th>
                  <th scope="col" class="!text-center">Inc</th>
                  <th scope="col" class="!text-center">Azimuth</th>
                  <th scope="col" class="!text-center">G(t)</th>
                  <th scope="col" class="!text-center">ΔTGF</th>
                  <th scope="col" class="!text-center">ΔTGF Comp</th>
                  <th scope="col" class="!text-center">W(t)</th>
                  <th scope="col" class="!text-center">ΔW(t)</th>
                  <th scope="col" class="!text-center">ΔW(t) Comp</th>
                  <th scope="col" class="!text-center">Status</th>
                </tr>
              </thead>
              <tbody *ngIf=" !(surveyDataServices.qualityAnalysisPostLoading$ | async);  else loadedContent">
                <!-- @if (this.qualityAnalysis.results.length>0){ -->
                @for(result of this.qualityAnalysis.results; track $index){
                <tr class="border-b border-defaultborder ">
                  <td class="!p-1 !text-center">{{$index}}</td>
                  <td class="!p-1 !text-center">{{result.depth}}</td>
                  <td class="!p-1 !text-center">{{result.Inc}}</td>
                  <td class="!p-1 !text-center">{{result.AzG}}</td>
                  <td class="!p-1 !text-center">{{result.g_t}}</td>
                  <td class="!p-1 !text-center">{{result.g_t_difference}}</td>
                  <td class="{{result.g_t_status | statusColor}} !p-1 !text-center">{{result.g_t_status | uppercase}}</td>
                  <td class="!p-1 !text-center">{{result.w_t}}</td>
                  <td class="!p-1 !text-center">{{result.w_t_difference}}</td>
                  <td class="{{result.w_t_status | statusColor}} !p-1 !text-center">{{result.w_t_status | uppercase}}</td>
                  <td class="{{result.status | statusColor}} !p-1 !text-center">{{result.status | uppercase}}</td>
                </tr>
                }

              </tbody>
              <ng-template #loadedContent>
                <div class="ti-spinner text-primary p-2 m-2" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </ng-template>

            </table>
 </div>
`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const data = document.getElementById('qualityAnalysisPdf');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208; // Width of the PDF page
      const pageHeight = 295; // Height of the PDF page
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight; // Remaining height of the image content

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      const padding = 10; // Set padding around the content
      const availableWidth = imgWidth - padding * 2; // Adjust width for padding
      const availableHeight = pageHeight - padding * 2; // Adjust height for padding

      let position = padding; // Start position with padding

      // Add the first page image with padding
      pdf.addImage(contentDataURL, 'PNG', padding, position, availableWidth, imgHeight);
      heightLeft -= availableHeight; // Subtract the available height from the remaining content height

      // If the remaining content is larger than one page, add new pages with padding
      while (heightLeft > 0) {
        pdf.addPage(); // Add a new page
        position = padding; // Reset position to the top with padding
        pdf.addImage(contentDataURL, 'PNG', padding, position, availableWidth, imgHeight);
        heightLeft -= availableHeight; // Subtract the available height again
      }

      pdf.save(`${this.id}_QualityAnalysis.pdf`); // Save the generated PDF
    });
  }

  deleteSurveyStation(stationId: number) {
    this.clickedbutton = stationId;
    this.dataServices.deleteQAStation(stationId, this.id, this.runno).then((value) => {
      if (value) {
        this.toastr.success('Survey Station ' + stationId + ' Deleted,', 'Sucess', { positionClass: 'toast-top-center' });
      }
    })
  }
}

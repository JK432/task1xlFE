import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SurveyCalculationDetails, SurveyRows } from '../../../../shared/interfaces/survey-calculation-details';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule, getNumberOfCurrencyDigits, UpperCasePipe } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ImportSurveyComponent } from '../../modals/import-survey/import-survey.component';
import { StatusColorPipe } from '../../pipes/status-color.pipe';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { range } from 'rxjs';

@Component({
  selector: 'app-survey-calculation',
  standalone: true,
  imports: [ImportSurveyComponent, SharedModule, CommonModule, StatusColorPipe, UpperCasePipe, NgApexchartsModule],
  templateUrl: './survey-calculation.component.html',
  styleUrl: './survey-calculation.component.scss'
})
export class SurveyCalculationComponent implements OnInit {

  surveyCalculationFlag: boolean = true;


  sectionChartOption: any = {
    series: [{
      name: "Desktops",
      data: [53, 16, 25, 41, 53, 51, 59, 67, 20, 24]
    }],

    chart: {
      height: 320,
      type: 'line',
      zoom: {
        enabled: false
      },
      events: {
        mounted: (chart: any) => {
          chart.windowResizeHandler();
        }
      },
    },
    colors: ['#845adf'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: '#f2f5f7',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#8c9097'
      },
    },
    xaxis: {
      categories: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb', '18 Feb', '19 Feb'],
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: '11px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    yaxis: {
      categories: ['16', '58', '100'],
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: '11px',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-label',
        },
      }
    }

  }

  planChartOption: any = {
    series: [{
      name: "Desktops",
      data: [53, 16, 25, 41, 53, 51, 59, 67, 20, 24]
    }],

    chart: {
      height: 320,
      type: 'line',
      zoom: {
        enabled: false
      },
      events: {
        mounted: (chart: any) => {
          chart.windowResizeHandler();
        }
      },
    },
    colors: ['#845adf'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: '#f2f5f7',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#8c9097'
      },
    },
    xaxis: {
      categories: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb', '18 Feb', '19 Feb'],
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: '11px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    yaxis: {
      categories: ['16', '58', '100'],
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: '11px',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-label',
        },
      }
    }

  }

  selectedFile: File | null = null;
  private sub: Subscription[];
  id: string = "";
  runno: string = '1';
  surveyCalculationDetails: SurveyCalculationDetails = {
    survey_details: [],
    status: "no_data",
    max_inclination: 0.0,
    last_row: {
      header_id: 0,
      closure_distance: 0,
      closure_direction: 0,
      vertical_section: 0.0
    }
  }
  constructor(private route: ActivatedRoute, public dataServices: DataService) {

    this.sub = [];
    this.sub.push(this.dataServices.surveyCalculationDetails$.pipe().subscribe({
      next: (data) => {
        this.surveyCalculationDetails = data;
        console.log(this.surveyCalculationDetails);
        this.sectionChartOption = this.getChartOptions(this.surveyCalculationDetails.survey_details)
        this.planChartOption = this.getChartOptionsPlan(this.surveyCalculationDetails.survey_details)
        console.log(this.sectionChartOption)
      }
    }))

    
  }

  ngOnInit(): void {
    this.sub.push(this.route.params.subscribe(params => {
      this.id = params['jobNo'];
      this.runno = params['runNo'];
      this.dataServices.getSurveyCalculationDetails(this.id, this.runno);
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
      formData.append('run_number', this.runno);
      formData.append('survey_type', '1');
      this.dataServices.postSurveyFile(formData, this.id, this.runno).then(() => {
        // this.calculateSurvey();
      });
      console.log(this.selectedFile);
    } else {
      console.error('No file selected');
    }
  }


  generateXAxisArray(xAxisLimit: number, numPoints: number) {
    const range = 2 * xAxisLimit; // Total range from -xAxisLimit to +xAxisLimit
    const step = range / (numPoints - 1); // Step size between points
    const xAxisArray = [];

    for (let i = 0; i < numPoints; i++) {
      xAxisArray.push(-xAxisLimit + (i * step));
    }

    return xAxisArray;
  }

  generateYAxisArray(maxTVD: number, numPoints: number) {
    const roundedMaxTVD = Math.ceil(maxTVD); // Round maxTVD to the nearest higher integer
    const step = roundedMaxTVD / (numPoints - 1); // Step size between points
    const yAxisArray = [];

    for (let i = 0; i < numPoints; i++) {
      yAxisArray.push(Math.round(i * step));
    }

    return yAxisArray;
  }

  genarateValues(verticalSectionData: number[]) {

  }

  // Example usage:

  getChartOptions(surveyData: SurveyRows[]) {
    // Extract TVD and Vertical Section data from survey details
    const tvdData = surveyData.map(point => (point.tvd));
    const verticalSectionData = surveyData.map(point => (point.Vertical_Section));
    // const sortedVerticalSection = verticalSectionData.sort((a, b) => a - b);

    // Find the maximum absolute value of the vertical section for setting x-axis limits
    const maxVerticalSection = Math.max(...verticalSectionData.map(Math.abs));
    const xAxisLimit = Math.ceil(maxVerticalSection);
    const maxTVD = Math.round(Math.max(...tvdData));

    const xCat = this.generateXAxisArray(xAxisLimit, 6);
    const yCat = this.generateYAxisArray(maxTVD, 6)


    // Chart options
    const chartOptions = {
      series: [{
        name: 'Vertical Section',
        data: verticalSectionData.map((verticalSection, index) => ({
          x: tvdData[index],
          y: verticalSection
        }))
        // data:[53, 16, 25, 41, 53, 51, 59, 67, 20,24],
      }],

      chart: {
        height: 320,
        type: 'line',
        zoom: {
          enabled: false
        },
        events: {
          mounted: (chart: any) => {
            chart.windowResizeHandler();
          }
        },
      },

      colors: ['#845adf'],

      dataLabels: {
        enabled: false
      },

      stroke: {
        curve: 'smooth',
        width: 2,
      },

      // grid: {
      //   borderColor: '#f2f5f7',
      // },

      title: {
        text: 'Vertical Section vs TVD',
        align: 'left',
        style: {
          fontSize: '14px',  // Slightly larger for better readability
          fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
          fontWeight: 500,  // Slightly lighter for a clean appearance
          color: '#4a4a4a',  // Darker gray for better contrast
        }
      },

      annotations: {
        yaxis: [{
          y: 0.00,
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: '0.00',
          },
        }],
      },
      yaxis: {
        tickAmount: 6,
        title: {
          text: 'Vertical Section',
          rotate: -90, // Rotate to place vertically
          offsetX: 0,  // Adjust horizontal offset
          offsetY: 0,  // Adjust vertical offset
          style: {
            fontSize: '14px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 500,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        },
        labels: {
          // minWidth: 100,
          show: true,
          style: {
            fontSize: '12px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 400,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        },
      },

      xaxis: {
        // categories: sortedVerticalSection,
        type: 'numeric',
        tickAmount: 5,
        stepSize: 1,
        title: {
          text: 'True Vertical Depth',
          style: {
            fontSize: '14px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 500,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        },
        labels: {
          show: true,
          rotate: 0,
          style: {
            fontSize: '12px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 400,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        }
      },




      grid: {
        borderColor: '#4a4a4a',
      },
      legend: {
        show: true,                // Ensure that the legend is enabled
        position: 'top',            // Position the legend at the top
        horizontalAlign: 'center',  // Align the legend in the center horizontally
        floating: false,            // Disable floating to make sure the legend appears
        offsetY: 0,                 // Adjust the Y offset for better visibility
        offsetX: 0,                 // Adjust the X offset
        labels: {
          colors: '#4a4a4a',        // Color for the legend labels
          useSeriesColors: false     // Prevent the legend from using series colors
        },
      }

    };

    return chartOptions;
  }

    getChartOptionsPlan(surveyData: SurveyRows[]) {
    // Extract TVD and Vertical Section data from survey details
    const latitude = surveyData.map(point => (point.latitude)).slice(1);
    const departure = surveyData.map(point => (point.departure)).slice(1);
    // const sortedVerticalSection = verticalSectionData.sort((a, b) => a - b);

    // Find the maximum absolute value of the vertical section for setting x-axis limits
    // const maxVerticalSection = Math.max(...verticalSectionData.map(Math.abs));
    // const xAxisLimit = Math.ceil(maxVerticalSection);
    // const maxTVD = Math.round(Math.max(...tvdData));

    // const xCat = this.generateXAxisArray(xAxisLimit, 6);
    // const yCat = this.generateYAxisArray(maxTVD, 6)


    // Chart options
    const chartOptions = {
      series: [{
        name: '+N/-S',
        data: departure.map((dep, index) => ({
          x: dep,
          y: latitude[index]
        }))
        // data:[53, 16, 25, 41, 53, 51, 59, 67, 20,24],
      }],

      chart: {
        height: 320,
        type: 'line',
        zoom: {
          enabled: false
        },
        events: {
          mounted: (chart: any) => {
            chart.windowResizeHandler();
          }
        },
      },

      colors: ['#845adf'],

      dataLabels: {
        enabled: false
      },

      stroke: {
        curve: 'smooth',
        width: 2,
      },

      // grid: {
      //   borderColor: '#f2f5f7',
      // },

      title: {
        text: 'Latitude vs Departure',
        align: 'left',
        style: {
          fontSize: '14px',  // Slightly larger for better readability
          fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
          fontWeight: 500,  // Slightly lighter for a clean appearance
          color: '#4a4a4a',  // Darker gray for better contrast
        }
      },

      annotations: {
        yaxis: [{
          y: 0.00,
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: '0.00',
          },
        }],
      },
      yaxis: {
        tickAmount: 6,
        title: {
          text: 'Latitude',
          rotate: -90, // Rotate to place vertically
          offsetX: 0,  // Adjust horizontal offset
          offsetY: 0,  // Adjust vertical offset
          style: {
            fontSize: '14px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 500,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        },
        labels: {
          // minWidth: 100,
          show: true,
          style: {
            fontSize: '12px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 400,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        },
      },

      xaxis: {
        // categories: sortedVerticalSection,
        type: 'numeric',
        tickAmount: 5,
        stepSize: 1,
        title: {
          text: 'Departure',
          style: {
            fontSize: '14px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 500,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        },
        labels: {
          show: true,
          rotate: 0,
          style: {
            fontSize: '12px',  // Slightly larger for better readability
            fontFamily: 'Roboto, Arial, sans-serif',  // Use Roboto for modern look
            fontWeight: 400,  // Slightly lighter for a clean appearance
            color: '#4a4a4a',  // Darker gray for better contrast
          }
        }
      },




      grid: {
        borderColor: '#4a4a4a',
      },
      legend: {
        show: true,                // Ensure that the legend is enabled
        position: 'top',            // Position the legend at the top
        horizontalAlign: 'center',  // Align the legend in the center horizontally
        floating: false,            // Disable floating to make sure the legend appears
        offsetY: 0,                 // Adjust the Y offset for better visibility
        offsetX: 0,                 // Adjust the X offset
        labels: {
          colors: '#4a4a4a',        // Color for the legend labels
          useSeriesColors: false     // Prevent the legend from using series colors
        },
      }

    };

    return chartOptions;
  }

}

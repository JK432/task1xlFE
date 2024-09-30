import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SurveyType } from '../../../../shared/interfaces/survey-type';

@Component({
  selector: 'app-addrun',
  standalone: true,
  imports: [],
  templateUrl: './addrun.component.html',
  styleUrl: './addrun.component.scss'
})
export class AddrunComponent {
  // surveyInfoForm: FormGroup;
    selectedStartDepthUnit: string = '';
  selectedTagDepthUnit: string = '';
  selectedProposalDirectionUnit: string = '';

  typeOfTools: string[] = []; selectedTypeOfTool: string = '';
  surveyTypes: SurveyType[] = []; selectedSurveyType: number = -1;
  holeSections: string[] = []; selectedHoleSection: string = '';
  surveyRunIns: string[] = []; selectedSurveyRunIn: string = '';
  minimumIds: string[] = []; selectedMinimumId: string = '';
  northReferences: string[] = []; selectedNorthReference: string = '';
  surveyCalculationMethod: string = '';
  geodeticSystem: string = '';
  mapZone: string = '';
  geodeticDatum: string = '';
  runNumber:string = '';

}

import Dexie, { Table } from 'dexie';
import { Job } from './app/shared/interfaces/job';
import { Well } from './app/shared/interfaces/well';
import { ServiceType } from './app/shared/interfaces/service-type';
import { UnitOfMeasure } from './app/shared/interfaces/unit-of-measure';
import { RigMaster } from './app/shared/interfaces/rig-master';
import { WellType } from './app/shared/interfaces/well-type';
import { HoleSection } from './app/shared/interfaces/hole-section';
import { SurveyType } from './app/shared/interfaces/survey-type';
import { ToolsType } from './app/shared/interfaces/tools-type';


export class AppDB extends Dexie {
  job!:Table<Job,number>
  well!:Table<Well,number>
  service_type!:Table<ServiceType,number>
  unit_of_measure!:Table<UnitOfMeasure,number>
  rig_master!:Table<RigMaster,number>
  well_type!:Table<WellType,number>
  tools_type!:Table<ToolsType,number>
  hole_section!:Table<HoleSection,number>
  survey_type!:Table<SurveyType,number>


  constructor() {
    super('task1xlDB');
    this.version(3).stores({
      service_type: '++id,service_type',
      unit_of_measure: '++id,unit_of_measure',
      rig_master: '++id,rig_number',
      well_type: '++id,well_type',
      tools_type: '++id,type_of_tools',
      hole_section: '++id',
      survey_type: '++id,survey_types',
    });
  }
}

export const db = new AppDB();

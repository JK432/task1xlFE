import { Customer } from "./customer";
import { HoleSection } from "./hole-section";
import { RigMaster } from "./rig-master";
import { ServiceType } from "./service-type";
import { SurveyType } from "./survey-type";
import { ToolsType } from "./tools-type";
import { UnitOfMeasure } from "./unit-of-measure";
import { WellType } from "./well-type";

export interface MasterData {
  customers:Customer[];
  service_type: ServiceType[];
  unit_of_measure: UnitOfMeasure[];
  rig_master: RigMaster[];
  well_type: WellType[];
  tools_type: ToolsType[];
  hole_section: HoleSection[];
  survey_type: SurveyType[];
}

import { Customer } from "./customer";
import { RigMaster } from "./rig-master";
import { ServiceType } from "./service-type"
import { UnitOfMeasure } from "./unit-of-measure";

export interface IntialData {
  service_type:ServiceType[];
  unit_of_measure:UnitOfMeasure[];
  rig_master:RigMaster[];
  customers:Customer[]
}

export interface SurveyIntialCalculation{
  status: string,
  data: data,
}

export interface data{
  job_number: string;
  depth: number;
  inclination: number;
  azimuth: number;
  Vertical_Section: number;
  true_vertical_depth: number;
  latitude: number;
  departure: number;
  DLS: number | null;
  closure_distance: number;
  closure_direction: number;
  CL: number | null;
  dog_leg: number | null;
  ratio_factor: number | null;
}

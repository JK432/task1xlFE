export interface SurveyCalculationDetails{
  status:string,
  max_inclination:number,
  survey_details:SurveyRows[],
  last_row:LastRow,
}

export interface SurveyRows{
  id:number;
  measured_depth: number;     // Measured Depth (MD)
  inclination: number;        // Inclination
  azimuth: number;            // Azimuth
  CL: number;                 // Course Length (CL)
  dog_leg: number;            // Dog Leg
  ratio_factor: number;       // Ratio Factor
  tvd: number;                // True Vertical Depth (TVD)
  latitude: number;           // Latitude
  departure: number;          // Departure
  closure_distance: number;   // Closure Distance
  closure_direction: number;  // Closure Direction
  DLS: number;                // Dog Leg Severity (DLS)
  Vertical_Section: number;
  header_id:number;
}
export interface LastRow {
  header_id: number;
  closure_distance: number;
  closure_direction: number;
  vertical_section: number;
}

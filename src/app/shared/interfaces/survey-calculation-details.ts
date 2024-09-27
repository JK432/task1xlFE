export interface SurveyCalculationDetails{
  status: string,
  message: string,
  max_inclination:number,
  results:SurveyRows[]
}

export interface SurveyRows{    
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
}
// "status": "success",
//     "message": "Survey calculation details created successfully",
//     "max_inclination": 1.28,

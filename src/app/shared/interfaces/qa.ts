export interface QualityAnalysis {
  status: string,
  success_count: number,
  g_t_score: string,
  w_t_score: string,
  g_t_percentage: string,
  w_t_percentage: string,
  results: QApoint[]
}

export interface QApoint {
  id:number,
  header:number,
  row: number,
  depth: number,
  Inc: number,
  AzG: number,
  g_t: number,
  w_t: number,
  g_t_status: string,
  w_t_status: string,
  g_t_difference: number,
  w_t_difference: number,
  status: string
}


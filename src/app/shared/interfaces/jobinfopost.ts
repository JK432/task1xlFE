import { JobInfo } from "./jobinfo";
export interface JobInfoPost extends Omit<JobInfo, "survey_info_id"> {
}

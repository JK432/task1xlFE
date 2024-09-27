import { JobInfo } from "./jobinfo";
import { JobInfoPost } from "./jobinfopost";
import { SurveyInfo } from "./surveyinfo";
import { SurveyInfoPost } from "./surveyinfoPost";
import { TieOnInfo } from "./tieoninfo";
import { TieOnInfoPost } from "./tieOnInfoPost";
import { WellInfo } from "./well_info";
import { WellInfoPost } from "./well_info_post";

export interface PresurveyInfo {
    job_info: JobInfo;
    well_info: WellInfo;
    survey_info: SurveyInfo[];
    tie_on_information: TieOnInfo[];
}

export interface PresurveyInfoPost {
    job_info: JobInfoPost;
    well_info: WellInfoPost;
    survey_info: SurveyInfoPost;
    tie_on_information: TieOnInfoPost;
}

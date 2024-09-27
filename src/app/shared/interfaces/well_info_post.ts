import { WellInfo } from "./well_info";

export interface WellInfoPost extends Omit<WellInfo, "well_info_id"|"north_coordinates"|"east_coorinates"|"w_t"|"max_wt"|"min_wt"|"g_t"|"max_gt"|"min_gt"> {
}




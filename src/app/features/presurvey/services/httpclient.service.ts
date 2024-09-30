import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WellInfo } from '../../../shared/interfaces/well_info';
import { environment } from '../../../../environments/environment';
import { WellInfoPost } from '../../../shared/interfaces/well_info_post';
import { PresurveyInfo, PresurveyInfoPost } from '../../../shared/interfaces/presurveyinfo';
import { CostCenter, Employee, GyroSenser, JobAssetPost, Vehicle } from '../../../shared/interfaces/asset';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  constructor(private http: HttpClient) { }

  getAllInfo(id: string) {
    return this.http.get<PresurveyInfo>(environment.serverAPI.ROOT + environment.serverAPI.GET_JOB_DETAILS + id + '/')
  }

  getWellInfo() {
    return this.http.get<WellInfo>(environment.serverAPI.WELL_INFO)
  }

  postWellInfo(well: WellInfoPost) {
    return this.http.post<WellInfo>(environment.serverAPI.ROOT + environment.serverAPI.WELL_INFO, well)
  }

  patchhWellInfo(well: WellInfoPost) {
    return this.http.post<WellInfo>(environment.serverAPI.ROOT + environment.serverAPI.WELL_INFO, well)
  }

  postAllInfo(persurveyInfo: PresurveyInfoPost) {
    return this.http.post<PresurveyInfo>(environment.serverAPI.ROOT + environment.serverAPI.CREATE_JOB_DETAILS, persurveyInfo)
  }

  getAllCostCenter() {
    return this.http.get<CostCenter[]>(environment.serverAPI.ROOT + environment.serverAPI.COST_CENTER)

  }
  getAllEmployee() {
    return this.http.get<Employee[]>(environment.serverAPI.ROOT + environment.serverAPI.EMPLOYEE_DATA)

  }
  getAllVehicle() {
    return this.http.get<Vehicle[]>(environment.serverAPI.ROOT + environment.serverAPI.VEHICLE_DATA)

  }
  getAllGyroData() {
    return this.http.get<GyroSenser[]>(environment.serverAPI.ROOT + environment.serverAPI.GYRO_DATA)

  }

  postAsset(jobasset: JobAssetPost) {
    return this.http.post<JobAssetPost>(environment.serverAPI.ROOT + environment.serverAPI.JOB_ASSETS+jobasset.job_number+'/', jobasset)
  }
}

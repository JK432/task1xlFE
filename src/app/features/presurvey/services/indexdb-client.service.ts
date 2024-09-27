import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from '../../../../ldb';
import { ServiceType } from '../../../shared/interfaces/service-type';

@Injectable({
  providedIn: 'root'
})
export class IndexdbClientService {
    service_types$ = liveQuery(
    () => this.serviceTypeItems()
  );

  async serviceTypeItems() {
    return await db.service_type
      .toArray();
  }

  async addServiceTypes(items:ServiceType[]) {
    await db.service_type.bulkAdd(items);
  }

  async removeAllServiceType(){
    await db.service_type.clear();
  }



  constructor() { }
}

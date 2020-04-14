import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Util } from 'src/app/users/util';
import { Rider } from "../../../rider/rider";
import { RiderFullTimeSchedule } from 'src/app/store/rider-full-time-schedule';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  private rider: Rider;

  constructor(private httpClient: HttpClient) { }

  addRider(rider: Rider) {
    return this.httpClient.post(`${Util.baseURL}/riders`, rider);
  }

  fetchAllRiders(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/riders`);
  }

  fetchRiderInfo(drid: number): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/riderInfo`);
  }

  fetchSalaryInfo(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/salaryInfo/`);
  }

  fetchFullTimeSchedule(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/fullTimeSchedule/`);
  }

  updateFullTimeSchedule(drid: number, fullTimeSchedule: RiderFullTimeSchedule) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/fullTimeSchedule/`, fullTimeSchedule);
  }

  updatePartTimeSchedule(drid: number, partTimeSchedule: RiderFullTimeSchedule) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/partTimeSchedule/`, partTimeSchedule);
  }

  setRider(rider: Rider) {
    this.rider = rider;
  }

  getRider() {
    return this.rider;
  }
}

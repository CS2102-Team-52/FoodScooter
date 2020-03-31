import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Util } from 'src/app/users/util';
import { User } from 'src/app/users/user';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  constructor(private httpClient: HttpClient) { }

  fetchAllRiders(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/riders`);
   }

   fetchRiderInfo(data: User): Observable<any> {
    return this.httpClient.post(`${Util.baseURL}/riderInfo`, data);
   }
}

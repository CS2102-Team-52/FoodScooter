import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Util } from 'src/app/users/util';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  constructor(private httpClient: HttpClient) { }

  fetchAllRiders(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/riders`);
   }

   fetchRiderType(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/riderType`);
   }
}

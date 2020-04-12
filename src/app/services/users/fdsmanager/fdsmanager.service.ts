import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Util} from "../../../users/util";

@Injectable({
  providedIn: 'root'
})
export class FDSmanagerService {

  constructor(private httpClient: HttpClient) { }

  // add API calls here

  fetchGeneralSummary(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/summaryInfo/general`);
  }
}

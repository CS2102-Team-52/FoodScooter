import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Promotion} from "../../promotions/promotion";
import {Util} from "../../users/util";

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(
    private httpClient: HttpClient
  ) { }


}

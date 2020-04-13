import { Component, OnInit } from '@angular/core';
import {FDSmanagerService} from "../../services/users/fdsmanager/fdsmanager.service";
import {LoginService} from "../../login/services/login.service";
import {LoginResponse} from "../../login/services/dto/login-response";
import {GeneralSummary} from "../../store/generalSummary";

@Component({
  selector: 'app-fdsmanager',
  templateUrl: './fdsmanager.component.html',
  styleUrls: ['./fdsmanager.component.css']
})
export class FDSManagerComponent implements OnInit {
  // import my services here
  constructor(
    private fdsManagerService: FDSmanagerService,
    private loginService: LoginService
  ) { }

  showGeneralSummary: boolean;
  generalSummaryList: GeneralSummary[];
  loginResponse: LoginResponse;

  ngOnInit(): void {
    this.showGeneralSummary = false;
    this.loginResponse = this.loginService.getLoginResponse();
  }

  viewGeneralSummary(): void {
    this.showGeneralSummary = true;
    this.getGeneralSummary();
  }

  getGeneralSummary(): void {
    this.fdsManagerService.fetchGeneralSummary().subscribe((data: any) => {
      console.log(data);
      this.generalSummaryList = data;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../services/login/login.service";
import { UserType } from "../store/user-type.enum";
import { RiderType } from "../store/rider-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private path: string;

  username: string;
  password: string;

  userType: UserType;
  userTypes: string[];

  riderType: RiderType;
  riderTypes: string[];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.userTypes = Object.keys(UserType);
    this.riderTypes = Object.keys(RiderType);
  }

  ngOnInit(): void {
  }

  login() {
    const path = this.loginService.login(this.username, this.password).subscribe(
      (data: string) => {
        this.path = `${data}/${this.username}`;
        this.router.navigate([path]).then(() => {});
      }
    );
  }

  createAccount() {
    this.loginService.createUser(this.username, this.password, this.userType, this.riderType);
  }
}

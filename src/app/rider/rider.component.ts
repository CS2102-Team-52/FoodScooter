import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  constructor(private router: Router) { }

  showSummary: boolean;
  showOrder: boolean;
  summaryList: String[] = ["testSummary"];
  orderList: String[]= ["testorder"];

  ngOnInit(): void {
    this.showOrder = false;
    this.showSummary = false;
  }

  viewOrder() : void {
    this.showOrder = true;
    this.showSummary = false;
  }

  viewSummary() : void {
    this.showSummary = true;
    this.showOrder = false;
  }

}

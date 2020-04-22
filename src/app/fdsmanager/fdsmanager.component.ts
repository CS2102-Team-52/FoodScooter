import { Component, OnInit } from '@angular/core';
import {FDSManagerService} from "../services/users/fdsmanager/fdsmanager.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-fdsmanager',
  templateUrl: './fdsmanager.component.html',
  styleUrls: ['./fdsmanager.component.css']
})
export class FDSManagerComponent implements OnInit {
  // import my services here
  constructor(
    private activatedRoute: ActivatedRoute,
    private fdsManagerService: FDSManagerService
  ) {
    this.id = Number(activatedRoute.snapshot.paramMap.get('id'));
  }

  id: number;
  showGeneralSummary: boolean;

  ngOnInit(): void {
    this.showGeneralSummary = false;
  }
}

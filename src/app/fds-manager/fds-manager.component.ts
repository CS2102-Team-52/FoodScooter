import { Component, OnInit } from '@angular/core';
import {FDSManagerService} from "../services/users/fdsmanager/fdsmanager.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-fds-manager',
  templateUrl: './fds-manager.component.html',
  styleUrls: ['./fds-manager.component.css']
})
export class FdsManagerComponent implements OnInit {
  id: number;
  // import my services here
  constructor(
    private activatedRoute: ActivatedRoute,
    private fdsManagerService: FDSManagerService
  ) {
    this.id = Number(activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }
}

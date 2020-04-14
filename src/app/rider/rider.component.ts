import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiderService } from '../services/users/rider/rider.service';
import { Rider } from './rider';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private riderService: RiderService
  ) {
    this.id = Number(activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getRiderInfo();
  }

  getRiderInfo() {
    this.riderService.fetchRiderInfo(this.id).subscribe((data: any) => {
      this.riderService.setRider(data);
      console.log(this.riderService.getRider());
    });
    
  }

}

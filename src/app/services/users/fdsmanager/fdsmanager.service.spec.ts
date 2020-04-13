import { TestBed } from '@angular/core/testing';

import { FDSmanagerService } from './fdsmanager.service';

describe('FDSmanagerService', () => {
  let service: FDSmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FDSmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

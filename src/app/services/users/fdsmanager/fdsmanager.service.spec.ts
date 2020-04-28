import { TestBed } from '@angular/core/testing';

import { FDSManagerService } from './fdsmanager.service';

describe('FDSmanagerService', () => {
  let service: FDSManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FDSManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

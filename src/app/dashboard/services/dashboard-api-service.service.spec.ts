import { TestBed } from '@angular/core/testing';

import { DashboardApiServiceService } from './dashboard-api-service.service';

describe('DashboardApiServiceService', () => {
  let service: DashboardApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

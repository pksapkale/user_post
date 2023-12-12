import { TestBed } from '@angular/core/testing';

import { AuthHelperServiceService } from './auth-helper-service.service';

describe('AuthHelperServiceService', () => {
  let service: AuthHelperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHelperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

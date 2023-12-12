import { TestBed } from '@angular/core/testing';

import { AuthApiServiceService } from './auth-api-service.service';

describe('AuthApiServiceService', () => {
  let service: AuthApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AttendeeManagerService } from './attendee-manager.service';

describe('AttendeeManagerService', () => {
  let service: AttendeeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendeeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

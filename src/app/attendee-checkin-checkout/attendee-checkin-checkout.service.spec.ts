import { TestBed } from '@angular/core/testing';

import { AttendeeCheckinCheckoutService } from './attendee-checkin-checkout.service';

describe('AttendeeCheckinCheckoutService', () => {
  let service: AttendeeCheckinCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendeeCheckinCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

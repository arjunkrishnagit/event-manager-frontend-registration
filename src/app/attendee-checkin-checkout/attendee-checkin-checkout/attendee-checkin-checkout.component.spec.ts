import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeCheckinCheckoutComponent } from './attendee-checkin-checkout.component';

describe('AttendeeCheckinCheckoutComponent', () => {
  let component: AttendeeCheckinCheckoutComponent;
  let fixture: ComponentFixture<AttendeeCheckinCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeeCheckinCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeCheckinCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

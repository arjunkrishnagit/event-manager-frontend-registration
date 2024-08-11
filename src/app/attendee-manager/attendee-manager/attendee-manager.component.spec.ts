import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeManagerComponent } from './attendee-manager.component';

describe('AttendeeManagerComponent', () => {
  let component: AttendeeManagerComponent;
  let fixture: ComponentFixture<AttendeeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeeManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

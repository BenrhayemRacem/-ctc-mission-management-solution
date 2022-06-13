import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresSignupComponent } from './pres-signup.component';

describe('PresSignupComponent', () => {
  let component: PresSignupComponent;
  let fixture: ComponentFixture<PresSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

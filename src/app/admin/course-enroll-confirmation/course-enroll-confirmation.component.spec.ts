import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollConfirmationComponent } from './course-enroll-confirmation.component';

describe('CourseEnrollConfirmationComponent', () => {
  let component: CourseEnrollConfirmationComponent;
  let fixture: ComponentFixture<CourseEnrollConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEnrollConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnrollConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

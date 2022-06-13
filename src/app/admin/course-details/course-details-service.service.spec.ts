import { TestBed } from '@angular/core/testing';

import { CourseDetailsServiceService } from './course-details-service.service';

describe('CourseDetailsServiceService', () => {
  let service: CourseDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

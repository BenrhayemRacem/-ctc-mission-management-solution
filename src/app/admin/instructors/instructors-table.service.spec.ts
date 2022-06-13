import { TestBed } from '@angular/core/testing';

import { InstructorsTableService } from './instructors-table.service';

describe('InstructorsTableService', () => {
  let service: InstructorsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

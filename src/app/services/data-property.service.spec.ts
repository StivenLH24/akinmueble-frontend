import { TestBed } from '@angular/core/testing';

import { DataPropertyService } from './data-property.service';

describe('DataPropertyService', () => {
  let service: DataPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ValidateInactiveSessionGuard } from './validate-inactive-session.guard';

describe('ValidateInactiveSessionGuard', () => {
  let guard: ValidateInactiveSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateInactiveSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

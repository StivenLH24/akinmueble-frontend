import { TestBed } from '@angular/core/testing';

import { ValidateActiveSessionGuard } from './validate-active-session.guard';

describe('ValidateActiveSessionGuard', () => {
  let guard: ValidateActiveSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateActiveSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

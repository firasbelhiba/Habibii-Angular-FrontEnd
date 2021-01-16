import { TestBed } from '@angular/core/testing';

import { PreventUnsavedChanges.Guard.TsGuard } from './prevent-unsaved-changes.guard.ts.guard';

describe('PreventUnsavedChanges.Guard.TsGuard', () => {
  let guard: PreventUnsavedChanges.Guard.TsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventUnsavedChanges.Guard.TsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

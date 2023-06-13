import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateHashUserComponent } from './validate-hash-user.component';

describe('ValidateHashUserComponent', () => {
  let component: ValidateHashUserComponent;
  let fixture: ComponentFixture<ValidateHashUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateHashUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateHashUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

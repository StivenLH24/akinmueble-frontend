import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectRecoveryPasswordComponent } from './redirect-recovery-password.component';

describe('RedirectRecoveryPasswordComponent', () => {
  let component: RedirectRecoveryPasswordComponent;
  let fixture: ComponentFixture<RedirectRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectRecoveryPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

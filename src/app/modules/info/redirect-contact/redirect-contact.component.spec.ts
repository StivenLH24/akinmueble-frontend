import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectContactComponent } from './redirect-contact.component';

describe('RedirectContactComponent', () => {
  let component: RedirectContactComponent;
  let fixture: ComponentFixture<RedirectContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectTemplateComponent } from './redirect-template.component';

describe('RedirectTemplateComponent', () => {
  let component: RedirectTemplateComponent;
  let fixture: ComponentFixture<RedirectTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

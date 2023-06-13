import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectorModalComponent } from './projector-modal.component';

describe('ProjectorModalComponent', () => {
  let component: ProjectorModalComponent;
  let fixture: ComponentFixture<ProjectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

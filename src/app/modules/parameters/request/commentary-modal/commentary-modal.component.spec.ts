import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryModalComponent } from './commentary-modal.component';

describe('CommentaryModalComponent', () => {
  let component: CommentaryModalComponent;
  let fixture: ComponentFixture<CommentaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentaryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

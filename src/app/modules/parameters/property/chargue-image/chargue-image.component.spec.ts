import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargueImageComponent } from './chargue-image.component';

describe('ChargueImageComponent', () => {
  let component: ChargueImageComponent;
  let fixture: ComponentFixture<ChargueImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargueImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargueImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

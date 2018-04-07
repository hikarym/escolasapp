import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsByWeightingAreasComponent } from './indicators-by-weighting-areas.component';

describe('IndicatorsByWeightingAreasComponent', () => {
  let component: IndicatorsByWeightingAreasComponent;
  let fixture: ComponentFixture<IndicatorsByWeightingAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorsByWeightingAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsByWeightingAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

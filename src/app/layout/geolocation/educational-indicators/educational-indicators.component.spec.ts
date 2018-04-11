import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalIndicatorsComponent } from './educational-indicators.component';

describe('EducationalIndicatorsComponent', () => {
  let component: EducationalIndicatorsComponent;
  let fixture: ComponentFixture<EducationalIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

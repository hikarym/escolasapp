import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioeconomicIndicatorsComponent } from './socioeconomic-indicators.component';

describe('SocioeconomicIndicatorsComponent', () => {
  let component: SocioeconomicIndicatorsComponent;
  let fixture: ComponentFixture<SocioeconomicIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocioeconomicIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocioeconomicIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

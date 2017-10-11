import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalVariablesComponent } from './educational-variables.component';

describe('EducationalVariablesComponent', () => {
  let component: EducationalVariablesComponent;
  let fixture: ComponentFixture<EducationalVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

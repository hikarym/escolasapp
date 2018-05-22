import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralInformationComponent } from './geral-information.component';

describe('GeralInformationComponent', () => {
  let component: GeralInformationComponent;
  let fixture: ComponentFixture<GeralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { BrSpRmspSecVariableService } from './br-sp-rmsp-sec-variable.service';

describe('BrSpRmspSecVariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrSpRmspSecVariableService]
    });
  });

  it('should be created', inject([BrSpRmspSecVariableService], (service: BrSpRmspSecVariableService) => {
    expect(service).toBeTruthy();
  }));
});

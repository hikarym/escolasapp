import { TestBed, inject } from '@angular/core/testing';

import { ApSecVariableService } from './ap-sec-variable.service';

describe('ApSecVariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApSecVariableService]
    });
  });

  it('should be created', inject([ApSecVariableService], (service: ApSecVariableService) => {
    expect(service).toBeTruthy();
  }));
});

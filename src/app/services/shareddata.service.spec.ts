import { TestBed, inject } from '@angular/core/testing';

import { ShareddataService } from './shareddata.service';

describe('ShareddataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareddataService]
    });
  });

  it('should be created', inject([ShareddataService], (service: ShareddataService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { EscolaService } from './escola.service';

describe('EscolaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscolaService]
    });
  });

  it('should be created', inject([EscolaService], (service: EscolaService) => {
    expect(service).toBeTruthy();
  }));
});

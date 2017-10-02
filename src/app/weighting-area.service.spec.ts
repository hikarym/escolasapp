import { TestBed, inject } from '@angular/core/testing';

import { WeightingAreaService } from './weighting-area.service';

describe('WeightingAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightingAreaService]
    });
  });

  it('should be created', inject([WeightingAreaService], (service: WeightingAreaService) => {
    expect(service).toBeTruthy();
  }));
});

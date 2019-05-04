import { TestBed } from '@angular/core/testing';

import { RagempService } from './ragemp.service';

describe('RagempService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RagempService = TestBed.get(RagempService);
    expect(service).toBeTruthy();
  });
});

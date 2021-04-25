import { TestBed } from '@angular/core/testing';

import { ParecerService } from './parecer.service';

describe('ParecerService', () => {
  let service: ParecerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParecerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

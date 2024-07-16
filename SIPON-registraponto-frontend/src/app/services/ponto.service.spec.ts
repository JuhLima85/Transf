import { TestBed } from '@angular/core/testing';

import { PontoService } from './ponto.service';

describe('PontoServiceService', () => {
  let service: PontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

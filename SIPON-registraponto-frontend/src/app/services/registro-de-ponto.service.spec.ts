import { TestBed } from '@angular/core/testing';

import { RegistroDePontoService } from './registro-de-ponto.service';

describe('RegistroDePontoService', () => {
  let service: RegistroDePontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroDePontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UsuarioMockadoService } from './usuario-mockado.service';

describe('UsuarioMockadoService', () => {
  let service: UsuarioMockadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioMockadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

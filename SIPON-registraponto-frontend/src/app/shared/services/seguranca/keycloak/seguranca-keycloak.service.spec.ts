import { TestBed } from '@angular/core/testing';

import { SegurancaKeycloakService } from './seguranca-keycloak.service';

describe('SegurancaKeycloakService', () => {
  let service: SegurancaKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegurancaKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

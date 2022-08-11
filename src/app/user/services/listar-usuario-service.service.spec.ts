import { TestBed } from '@angular/core/testing';

import { ListarUsuarioServiceService } from './listar-usuario-service.service';

describe('ListarUsuarioServiceService', () => {
  let service: ListarUsuarioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarUsuarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

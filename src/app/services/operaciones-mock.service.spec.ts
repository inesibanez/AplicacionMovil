import { TestBed } from '@angular/core/testing';

import { OperacionesMockService } from './operaciones-mock.service';

describe('OperacionesMockService', () => {
  let service: OperacionesMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionesMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

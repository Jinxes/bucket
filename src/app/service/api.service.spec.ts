import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { configureTestingModules } from '../app.test.factory';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      configureTestingModules
    );
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});

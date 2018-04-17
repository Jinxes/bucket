import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { configureTestingModules } from '../app.test.factory';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      configureTestingModules
    );
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});

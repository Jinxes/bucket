import { TestBed, inject } from '@angular/core/testing';
import { UtilService } from './util.service';
import { configureTestingModules } from '../app.test.factory';


describe('UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      configureTestingModules
    );
  });

  it('should be created', inject([UtilService], (service: UtilService) => {
    expect(service).toBeTruthy();
  }));
});

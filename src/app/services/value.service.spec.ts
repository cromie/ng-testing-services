import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Tests for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Tests for getObservableValue', () => {
    it('should return "observable value" from observable (then)', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        // assert
        expect(value).toBe('observable value');
        doneFn();
      });
    });

    // it('should return "observable value" from observable (async)', async () => {
    //   const res = await service.getObservableValue();
    //   expect(res).toBe('observable value');
    // });
  });
});

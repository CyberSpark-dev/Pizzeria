import { TestBed } from '@angular/core/testing';
import { Pizzeria } from './pizzeria';

describe('Pizzeria', () => {
  let service: Pizzeria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pizzeria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

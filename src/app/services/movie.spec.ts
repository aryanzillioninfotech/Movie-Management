import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie';

// import { Movie } from './movie';

describe('Movie', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

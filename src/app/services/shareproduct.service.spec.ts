import { TestBed } from '@angular/core/testing';

import { ShareproductService } from './shareproduct.service';

describe('ShareproductService', () => {
  let service: ShareproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

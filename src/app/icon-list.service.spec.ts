import { TestBed, inject } from '@angular/core/testing';

import { IconListService } from './icon-list.service';

describe('IconListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconListService]
    });
  });

  it('should be created', inject([IconListService], (service: IconListService) => {
    expect(service).toBeTruthy();
  }));
});

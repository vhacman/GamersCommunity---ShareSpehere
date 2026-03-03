import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreeTematiche } from './aree-tematiche';

describe('AreeTematiche', () => {
  let component: AreeTematiche;
  let fixture: ComponentFixture<AreeTematiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreeTematiche]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreeTematiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

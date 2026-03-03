import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostPopup } from './boost-popup';

describe('BoostPopup', () => {
  let component: BoostPopup;
  let fixture: ComponentFixture<BoostPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoostPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoostPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

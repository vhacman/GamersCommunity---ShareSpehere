import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoRuoli } from './gruppo-ruoli';

describe('GruppoRuoli', () => {
  let component: GruppoRuoli;
  let fixture: ComponentFixture<GruppoRuoli>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppoRuoli]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppoRuoli);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

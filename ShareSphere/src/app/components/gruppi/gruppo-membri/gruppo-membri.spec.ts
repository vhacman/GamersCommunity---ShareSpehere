import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoMembri } from './gruppo-membri';

describe('GruppoMembri', () => {
  let component: GruppoMembri;
  let fixture: ComponentFixture<GruppoMembri>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppoMembri]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppoMembri);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

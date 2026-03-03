import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoDetail } from './gruppo-detail';

describe('GruppoDetail', () => {
  let component: GruppoDetail;
  let fixture: ComponentFixture<GruppoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

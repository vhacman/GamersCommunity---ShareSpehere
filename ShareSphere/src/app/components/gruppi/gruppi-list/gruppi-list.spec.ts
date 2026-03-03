import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppiList } from './gruppi-list';

describe('GruppiList', () => {
  let component: GruppiList;
  let fixture: ComponentFixture<GruppiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppiList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppiList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticoli } from './admin-articoli';

describe('AdminArticoli', () => {
  let component: AdminArticoli;
  let fixture: ComponentFixture<AdminArticoli>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArticoli]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticoli);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

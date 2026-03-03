import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCollegato } from './account-collegato';

describe('AccountCollegato', () => {
  let component: AccountCollegato;
  let fixture: ComponentFixture<AccountCollegato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCollegato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCollegato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

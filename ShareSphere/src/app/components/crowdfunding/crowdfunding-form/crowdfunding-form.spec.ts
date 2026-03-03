import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingForm } from './crowdfunding-form';

describe('CrowdfundingForm', () => {
  let component: CrowdfundingForm;
  let fixture: ComponentFixture<CrowdfundingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdfundingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdfundingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

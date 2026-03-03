import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingDetail } from './crowdfunding-detail';

describe('CrowdfundingDetail', () => {
  let component: CrowdfundingDetail;
  let fixture: ComponentFixture<CrowdfundingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdfundingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdfundingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

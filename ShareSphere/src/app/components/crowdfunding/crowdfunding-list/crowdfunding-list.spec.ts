import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingList } from './crowdfunding-list';

describe('CrowdfundingList', () => {
  let component: CrowdfundingList;
  let fixture: ComponentFixture<CrowdfundingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdfundingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdfundingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicompenseCard } from './ricompense-card';

describe('RicompenseCard', () => {
  let component: RicompenseCard;
  let fixture: ComponentFixture<RicompenseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicompenseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RicompenseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

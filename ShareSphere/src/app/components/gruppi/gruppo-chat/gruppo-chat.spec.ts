import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoChat } from './gruppo-chat';

describe('GruppoChat', () => {
  let component: GruppoChat;
  let fixture: ComponentFixture<GruppoChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppoChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppoChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

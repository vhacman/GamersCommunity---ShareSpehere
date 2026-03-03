import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloHeader } from './profilo-header';

describe('ProfiloHeader', () => {
  let component: ProfiloHeader;
  let fixture: ComponentFixture<ProfiloHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

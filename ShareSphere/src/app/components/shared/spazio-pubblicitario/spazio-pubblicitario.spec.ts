import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpazioPubblicitario } from './spazio-pubblicitario';

describe('SpazioPubblicitario', () => {
  let component: SpazioPubblicitario;
  let fixture: ComponentFixture<SpazioPubblicitario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpazioPubblicitario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpazioPubblicitario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaProfilo } from './modifica-profilo';

describe('ModificaProfilo', () => {
  let component: ModificaProfilo;
  let fixture: ComponentFixture<ModificaProfilo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaProfilo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaProfilo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

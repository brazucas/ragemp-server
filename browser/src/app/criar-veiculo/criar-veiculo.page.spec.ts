import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarVeiculoPage } from './criar-veiculo.page';

describe('CriarVeiculoPage', () => {
  let component: CriarVeiculoPage;
  let fixture: ComponentFixture<CriarVeiculoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarVeiculoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarVeiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

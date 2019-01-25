import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaCartaoComponent } from './maquina-cartao.component';

describe('MaquinaCartaoComponent', () => {
  let component: MaquinaCartaoComponent;
  let fixture: ComponentFixture<MaquinaCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinaCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

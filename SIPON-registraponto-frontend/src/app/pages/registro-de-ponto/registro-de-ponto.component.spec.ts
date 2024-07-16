import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDePontoComponent } from './registro-de-ponto.component';

describe('RegistroDePontoComponent', () => {
  let component: RegistroDePontoComponent;
  let fixture: ComponentFixture<RegistroDePontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDePontoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDePontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

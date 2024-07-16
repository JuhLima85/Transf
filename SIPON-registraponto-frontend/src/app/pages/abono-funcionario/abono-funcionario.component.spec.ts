import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonoFuncionarioComponent } from './abono-funcionario.component';

describe('AbonoFuncionarioComponent', () => {
  let component: AbonoFuncionarioComponent;
  let fixture: ComponentFixture<AbonoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDoFuncionarioComponent } from './dados-do-funcionario.component';

describe('DadosDoFuncionarioComponent', () => {
  let component: DadosDoFuncionarioComponent;
  let fixture: ComponentFixture<DadosDoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosDoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosDoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

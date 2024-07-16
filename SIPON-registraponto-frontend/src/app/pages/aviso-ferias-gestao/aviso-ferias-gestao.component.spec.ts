import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoFeriasGestaoComponent } from './aviso-ferias-gestao.component';

describe('AvisoFeriasGestaoComponent', () => {
  let component: AvisoFeriasGestaoComponent;
  let fixture: ComponentFixture<AvisoFeriasGestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoFeriasGestaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoFeriasGestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

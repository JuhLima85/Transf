import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoFeriasComponent } from './aviso-ferias.component';

describe('AvisoFeriasComponent', () => {
  let component: AvisoFeriasComponent;
  let fixture: ComponentFixture<AvisoFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoFeriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

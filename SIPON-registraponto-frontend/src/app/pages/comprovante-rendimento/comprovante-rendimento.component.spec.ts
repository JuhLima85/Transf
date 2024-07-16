import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprovanteRendimentoComponent } from './comprovante-rendimento.component';

describe('ComprovanteRendimentoComponent', () => {
  let component: ComprovanteRendimentoComponent;
  let fixture: ComponentFixture<ComprovanteRendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprovanteRendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprovanteRendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

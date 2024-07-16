import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraChequeComponent } from './contra-cheque.component';

describe('ContraChequeComponent', () => {
  let component: ContraChequeComponent;
  let fixture: ComponentFixture<ContraChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraChequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

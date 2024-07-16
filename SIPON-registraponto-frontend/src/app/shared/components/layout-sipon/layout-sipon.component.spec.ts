import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSiponComponent } from './layout-sipon.component';

describe('LayoutSiponComponent', () => {
  let component: LayoutSiponComponent;
  let fixture: ComponentFixture<LayoutSiponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutSiponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSiponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

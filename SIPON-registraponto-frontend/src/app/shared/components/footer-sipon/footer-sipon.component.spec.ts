import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSiponComponent } from './footer-sipon.component';

describe('FooterSiponComponent', () => {
  let component: FooterSiponComponent;
  let fixture: ComponentFixture<FooterSiponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSiponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSiponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

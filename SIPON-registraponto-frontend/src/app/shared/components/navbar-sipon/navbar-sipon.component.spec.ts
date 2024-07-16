import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSiponComponent } from './navbar-sipon.component';

describe('NavbarSiponComponent', () => {
  let component: NavbarSiponComponent;
  let fixture: ComponentFixture<NavbarSiponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSiponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSiponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

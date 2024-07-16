import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { logout } from 'src/app/utils/app-init';

@Component({
  selector: 'app-navbar-sipon',
  templateUrl: './navbar-sipon.component.html',
  styleUrls: ['./navbar-sipon.component.css']
})
export class NavbarSiponComponent implements OnInit {
  nomeUsuario: string = 'Cristina Lima';

  constructor(private KeycloakService: KeycloakService) {}

  ngOnInit(): void {
    // no aguardo das funcionalidades
  }

  logout() {
   logout(this.KeycloakService)();    
  }
}

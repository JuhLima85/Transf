import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular 12 Crud';

  constructor(private keycloakService:KeycloakService,){

  }
  async ngOnInit() {
    if(await this.keycloakService.isLoggedIn()){
      console.log('Logado');
    }
  }
}

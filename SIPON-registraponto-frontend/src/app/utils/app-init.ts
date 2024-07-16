import { KeycloakService,KeycloakOptions } from 'keycloak-angular';
import { SegurancaKeycloakService } from '../shared/services/seguranca/keycloak/seguranca-keycloak.service';

export function initializer(keycloakService: KeycloakService, segurancaKeycloakService: SegurancaKeycloakService ) {
  return (): Promise<any> => {
 
    let confAngular:KeycloakOptions = {     
      
        config: {
            clientId: 'cli-web-pon', 
            realm: 'intranet', 
            url:'https://login.des.caixa/auth' 
        },
        initOptions: {
            checkLoginIframe: false,
            onLoad: "login-required",           
            responseMode: "query", 
        },
        loadUserProfileAtStartUp: false
    }
    return  keycloakService.init( confAngular ).then(() => {
      console.log('sucesso.');
    })
    .catch(error => {
      console.error('Erro ao inicializae o Keycloak: ', error);
    });      
  }
  }
 
export function logout(keycloakService: KeycloakService) {
  return () => keycloakService.logout();
} 
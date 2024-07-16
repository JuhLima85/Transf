import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';  
import { KeycloakService } from 'keycloak-angular';

type CanActivateResul = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  
  constructor(private keycloakService: KeycloakService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): CanActivateResul {     
      if(!this.keycloakService.isLoggedIn()){        
        this.keycloakService.login();
        return false;
      }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): CanActivateResul {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): CanActivateResul {
    return true;
  }
}

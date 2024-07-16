import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroDePontoService {

  constructor() { 
    // no aguardo das funcionalidades
  }
  
  registrarPonto(): Observable<'success'> { 
    return of('success'); 
  }
  
}

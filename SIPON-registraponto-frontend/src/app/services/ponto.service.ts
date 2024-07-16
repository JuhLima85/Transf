import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PontoService {
  //serviço para gerenciar a comunicação entre o modal e o componente de registro de ponto.

  private registrarPontoSubject = new Subject<void>();

  registrarPonto$ = this.registrarPontoSubject.asObservable();

  constructor() { }

  solicitarRegistroDePonto() {
    this.registrarPontoSubject.next();
  }
}

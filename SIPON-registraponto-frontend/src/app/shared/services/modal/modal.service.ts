import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModalSubject = new BehaviorSubject<boolean>(false);
  showModal$ = this.showModalSubject.asObservable();

  abrirModal() {
    this.showModalSubject.next(true);
  }

  fecharModal() {
    this.showModalSubject.next(false);
  }

  constructor() { 
    // no aguardo das funcionalidades
  }
}

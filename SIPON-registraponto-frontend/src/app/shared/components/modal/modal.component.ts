import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { RegistroDePontoComponent } from '../../../pages/registro-de-ponto/registro-de-ponto.component';
import { ModalService } from '../../services/modal/modal.service';
import { PontoService } from '../../../services/ponto.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() horarioLocal: string = '';
  mensagemErro: string = '';
  showModal: boolean = false;

  @ViewChild('buttonRegistrarPonto', { static: false }) buttonRegistrarPonto!: ElementRef; 

  constructor(
    private modalService: ModalService,
    //private registroDePontoComponent: RegistroDePontoComponent 
    private pontoService: PontoService   
    ) { }

    ngOnInit(): void {
      this.modalService.showModal$.subscribe(showModal => {
        this.showModal = showModal;
      });
    }
  
    ngAfterViewInit(): void {
      if (this.showModal && this.buttonRegistrarPonto) {
        this.buttonRegistrarPonto.nativeElement.focus();
      }
    }

  closeModal() {
    this.modalService.fecharModal(); 
  }

  registrarPonto() {
    //this.registroDePontoComponent.registrarPonto(); 
    this.pontoService.solicitarRegistroDePonto(); 
    this.modalService.fecharModal();
  }

  cancelar() {
    this.modalService.fecharModal(); 
  }
}

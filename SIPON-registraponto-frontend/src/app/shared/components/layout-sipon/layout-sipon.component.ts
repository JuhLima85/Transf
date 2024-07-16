import { Component, OnInit, HostBinding  } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal/modal.service'; 

@Component({
  selector: 'app-layout-sipon',
  templateUrl: './layout-sipon.component.html',
  styleUrls: ['./layout-sipon.component.css']
})
export class LayoutSiponComponent implements OnInit { 
  @HostBinding('class.modal-open') modalAberto = false;
  modalService: ModalService;

  constructor(  modalService: ModalService) {
   this.modalService = modalService; // Atribuir o valor no construtor
  } 

  ngOnInit(): void {
      // Inscreva-se no Observable showModal$ do ModalService
      this.modalService.showModal$.subscribe(showModal => {
        this.modalAberto = showModal; // Atualize modalAberto com base no estado do modal
      });
  }

  get showModal() { // Getter público para acessar showModal$
    return this.modalService.showModal$;
  }

}

import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  styleUrls: ['./accordion-menu.component.scss']
})
export class AccordionMenuComponent implements OnInit {
  panelOpenState = false;
  @Input() model:any
  subServicoSelecionado: string = ''
  servicoSelecionado: string = ''

  constructor() {
    //no aguardo dos serviços
   }

  ngOnInit(): void {
    //no aguardo dos serviços
  }

}

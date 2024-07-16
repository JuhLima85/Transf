import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { 
    // no aguardo das funcionalidades

  }

  itensMenuLateral =  [
    {
        label: "Menu Principal",
        visible: true,
        items: [
  
            {
                label: "Home",
                icon: "home",
                items: [],
                routerLink:'home'
            },
            {
                label: "Financeiro",
                icon: "work",
                items: [
                    {
                        label: "Contracheque",
                        icon: "assets/images/novo_web/icon contracheque.png",
                        routerLink: "contraCheque"
                    },
                    {
                        label: "Comprovante de rendimento",
                        icon: "assets/images/novo_web/icon comp rendimento.png",
                        routerLink: "comprovanteRendimento"
                    },
                    {
                        label: "Auxílios refeição e alimentação",
                        icon: "assets/images/novo_web/icon alimentacao.png",
                       // routerLink: "/dadosDoFuncionario/"
                    },
                    {
                        label: "Adiantamentos",
                        icon: "assets/images/novo_web/icon adiantamentos.png",
                       // routerLink: "/dadosDoFuncionario/"
                    },
                    {
                        label: "FUNCEF",
                        icon: "assets/images/novo_web/icon funcef.png",
                       // routerLink: "/dadosDoFuncionario/"
                    }
  
                ]
            },
            {
                label: "Férias e afastamentos",
                icon: "beach_access",
                items: [
                    {
                        label: "Atestados e licenças",
                        icon: "medical_services",
                        // routerLink: "/dadosDoFuncionario/"
                    },
                    {
                        label: "APIP/LP",
                        icon: "assets/images/novo_web/Icon apip.png",
                        // routerLink: "/abonoFuncionario/"
                    },
                    {
                        label: "Calendário de afastamentos",
                        icon: "event_note",
                        // routerLink: "/comprovanteRendimento/"
                    },
                    {
                        label: "Aviso de férias",
                        icon: "assets/images/novo_web/icon ferias.png",
                        routerLink: "avisoFerias"
                    }
                ]
            },
            {
                label: "Empregado",
                icon: "assets/images/novo_web/icon empregado.png",
                items: [
                    {
                        label: "Resultados GDP",
                        icon: "assets/images/novo_web/icon gdp.png",
                        // routerLink: "/dadosDoFuncionario/"
                    },
                   
                ]
            },
            {
                label: "Perfil",
                icon: "account_circle",
                items: [],
                routerLink:'dadosDoFuncionario'
            }
        ]
    },
  ];
    getItensMenuLateral() {
      return this.itensMenuLateral
    }
}

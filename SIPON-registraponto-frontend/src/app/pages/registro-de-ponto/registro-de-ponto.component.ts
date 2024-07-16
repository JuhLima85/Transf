import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarcacoesPonto } from 'src/app/models/marcacoes-ponto';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { RegistroDePontoService } from '../../services/registro-de-ponto.service';
import { PontoService } from 'src/app/services/ponto.service';

@Component({
  selector: 'app-registro-de-ponto',
  templateUrl: './registro-de-ponto.component.html',
  styleUrls: ['./registro-de-ponto.component.css']
})
export class RegistroDePontoComponent implements OnInit { 
  jornadaTrabalho: 'normal' | 'noturna' = 'normal'; 
  dataPosterior: string = '';  
  dataAtual: string = ''; 
  horarioAtual: string = '';  
  botaoDesabilitado: boolean = false;   
  marcacoes: MarcacoesPonto[] = [];    

  mensagemFeedback: string = '';
  tituloMensagem: string = '';
  tipoMensagem: 'success';

  modalService: ModalService;    

  constructor( 
    modalService: ModalService,
    private registroDePontoService: RegistroDePontoService,
    private pontoService: PontoService,) 
    {
    this.modalService = modalService;
  } 

  ngOnInit(): void {
    this.iniciarAtualizacaoDataHorario();   
    this.carregarMarcacoes(); 
    this.verificarEstadoBotao(); 
    this.pontoService.registrarPonto$.subscribe(() => {
      this.registrarPonto();
    });
  }

  iniciarAtualizacaoDataHorario() {
    interval(1000)
      .pipe(
        map(() => {
          const now = new Date();
          const amanha = new Date(now);
          amanha.setDate(now.getDate() + 1); 

          this.horarioAtual = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          this.dataAtual = now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
          this.dataPosterior = amanha.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });

          return this.horarioAtual; 
        })
      )
      .subscribe();
  }
  
  carregarMarcacoes() {
    const dataHoje = new Date();

    this.marcacoes = [
      new MarcacoesPonto(new Date(dataHoje.setHours(8, 0, 0)), new Date(dataHoje.setHours(11, 0, 0))), 
      new MarcacoesPonto(new Date(dataHoje.setHours(11, 30, 0)), new Date(dataHoje.setHours(15, 0, 0))),
      new MarcacoesPonto(new Date(dataHoje.setHours(15, 15, 0)), new Date(dataHoje.setHours(17, 0, 0))),
      new MarcacoesPonto(new Date(dataHoje.setHours(18, 0, 0)), new Date(dataHoje.setHours(18, 15, 0))),
      new MarcacoesPonto(new Date(dataHoje.setHours(19, 0, 0)), new Date(dataHoje.setHours(19, 15, 0))),
      new MarcacoesPonto(new Date(dataHoje.setHours(20, 0, 0)), new Date(dataHoje.setHours(20, 30, 0))), 
      /*new MarcacoesPonto(new Date(dataHoje.setHours(19, 0, 0)), new Date(dataHoje.setHours(19, 15, 0))),
      new MarcacoesPonto(new Date(dataHoje.setHours(20, 0, 0)), new Date(dataHoje.setHours(20, 30, 0))), */    
    ];    
  }

isMarcacaoValida(marcacao: MarcacoesPonto): boolean {
  return marcacao.entrada !== null || marcacao.saida !== null;
}
 
formatarHora(data: Date | null): string {
  return data ? data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'; 
}

 // Determina qual será a próxima marcação de ponto (entrada ou saída) com base nas marcações existentes.
get proximaMarcacao(): string {
  if (this.marcacoes.length === 0) {
    return 'Entrada'; 
  }  
  const ultimaMarcacao = this.marcacoes[this.marcacoes.length - 1];
  return ultimaMarcacao.saida === null ? 'Saída' : 'Entrada';
}
 
  abrirModal() {
    this.modalService.abrirModal(); 
  }  
  
  // Desabilitação do botão quando a quantidade de pares completos for maior ou igual a 4.
  verificarEstadoBotao(): void {
    const paresDeRegistrosCompletos = this.marcacoes.filter(marcacao => {
      return marcacao.entrada !== null && marcacao.saida !== null; 
    }).length / 2; 
    this.botaoDesabilitado = paresDeRegistrosCompletos >= 4; 
  }

  registrarPonto() {
    this.registroDePontoService.registrarPonto().subscribe(resultado => {
      if (resultado === 'success') { 
        this.tituloMensagem = 'Inclusão efetuada!';
        this.mensagemFeedback = 'Você registrou o seu ponto eletrônico com sucesso!';
        this.tipoMensagem = 'success';
      } 
  
      this.carregarMarcacoes();
      this.verificarEstadoBotao();
      console.log("Ponto registrado !!!!");
    });
  }
}

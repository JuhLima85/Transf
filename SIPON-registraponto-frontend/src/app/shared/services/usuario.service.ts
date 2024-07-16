import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../arquitetura/services/base.service";
import {UsuarioModel} from "../model/usuario.model";
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  matriculaUsuario = 23123;

  public onIdleStart: EventEmitter<void>;
  public onIdleTimeLimit: EventEmitter<number>;
  public onIdleEnd: EventEmitter<void>;
  public onTimeout: EventEmitter<void>;

  constructor(public http: HttpClient,public idle: Idle) {

     // Intercepta as interrupções padrões: clicks, rolagens, etc.
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

     this.onIdleStart = new EventEmitter<void>();
     this.onIdleTimeLimit = new EventEmitter<number>();
     this.onIdleEnd = new EventEmitter<void>();
     this.onTimeout = new EventEmitter<void>();
 
     idle.onIdleStart.subscribe(() => {
       // Pergunta se quer continuar usando o sistema
       this.onIdleStart.emit();
     });
     idle.onTimeoutWarning.subscribe(
       (countdown) => {
         // Atualiza a pergunta com o tempo restante
         this.onIdleTimeLimit.emit(countdown);
       });
     idle.onIdleEnd.subscribe(() => {
       // Fecha a (janela da) pergunta anterior
       this.onIdleEnd.emit();
     });
     idle.onTimeout.subscribe(() => {
       // Fecha a (janela da) pergunta anterior e
       // redireciona para o login com uma mensagem de timeout
       this.onTimeout.emit();
     });
  }

  usuarioLogado:any
  usuarioLogadoSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null)
  usuarioLogado$: Observable<any> = this.usuarioLogadoSubject.asObservable();

  consultarUsuarioLogado(matriculaUsuario:any){    
    return this.http.get(environment.apiUrl + '/gestao-etica/info-empregado/empregado/' + matriculaUsuario).pipe(
      tap((data:any) => this.usuarioLogadoSubject.next(data))
     )
  }

  mockarUsuarioLogado(matriculaUsuario:any){
    this.usuarioLogadoSubject.next({
      
        "matricula": matriculaUsuario,
        "nome": 'c' + matriculaUsuario,
        "unidade-lotacao": {
            "codigo": 7736,
            "numero-natural": 5788,
            "nome-unidade": "CONCILIACAO E QUALIF DE TRANSACOES",
            "sigla-unidade": "CECOQ"
        }
    
    })
  }

  getUsuarioLogado() {
    return this.usuarioLogadoSubject.value
  }

  getUnidadesSubordinadasUsuarioLogado(numeroUnidade:any): Observable<any>{
    return this.http.get(environment.apiUrl + '/gestao-etica/info-empregado/hierarquia-unidades-subordinadas/' + numeroUnidade)
  }
  getUnidadesSuperioresUsuarioLogado(numeroUnidade:any): Observable<any>{
    return this.http.get(environment.apiUrl + '/gestao-etica/info-empregado/hierarquia-unidades-superiores/' + numeroUnidade)
  }
  

  getReqUsuarioLogado(matriculaUsuario:any): Observable<any>{    
    return this.http.get(environment.apiUrl + '/gestao-etica/info-empregado/empregado/' + matriculaUsuario)
  }


  isGestorDeSistemas():boolean {
    return localStorage.getItem('userRole') === 'ETI001' ? true : false
  }
  isGestorDeSistemasSobDemanda():boolean {
    return localStorage.getItem('userRole') === 'ETI002' ? true : false
  }
  isGestorDeAtas():boolean {
    return localStorage.getItem('userRole') === 'ETI003' ? true : false
  }
  isAuditor():boolean {
    return localStorage.getItem('userRole') === 'ETI004' ? true : false
  }


    /**
   * Inicializa o controle de timeout (idle) da sessão
   *
   * @param inicioSessao define se a sessão está necessariamente sendo criada
   */
    // private inicializarControleTimeout(inicioSessao: boolean = false) {
    //   let timeout: number = SessaoService.configuracoesSeguranca.tempoMaximoIdle;
    //   if (timeout <= 0) {
    //     timeout = KeycloakService.getAccessTokenLifespan();
    //   }
  
    //   // Só reinicia a checagem de idle caso esteja vindo do login
    //   if (inicioSessao ||
    //     // ou o serviço de checagem não tenha iniciado ainda
    //     (!this.idle.isRunning()) ||
    //     // ou o tempo de duração do token (e da sessão) tenha mudado
    //     (this.idle.getIdle() != SessaoService.getIdleTime(timeout))) {
    //     this.iniciarControleTimeout(timeout);
    //   }
    // }
  
    /**
     * Inicia o controle de timeout da sessão
     *
     * @param timeout
     */
    // private iniciarControleTimeout(timeout: number) {
    //   if (timeout <= 1) {
    //     return;
    //   }
  
    //   this.idle.setIdle(SessaoService.getIdleTime(timeout));
    //   this.idle.setTimeout(60);
    //   this.idle.watch();
    // }
  
    /**
     * Apaga os dados da sessão
     */
    // private limparDadosSessao() {
    //   SessaoService.usuarioAutenticado = null;
    //   this.jwtToken = null;
    //   this.usuarioStorage.limpar();
    // }


}

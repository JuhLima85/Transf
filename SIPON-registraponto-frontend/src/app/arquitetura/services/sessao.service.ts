import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioModel} from "../../shared/model/usuario.model";
import {UsuarioService} from "../../shared/services/usuario.service";
import {AlertaService} from "./alerta.service";
import {KeycloakService} from "../../shared/services/keycloak.service";
import {UsuarioStorage} from "../../shared/storage/usuario-storage";
import {JwtToken} from "../../shared/model/seguranca/jwt-token";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ConfiguracaoSegurancaService} from "./configuracao-seguranca.service";
import {ConfiguracoesSeguranca} from "../../shared/model/seguranca/configuracoes-seguranca";
import {JwtTokenClaims} from "../../shared/model/seguranca/jwt-token-claims";
import {TipoAlertaEnum} from "../../shared/model/alerta.model";
import Keycloak from "keycloak-js";
import {NotificacaoAgrupadorModel} from "../../shared/model/notificacao/notificacao-agrupador.model";

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  static usuarioAutenticado: UsuarioModel = null;
  static notificacao: NotificacaoAgrupadorModel;
  static qtdeNotificacoes: number;
  static configuracoesSeguranca: ConfiguracoesSeguranca = null;

  public onIdleStart: EventEmitter<void>;
  public onIdleTimeLimit: EventEmitter<number>;
  public onIdleEnd: EventEmitter<void>;
  public onTimeout: EventEmitter<void>;

  private jwtToken: JwtToken;
  private readonly usuarioStorage: UsuarioStorage;

  constructor(
    private configuracaoSegurancaService: ConfiguracaoSegurancaService,
    private usuarioService: UsuarioService,
    private idle: Idle,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private alertaService: AlertaService
  ) {
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

    this.usuarioStorage = new UsuarioStorage();
  }


  /**
   * Inicializa de forma estática toda a sessão do usuário, envolvendo:
   * - Integração com o Keycloak
   * - Recuperar o usuário logado
   * - Recuperar as configurações de segurança
   *
   * Essas chamadas tem que ser feitas todas de uma vez, antes de iniciar
   * a aplicação de fato, pois, envolvem chamadas assíncronas de HTTP que,
   * se não forem resolvidas de início, impactarão na ordem de execução do
   * sistema (um código que dependa da sessão estar carregada e o usuário
   * logado devidamente identificado pode não funcionar corretamente).
   */
  static init(): Promise<number> {
    return new Promise((resolve) => {
      // Configurações de Segurança
      ConfiguracaoSegurancaService.get().then((configuracoesSeguranca: ConfiguracoesSeguranca) => {
        SessaoService.configuracoesSeguranca = configuracoesSeguranca;
        KeycloakService.auth.logoutUrl = configuracoesSeguranca.urlServidorAutorizacao
          + '/realms/' + configuracoesSeguranca.realm + '/protocol/openid-connect/logout?redirect_uri='
          + document.baseURI;
        KeycloakService.auth.loggedIn = false;

        //KeycloakService.getToken()

        const keycloak = new Keycloak({
          url: configuracoesSeguranca.urlServidorAutorizacao,
          realm: configuracoesSeguranca.realm,
          clientId: configuracoesSeguranca.idCliente
        });

        keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: false
        }).then(function (authenticated) {
          if (!authenticated) {
            KeycloakService.logout();
          } else {
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloak;
          }
        }).catch(function () {
          KeycloakService.logout();
        });

        resolve(0);
      }).catch(() => resolve(1));
    });
  }

  static perfil(): string {
    if (SessaoService.usuarioAutenticado && SessaoService.usuarioAutenticado.perfis.length > 0) {
      return SessaoService.usuarioAutenticado.perfis[0];
    }

    return '';
  }

  static isPerfil(perfil: string | number) {
    if (SessaoService.usuarioAutenticado) {
      if (Number.isInteger(perfil)) {
        perfil = "RVD000" + perfil;
      }

      return SessaoService.usuarioAutenticado.perfis.some(i => i == perfil);
    }

    return false;
  }

  static isRepresentanteAreaNegocios(): boolean {
    return SessaoService.isPerfil('RVD0002');
  }

  static isRepresentanteRisco(): boolean {
    return SessaoService.isPerfil('RVD0003');
  }

  static isRepresentanteTI(): boolean {
    return SessaoService.isPerfil('RVD0004');
  }

  static isDirigente(): boolean {
    return SessaoService.isPerfil('RVD0008');
  }

  static isGestor(valor: number | string = null): boolean {
    if (valor) {
      return valor === 1 || valor === 'RVD0001';
    }
    return SessaoService.isPerfil('RVD0001');
  }

  static isConselhoAdministracao(): boolean {
    return SessaoService.isPerfil('RVD0006');
  }

  static isPresidenteCaixa(): boolean {
    return SessaoService.isPerfil('RVD0007');
  }

  private static getIdleTime(timeout: number): number {
    return (timeout - 1) * 60;
  }

  public inicializarSessao() {
    this.finalizarSessao();

    // Grava o token recebido para usar nas próximas requisições
    this.setToken(KeycloakService.getLastRetrievedToken(), true);

    // Define as configurações de segurança
    if (SessaoService.configuracoesSeguranca.tempoVidaToken <
      this.getTokenClaims().getExpirationTime()) {
      KeycloakService.setAccessTokenLifespan(
        SessaoService.configuracoesSeguranca.tempoVidaToken);
    } else {
      KeycloakService.setAccessTokenLifespan(
        this.getTokenClaims().getExpirationTime());
    }

    // Grava o usuário (e seus dados)
    this.setUsuario(SessaoService.usuarioAutenticado);
  }

  /**
   * Armazena o token de acesso e inicia o controle de idle
   * de sessão.
   */
  public setToken(token: string, inicioSessao: boolean = false) {
    this.jwtToken = new JwtToken();
    this.jwtToken.token = token;
    this.inicializarControleTimeout(inicioSessao);
  }

  /**
   * Retorna o token de acesso
   */
  public getToken(): JwtToken {
    if (!this.jwtToken) {
      this.setToken(KeycloakService.getLastRetrievedToken(), true);
    }

    return this.jwtToken;
  }

  public atualizarToken(): Promise<string> {
    return new Promise(async (resolve) => {
      try {
        await KeycloakService.getToken();

        const token: string = KeycloakService.getLastRetrievedToken();
        this.setToken(token, false);

        resolve(token);
      } catch (error) {
        resolve(null);
      }
    });
  }

  /**
   * Retorna campos de informação do token
   */
  public getTokenClaims(): JwtTokenClaims {
    return this.getToken().getClaims(this.jwtHelperService);
  }

  /**
   * Armazena os dados do usuário logado
   *
   * @param usuario
   */
  public setUsuario(usuario: UsuarioModel) {
    SessaoService.usuarioAutenticado = new UsuarioModel();
    Object.assign(SessaoService.usuarioAutenticado, usuario);
    this.usuarioStorage.gravar(SessaoService.usuarioAutenticado);
  }

  /**
   * Verifica se tem um usuário logado
   */
  public isLogado() {
    return KeycloakService.isAuthenticated();
  }

  /**
   * Roteia para o home
   */
  public rotearParaHome() {
    this.router.navigate(['/home']);
  }

  /**
   * Roteia para o logout
   */
  public rotearParaLogout() {
    KeycloakService.logout();
  }

  public verificarAutenticacao(): boolean {
    if (!this.isLogado()) {
      this.rotearParaLogout();
      return false;
    }

    return true;
  }

  /**
   * Verifica se tem o perfil informado
   * @param perfil
   */
  public validarPermissao(perfil: string): boolean {
    if (!this.isLogado()) {
      return false;
    }
    return SessaoService.isPerfil(perfil);
  }

  /**
   * Apaga os dados da sessão e roteia para o login
   */
  public finalizarSessao(rotearParaLogin?: boolean, motivoSessaoExpirada?: boolean) {
    this.limparDadosSessao();
    this.idle.stop();
    if (rotearParaLogin) {
      KeycloakService.logout();
    }
    if (motivoSessaoExpirada) {
      this.alertaService.adicionar({
        mensagem: 'Sua sessão expirou. Realize o login novamente.',
        tipo: TipoAlertaEnum.WARNING
      });
    }
  }

  /**
   * Inicializa o controle de timeout (idle) da sessão
   *
   * @param inicioSessao define se a sessão está necessariamente sendo criada
   */
  private inicializarControleTimeout(inicioSessao: boolean = false) {
    let timeout: number = SessaoService.configuracoesSeguranca.tempoMaximoIdle;
    if (timeout <= 0) {
      timeout = KeycloakService.getAccessTokenLifespan();
    }

    // Só reinicia a checagem de idle caso esteja vindo do login
    if (inicioSessao ||
      // ou o serviço de checagem não tenha iniciado ainda
      (!this.idle.isRunning()) ||
      // ou o tempo de duração do token (e da sessão) tenha mudado
      (this.idle.getIdle() != SessaoService.getIdleTime(timeout))) {
      this.iniciarControleTimeout(timeout);
    }
  }

  /**
   * Inicia o controle de timeout da sessão
   *
   * @param timeout
   */
  private iniciarControleTimeout(timeout: number) {
    if (timeout <= 1) {
      return;
    }

    this.idle.setIdle(SessaoService.getIdleTime(timeout));
    this.idle.setTimeout(60);
    this.idle.watch();
  }

  /**
   * Apaga os dados da sessão
   */
  private limparDadosSessao() {
    SessaoService.usuarioAutenticado = null;
    this.jwtToken = null;
    this.usuarioStorage.limpar();
  }
}

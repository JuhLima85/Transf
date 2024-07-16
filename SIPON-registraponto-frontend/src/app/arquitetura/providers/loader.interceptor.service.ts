import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoaderService} from '../services/loader.service';
import {SessaoService} from "../services/sessao.service";
import {ConfiguracaoSegurancaService} from "../services/configuracao-seguranca.service";
import {AlertaService} from "../services/alerta.service";
import {TipoAlertaEnum} from "../../shared/model/alerta.model";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private readonly loaderService: LoaderService,
    private readonly sessaoService: SessaoService,
    private readonly alertaService: AlertaService
  ) {
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/' + ConfiguracaoSegurancaService.CONFIGURACAO_SEGURANCA_SERVICE_URL)) {
      return next.handle(req);
    }

    this.requests.push(req);
    this.loaderService.isLoading.next(true);

    return Observable.create(async observer => {
      const token: string = await this.sessaoService.atualizarToken();
      if (token == null) {
        this.processarErroAutenticacao();
        observer.error({});
        return () => {
        };
      }

      let handledReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      const subscription = next.handle(handledReq).subscribe(async event => {
        if (event instanceof HttpResponse) {
          this.removeRequest(req);
          observer.next(event);
        }
      }, error => {
        this.removeRequest(req);
        observer.error(error);

        this.sessaoService.finalizarSessao(true);
      }, () => {
        this.removeRequest(req);
        observer.complete();
      });

      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }


  /**
   * 401 Unauthorized: apesar do nome, representa erro de autenticação
   */
  private processarErroAutenticacao() {
    this.alertaService.adicionar({
      tipo: TipoAlertaEnum.WARNING,
      mensagem: 'Sua sessão expirou. Realize o login novamente.'
    });

    // FIXME testar isso
    this.sessaoService.finalizarSessao(true);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {ConfiguracoesSeguranca} from "../../shared/model/seguranca/configuracoes-seguranca";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoSegurancaService {
  static readonly CONFIGURACAO_SEGURANCA_SERVICE_URL: string = 'seguranca/configuracao-seguranca';

  constructor(protected readonly http: HttpClient) {
  }

  /**
   * Recupera a url do endpoint correspondente
   */
  static getEndpointUrl(): string {
    return environment.baseURL + ConfiguracaoSegurancaService.CONFIGURACAO_SEGURANCA_SERVICE_URL;
  }

  /**
   * Recupera configurações de segurança de forma estática, para funcionar na
   * inicialização do sistema.
   */
  static get(): Promise<ConfiguracoesSeguranca> {
    return new Promise((resolve, reject) => {
      let url: string = ConfiguracaoSegurancaService.getEndpointUrl();

      let req: XMLHttpRequest = new XMLHttpRequest();
      req.open('GET', url, true);
      req.setRequestHeader('Accept', 'application/json');

      req.onreadystatechange = () => {
        if (req.readyState == 4) {
          if (req.status == 200) {
            resolve(JSON.parse(req.responseText));
          } else {
            reject();
          }
        }
      }

      req.send();
    });
  }
}

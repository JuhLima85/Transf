import {Subject} from "rxjs";
import {HistoricoGradacaoModel} from "../../shared/model/historico/historico-gradacao.model";
import {HistoricoProgramaModel} from "../../shared/model/historico/historico-programa.model";
import {AuditoriaPagamentoModel} from "../../shared/model/auditoria/auditoria-pagamento.model";
import {HistoricoGrupoModel} from "../../shared/model/historico/historico-grupo.model";
import {AuditoriaIndicadorModel} from "../../shared/model/auditoria/auditoria-indicador.model";
import {
  AuditoriaProgramaGrupoIndicadorModel
} from "../../shared/model/auditoria/auditoria-programa-grupo-indicador.model";
import {HistoricoProgramaParcelaModel} from "../../shared/model/historico/historico-programa-parcela.model";
import {AuditoriaProgramaDirigenteModel} from "../../shared/model/auditoria/auditoria-programa-dirigente.model";
import {AuditoriaAgendamentoProgramaModel} from "../../shared/model/auditoria/auditoria-agendamento-programa.model";
import {AuditoriaGrupoUnidadeModel} from "../../shared/model/auditoria/auditoria-grupo-unidade.model";
import {Router} from "@angular/router";

declare let $: any;

export class Util {
  static AUDITORIA_PROGRAMA_AGENDAMENTO = new Subject<AuditoriaAgendamentoProgramaModel[]>();
  static AUDITORIA_PROGRAMA_GRUPO_INDICADOR = new Subject<AuditoriaProgramaGrupoIndicadorModel[]>();
  static AUDITORIA_PROGRAMA_DIRIGENTE = new Subject<AuditoriaProgramaDirigenteModel[]>();
  static AUDITORIA_INDICADOR = new Subject<AuditoriaIndicadorModel[]>();
  static AUDITORIA_GRUPO_UNIDADE = new Subject<AuditoriaGrupoUnidadeModel[]>();
  static AUDITORIA_PROGRAMA_PARCELA = new Subject<HistoricoProgramaParcelaModel[]>();
  static AUDITORIA_GRUPO = new Subject<HistoricoGrupoModel[]>();
  static AUDITORIA_PAGAMENTO = new Subject<AuditoriaPagamentoModel[]>();
  static PROGRAMA_DADOS_GERAIS = new Subject<HistoricoProgramaModel[]>();
  static AUDITORIA_GRADACAO = new Subject<HistoricoGradacaoModel[]>();

  static removeMascara(valor: string | number): number {
    if (Number.isInteger(valor)) {
      return Number(valor);
    } else if (!valor) {
      return null;
    }

    valor = String(valor);
    let ret: string = '';
    for (let i = 0; i < valor.length; i++) {
      if (valor[i] >= '0' && valor[i] <= '9') {
        ret += valor[i];
      }
    }

    return Number(ret);
  }

  static abrirModal(idModal: string) {
    $('#' + idModal).modal('show');
  };

  static formataTelefone(valor: any): string {
    if (valor) {
      let s = String(valor);
      if (s.length == 10) {
        return `(${s.substr(0, 2)}) ${s.substr(2, 4)}-${s.substr(6, 4)}`
      } else if (s.length == 11) {
        return `(${s.substr(0, 2)}) ${s.substr(2, 5)}-${s.substr(7, 4)}`
      }
    }

    return null;
  }

  static fecharModal(idModal: string) {
    $('#' + idModal).modal('hide');

    $('.modal-backdrop').remove()
    $(document.body).removeClass("modal-open");
  };

  static ifState(router: Router, callback: (state: any) => void, notFound: () => void = null) {
    if (router.getCurrentNavigation() && router.getCurrentNavigation().extras && router.getCurrentNavigation().extras.state) {
      callback(router.getCurrentNavigation().extras.state);
    } else if (notFound) {
      notFound();
    }
  }

  static getMensagemErro(falha: any): string {
    if (falha && falha.error instanceof Blob && falha.status === 404) {
      return "Nenhum registro encontrado."
    } else if (falha && falha.status === 0) {
      return "Sistema indisponível, favor tente mais tarde."
    }

    return falha.error && falha.error.message || falha.status + ' ' + falha.statusText;
  }



  static clone(obj: any): any {
    let objNew = Object.assign({}, obj);

    let keys = Object.keys(objNew);
    for (let key in keys) {
      if (Array.isArray(objNew[keys[key]])) {
        objNew[keys[key]] = obj[keys[key]].slice(0);

        if (keys[key] == 'listaProgramaGrupoAdd' || keys[key] == 'listaGradacoes' || keys[key] == 'listaAgendamentos') {
          for (let i = 0; i < objNew[keys[key]].length; i++) {
            objNew[keys[key]][i] = Object.assign({}, obj[keys[key]][i]);
          }
        }
      }
    }

    return objNew;
  }

  static getMatriculaFormatada(nuMatricula: string | number): string {
    let mat = nuMatricula + '';
    for (let i = mat.length; i < 6; i++) {
      mat = '0' + mat;
    }
    return 'C' + mat;
  }

  static convertData(dataString: string | Date): Date {
    if (dataString instanceof Date) {
      return dataString;
    }
    let from = dataString.split("-");
    let dateStr = from[1] + '/' + (parseInt(from[2])) + '/' + from[0];
    return new Date(dateStr);
  }

  static validarEmail(mail: string): boolean {
    if (!mail) {
      return true;
    }
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }

  static obterOperador(valor) {
    switch (parseInt(valor)) {
      case 1:
        return ' ≤ ';
      case 2:
        return ' ≥ ';
      case 3:
        return '  ';
      case 4:
        return ' != ';
      case 5:
        return ' < ';
      case 6:
        return ' > ';
      default:
        return '';
    }
  }

  static getDescricaoEvento(codigoEvento: string) {
    if (codigoEvento == 'I') {
      return "Inclusão";
    } else if (codigoEvento == 'U') {
      return "Alteração";
    } else if (codigoEvento == 'D') {
      return "Exclusão";
    }

    return '';
  }
}

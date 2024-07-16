import {Util} from "./util";
import {NotificacaoModel} from "../../shared/model/notificacao/notificacao.model";
import {NotificacaoAgrupadorModel} from "../../shared/model/notificacao/notificacao-agrupador.model";
import {NotificacaoProgramaModel} from "../../shared/model/notificacao/notificacao-programa.model";
import {StorageUtil} from "./storage-util";
import {SessaoService} from "../services/sessao.service";

export class NotificacaoUtil {
  static getBlacklistNotificacoes(nuPrograma: number): NotificacaoModel[] {
    let nuMatricula = SessaoService.usuarioAutenticado.nuMatricula;
    let name = 'blacklist:' + nuPrograma + ":" + nuMatricula;

    if (StorageUtil.get(name) == undefined) {
      StorageUtil.set(name, []);
    }
    return StorageUtil.get(name);
  }

  static addNotificacaoBlacklist(nuPrograma: number, notificacao: NotificacaoModel) {

    let nuMatricula = SessaoService.usuarioAutenticado.nuMatricula;
    let name = 'blacklist:' + nuPrograma + ":" + nuMatricula;

    let list = this.getBlacklistNotificacoes(nuPrograma);
    list.push(notificacao);
    StorageUtil.set(name, list);
  }

  static filtrarNotificacoesBlacklist(notificacaoAgrupador: NotificacaoAgrupadorModel): NotificacaoAgrupadorModel {

    let notificacaoAgrupadorClone = Util.clone(notificacaoAgrupador) as NotificacaoAgrupadorModel;

    let listNotificacoesPrograma = notificacaoAgrupadorClone.notificacoesPrograma;

    let qtde = 0;
    if (listNotificacoesPrograma) {
      listNotificacoesPrograma.forEach(notificacaoPrograma => this.filtrarNotificacao(notificacaoPrograma));
      listNotificacoesPrograma.forEach(notificacaoPrograma => qtde = qtde + notificacaoPrograma.notificacoes.length);
    }

    notificacaoAgrupador.qtdeNotificacoes = qtde;

    return notificacaoAgrupador;
  }

  static filtrarNotificacao(notificacaoPrograma: NotificacaoProgramaModel) {

    let nuPrograma = notificacaoPrograma.programa.numero;

    let nuMatricula = SessaoService.usuarioAutenticado.nuMatricula;
    let name = 'blacklist:' + nuPrograma + ":" + nuMatricula;

    let blacklist = this.getBlacklistNotificacoes(nuPrograma);
    let deletarListaNotificacoes: NotificacaoModel[] = [];
    let deletarCache: NotificacaoModel[] = [];

    blacklist.forEach(d => {
      notificacaoPrograma.notificacoes.forEach(n => {
          if (n.nuNotificacao == d.nuNotificacao) {
            deletarListaNotificacoes.push(n);
          }
        }
      );

      if (deletarListaNotificacoes.length == 0) {
        deletarCache.push(d);
      }
    });

    if (deletarListaNotificacoes.length > 0) {
      this.excluirLista(notificacaoPrograma.notificacoes, deletarListaNotificacoes);
    }
    if (deletarCache.length > 0) {
      this.excluirLista(blacklist, deletarCache);
    }

    StorageUtil.set(name, blacklist);
  }

  static excluirLista(list: any[], listDeletaveis: any[]) {
    listDeletaveis.forEach(n => {
      list.splice(list.indexOf(n), 1);
    });
  }

}

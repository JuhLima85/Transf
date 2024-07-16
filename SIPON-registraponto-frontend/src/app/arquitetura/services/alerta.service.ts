import {Injectable} from "@angular/core";
import {AlertaModel} from "../../shared/model/alerta.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  static next = new Subject<AlertaModel>();

  adicionar(obj: AlertaModel) {
    obj.horaAlerta = new Date();
    AlertaService.next.next(obj);
  };

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export class SegurancaKeycloakService {
    constructor( private http: HttpClient ) {
    }

    public get(): Observable<any> {
        return this.http.get( environment.apiUrl+'/integracao-soucaixa/seguranca/configuracoes' );
    }
}

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReadonlyService} from './readonly.service';

/**
 * Base class for CRUD services.
 *
 * @typeParam T - the entity class type.
 * @param <K> - the ID class type.
 */
export abstract class BaseService<T, K> extends ReadonlyService<T, K> {

  protected constructor(http: HttpClient, baseURL: string) {
    super(http, baseURL);
  }

  get(): Observable<T> {
    return this.http.get<T>(this.baseURL);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseURL);
  }

  create(object: T): Observable<T> {
    return this.http.post<T>(this.baseURL, object);
  }

  update(object: T): Observable<T> {
    return this.http.put<T>(this.baseURL, object);
  }

  delete(id: K): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  params(chave: string, valor: any, existente: string = ''): string {
    if (valor) {
      if (existente) {
        return `${existente}&${chave}=${valor}`;
      }

      return `?${chave}=${valor}`;
    }

    return existente;
  }
}

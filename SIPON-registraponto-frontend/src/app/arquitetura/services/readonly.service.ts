import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

/**
 * Base class for CRUD services.
 *
 * @typeParam T - the entity class type.
 * @param <K> - the ID class type.
 */
export abstract class ReadonlyService<T, K> {

  protected constructor(protected http: HttpClient, protected baseURL: string) {
    //this.baseURL = environment.baseURL + baseURL;
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseURL);
  }

  find(id: K): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${id}`);
  }
}

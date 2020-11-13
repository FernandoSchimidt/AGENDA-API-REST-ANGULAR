import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Contato } from './contato/Contato';
import { environment } from '../environments/environment'
import { PaginaContato } from './contato/paginaContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  apiURL: string = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(`${this.apiURL}`, contato);
  }
  deletar(contato: Contato): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${contato.id}`);
  }

  list(page, size): Observable<PaginaContato[]> {
    const params = new HttpParams()
      .set('page', page).set('size', size)
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  favorite(contato: Contato): Observable<any> {
    return this.http.patch(`${this.apiURL}/${contato.id}/favorito`, null);
  }
  upload(contato: Contato, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/${contato.id}/foto`, formData, { responseType: 'blob' });
  }
  editar(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiURL}/${contato.id}`, contato);
  }
}

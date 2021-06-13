import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }
  createTicket(form: FormGroup): Observable<any> {
    return this.http.post<any>(`${environment.base_url}/api/tickets`, form.getRawValue());
  }
}

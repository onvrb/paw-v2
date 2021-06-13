import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(query: any): Observable<any> {
    let params: HttpParams = new HttpParams({ fromObject: query });
    return this.http.get<any>(`${environment.base_url}/api/events`, { params: params });
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.base_url}/api/events/${id}`);
  }

  createEvent(form: FormGroup): Observable<any> {
    return this.http.post<any>(`${environment.base_url}/api/events`, form.getRawValue());
  }

}

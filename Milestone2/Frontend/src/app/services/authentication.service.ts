import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.base_url}/api/users/login`, { email: email, password: password });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.base_url}/api/users/register`, { name: name, email: email, password: password });
  }

  getUser(): Observable<any> {
    return JSON.parse(localStorage.getItem('currentUser') || '{}')['user'];
  }

  userLogged(): Boolean {
    return (localStorage.getItem('currentUser') != null);
  }

}


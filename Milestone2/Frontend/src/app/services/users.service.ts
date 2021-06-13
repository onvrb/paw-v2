import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUserTypes(): Observable<any> {
    console.log('fui buscar user types')
    return this.http.get<any>(`${environment.base_url}/api/users/types/all`);
  }

  getUsersByType(type: string): Observable<any> {
    var type_id: any;
    console.log('fui buscar user por tipo')
    switch (type) {
      case "admin":
        type_id = localStorage.getItem('admin_id');
        break;
      case "promoter":
        type_id = localStorage.getItem('promoter_id');
        break;
      case "user":
        type_id = localStorage.getItem('user_id');
        break;
    }
    return this.http.get<any>(`${environment.base_url}/api/users/type/${type_id}`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.base_url}/api/users`);
  }

}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let token: any = localStorage.getItem('token');

    if (currentUser && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      })
    }
    return next.handle(request);
  }
}
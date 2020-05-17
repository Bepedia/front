import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../_services/auth.service";
import {environment} from "../../environments/environment";


@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.apiUrl + request.url,
      setHeaders: {
        Authorization: `Bearer ${this.authService.userData ?
          this.authService.userData.getIdToken(true) :
          null}`
      }
    });
    return next.handle(request);
  }
}

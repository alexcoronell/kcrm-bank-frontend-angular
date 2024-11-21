import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authRequest = req.clone({withCredentials: true})
  return next(authRequest);
};

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { errorAction } from '../store/error-action';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<{error:{
      code: string,
      message: string
    }}>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.store.dispatch(errorAction( {code:error?.error?.code, message:error?.error?.message}));
          return throwError(error);
        })
      )
  }

}

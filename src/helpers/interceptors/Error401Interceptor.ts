import {
    HttpInterceptor,
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpClient,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services';
import { LoadingService,  } from '../../modules/app-common/services';
import { switchMap,filter,take} from 'rxjs/operators';

/**
 * Intercepts and handles API errors / error related HTTP status codes
 *
 * @export
 * @class ErrorInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class Error401Interceptor implements HttpInterceptor {
    // Refresh Token Subject tracks the current token, or is null if no token is currently
    // available (e.g. refresh pending).
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private router: Router,
        private authService: AuthService,
        private loadingService: LoadingService,
    ) {}

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        return handler.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log("error -> 401 12",error )
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    console.log("error -> 401 13")
                    this.authService.logout().then(() => this.router.navigate(['auth/login']));
                    // TODO: when implements refreshToken uncomments this line

                    return this.handle401Errors(error, request, handler);
                }
                return throwError(error);
            })
        );
    }

    handle401Errors(error: HttpErrorResponse, request: HttpRequest<any>, handler: HttpHandler) {
         
        if (error.status == 401) {
            const refreshToken: string | null = localStorage.getItem('app:refreshToken');
            if (!refreshToken) {
                this.authService.logout().then(() => this.router.navigate(['auth/login']));
            }
               
                const tokenModel = { token: refreshToken };
                if(!this.isRefreshing){
                    this.isRefreshing = true;
                    return this.authService.refreshToken(tokenModel).pipe(
                    switchMap((res: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(res.token);
                    //set tokens in localstorge
                    localStorage.setItem('app:jwt', res.token);
                    localStorage.setItem('app:refreshToken', res.refreshToken);
                    return handler.handle(this.addTokenHeader(request, res.token));
                        }),
                        catchError((err) => {
                            console.log("err -> ",err);
                            this.loadingService.setLoading(false);
                         this.authService.logout().then(() => this.router.navigate(['auth/login']));
                            return throwError(err);
                        })
                    );
                }else{
                    this.loadingService.setLoading(false);
                    console.log("else isRefreshing -> ",true);
                    return this.refreshTokenSubject.pipe(
                      filter((token) => token != null),
                      take(1),
                      switchMap((jwt) => {
                        return handler.handle(this.addTokenHeader(request, jwt));
                      })
                    );
                  }

        }
        return throwError(error);
    }
    
    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
    }
}
export const Error401InterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: Error401Interceptor, multi: true },
];

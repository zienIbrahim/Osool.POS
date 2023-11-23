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
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services';
import { AlertService, ToastService } from '../../modules/app-common/services';
import { tap } from 'rxjs/operators';

/**
 * Intercepts and handles API errors / error related HTTP status codes
 *
 * @export
 * @class ErrorInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        public http: HttpClient
    ) {}

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        return handler.handle(request).pipe(tap(null, this.handleErrors.bind(this)));
    }
    handleErrors(error: HttpErrorResponse) {
        console.log('parse Error ',error);
        console.log('parse error.status ',error.status);

        const defaultOptions = {
            autohide: true,
            delay: 5000,
            headerClasses: 'bg-danger text-white',
        };
        
        switch(error.status) {
            case 0:
                this.router.navigate(['/error/500']);
                break;
            case 500:
                this.alertService.show("Error 500", error.error.ErrorMessage);
                break;
            case 400:
                this.alertService.show("Error 400",  error.error.ErrorMessage ); 
                break;
            case 403:
                // if we're going to use Refresh Token or whether we should keep navigating user to login page
                TODO: this.authService.logout().then(() =>
                        this.router.navigate(['auth/login'], { queryParams: { ForbiddenError: 1 } })
                    );
                break;
         default:
                break;
        }

        return throwError(error);
    }
}
export const ErrorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];


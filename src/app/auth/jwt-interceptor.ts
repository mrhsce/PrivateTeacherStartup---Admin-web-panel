import { Inject, Injectable, Injector } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest, HttpResponse,
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {
    NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    NbAuthService,
    NbAuthToken,
} from '@nebular/auth';
import {Router} from "@angular/router";

@Injectable()
export class NbAuthJWTInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
        private router: Router,
        @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter,
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        // do not intercept request whose urls are filtered by the injected filter
        if (!this.filter(req)) {
            return this.authService.isAuthenticatedOrRefresh().pipe(
                switchMap(authenticated => {
                    if (authenticated) {
                        return this.authService.getToken().pipe(
                            switchMap((token: NbAuthToken) => {
                                const JWT = `${token.getValue()}`;
                                req = req.clone({
                                    setHeaders: {
                                        Authorization: 'bearer ' + JWT,
                                    },
                                });
                                return next.handle(req).pipe(
                                    tap(evt => {
                                        if (evt instanceof HttpResponse) {
                                            //TODO  Here any check of the response should be implemented

                                        }
                                    }),
                                    catchError((err: any) => {
                                            if (err instanceof HttpErrorResponse) {
                                                // TODO other error codes should be dealt with here
                                                if (err.status == 401) {
                                                    localStorage.removeItem('auth_app_token');
                                                    this.router.navigateByUrl('/auth/login');
                                                }
                                            }
                                            return of(err);
                                        }
                                    )
                                );
                            }),
                        );
                    } else {
                        // Request is sent to server without authentication so that the client code
                        // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                        return next.handle(req);
                    }
                }),
            );
        } else {
            return next.handle(req);
        }
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }
}

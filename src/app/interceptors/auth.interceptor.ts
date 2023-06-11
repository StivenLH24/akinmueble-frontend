import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SecurityService } from "../services/security.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.securityService.getTokenLocalStorage();
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(request);
    }
}
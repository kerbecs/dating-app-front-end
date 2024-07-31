import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {storeType} from "../state/store";
import {loginTokenSelector} from "../state/selector/login-token.selector";

@Injectable()
export class InterceptorService implements HttpInterceptor{
  private loginToken : string |  null = '';
  constructor(private http : HttpClient, private store : Store<storeType>) {
    this.store.select(loginTokenSelector).subscribe(token => this.loginToken = token);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({headers: req.headers.set('loginToken', this.loginToken ?? '')}))
  }

}

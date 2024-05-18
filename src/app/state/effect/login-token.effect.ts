import {effect, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {
  getTokenFromStorage,
  invalidateToken,
  removeTokenFromStorage,
  saveTokenInStorage
} from "../action/login-token.actions";
import {of, switchMap, tap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {storeType} from "../store";
import {loginTokenSelector} from "../selector/login-token.selector";
import {environment} from "../../../environments/environment";
import {UserDataDto} from "../helper/user-data-dto";
import {userDataAction} from "../action/user-data.action";
import {userLocationAction} from "../action/user-location.action";

@Injectable()
export class LoginTokenEffect {
  constructor(private actions$ : Actions,private http : HttpClient, private store : Store<storeType>) {
  }
  checkToken = createEffect(() => this.actions$.pipe(
    ofType(getTokenFromStorage),
    withLatestFrom(this.store.select(loginTokenSelector)),
    tap(([action, token]) =>{
      if(!token) return ;
      this.http.post(environment.authService+'user/token',{})
          .subscribe({
            next: resp => {
              if(!resp){
                this.store.dispatch(removeTokenFromStorage())
                return;
              }
              const userDataDto = <UserDataDto>resp;
              console.log('user data', userDataDto)
              this.store.dispatch(userDataAction(userDataDto))
              this.store.dispatch(userLocationAction())
            },
            error: err => {
              this.store.dispatch(removeTokenFromStorage())
            }
          })
    })
  ), {dispatch: false});
  modifyToken = createEffect(() => this.actions$.pipe(
    ofType(invalidateToken),
    withLatestFrom(this.store.select(loginTokenSelector)),
    tap(([action, token]) => {
      this.http.post(environment.authService+'user/logout',{}).subscribe()
    }),
    switchMap(() =>
      of(removeTokenFromStorage())
    )
  ))

}

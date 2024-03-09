import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {storeType} from "../store";
import {tap, withLatestFrom} from "rxjs";
import {userDataSelector} from "../selector/user-data.selector";
import {getTokenFromStorage} from "../action/login-token.actions";
import {environment} from "../../../environments/environment";
import {UserProfileDto} from "../../user-page/welcome-page/helper/user-profile-dto";
import {userDataAction} from "../action/user-data.action";
import {setConnexionsProfileAction} from "../action/connexions-profiles.action";

@Injectable({providedIn: 'root'})
export class UserDataEffect {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<storeType>) {
  }

  getConnexionsProfiles = createEffect(() => this.actions$.pipe(
    ofType(userDataAction),
    withLatestFrom(this.store.select(userDataSelector)),
      tap(([action, userData]) => {
        if(!userData?.userId) return;
        this.http.get(environment.userService+'user-connexions/'+userData?.userId)
          .subscribe(data => {
            this.store.dispatch(setConnexionsProfileAction({connexionsProfiles: <UserProfileDto[]> data}))
          })
      }
    )
  ), {dispatch: false})
}

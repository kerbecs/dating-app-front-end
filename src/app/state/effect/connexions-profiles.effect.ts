import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {storeType} from "../store";
import {
  addConnexionAction,
  removeConnexionsAction,
  setConnexionsProfileAction
} from "../action/connexions-profiles.action";
import {tap, withLatestFrom} from "rxjs";
import {connexionsProfilesSelector} from "../selector/connexions-profiles.selector";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ConnexionsProfilesEffect{
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<storeType>) {
  }
  removeConnexion = createEffect(() => this.actions$.pipe(
    ofType(removeConnexionsAction),
    withLatestFrom(this.store.select(connexionsProfilesSelector)),
    tap(([action, connexionsProfiles ]) => {
      this.http.delete(environment.userService+'user-connexions/'+action.userId+'/'+action.userConnexionId)
        .subscribe({
          next: resp => {
            const userIndex = connexionsProfiles.findIndex(profile => profile.userId == action.userConnexionId);
            if(userIndex < 0) return;
            connexionsProfiles = [...connexionsProfiles];
            connexionsProfiles.splice(userIndex, 1);

            this.store.dispatch(setConnexionsProfileAction({connexionsProfiles: connexionsProfiles}))
          }
        })
})
  ),{dispatch: false})
  addConnexion = createEffect(() => this.actions$.pipe(
    ofType(addConnexionAction),
    withLatestFrom(this.store.select(connexionsProfilesSelector)),
    tap(([connexion, connexionsProfiles]) => {
      connexionsProfiles = [...connexionsProfiles];
      connexionsProfiles.push(connexion);
      this.store.dispatch(setConnexionsProfileAction({connexionsProfiles: connexionsProfiles}))
})
  ), {dispatch: false})
}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {storeType} from "../store";
import {tap, withLatestFrom} from "rxjs";
import {userDataSelector} from "../selector/user-data.selector";
import {environment} from "../../../environments/environment";
import {UserProfileDto} from "../../user-page/welcome-page/helper/user-profile-dto";
import {userDataAction} from "../action/user-data.action";
import {setConnexionsProfileAction} from "../action/connexions-profiles.action";
import {userAccountAction} from "../action/user-account.action";
import {UserAccountDto} from "../helper/user-account-dto";
import {preferenceAction} from "../action/preference.action";
import {raceAction} from "../action/race.action";
import {educationAction} from "../action/education.action";
import {genderAction} from "../action/gender.action";
import {sexualOrientationAction} from "../action/sexual-orientation.action";
import {reportReasonAction} from "../action/report-reason.action";
import {Coords} from "../../user-page/welcome-page/helper/coords";
import {userLocationAction} from "../action/user-location.action";
import {loginTokenSelector} from "../selector/login-token.selector";
import {languageAction} from "../action/language.action";

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
        this.http.get(environment.authService+'user/user-account/'+userData.userId)
          .subscribe(userAccount => {
            this.store.dispatch(userAccountAction(<UserAccountDto> userAccount));
          })
        this.http.get(environment.userService+'profile-data/preference')
          .subscribe(resp => {
            this.store.dispatch(preferenceAction({preferenceList: <string[]>resp}))
          })
        this.http.get(environment.userService+'profile-data/race')
          .subscribe(resp => {
            this.store.dispatch(raceAction({raceList: <string[]>resp}))
          })
        this.http.get(environment.userService+'profile-data/education')
          .subscribe(resp => {
            this.store.dispatch(educationAction({educationList: <string[]>resp}))
          })
        this.http.get(environment.userService+'profile-data/gender')
          .subscribe(resp => {
            this.store.dispatch(genderAction({genderList: <string[]>resp}))
          })
        this.http.get(environment.userService+'profile-data/sexual-orientation')
          .subscribe(resp => {
            this.store.dispatch(sexualOrientationAction({sexualOrientationList: <string[]>resp}))
          })
        this.http.get(environment.toolService+'report/reason')
          .subscribe(resp => {
            this.store.dispatch(reportReasonAction({reportReasonList: <string[]>resp}))
          })
        this.http.get(environment.toolService+'translate/language')
          .subscribe(languageList => {
            this.store.dispatch(languageAction({languageList: <string[]>languageList}))
          })

      }
    )
  ), {dispatch: false})
  setUserLocation = createEffect(() => this.actions$.pipe(
    ofType(userLocationAction),
    withLatestFrom(this.store.select(loginTokenSelector)),
    tap(([action, loginToken]) => {
      if(!loginToken) return;
      navigator.geolocation.getCurrentPosition(position => {
        this.http.post(environment.userService+'user-profile/coords',new Coords(position.coords.latitude,position.coords.longitude),{
          headers: {
            loginToken: loginToken
          }
        })
          .subscribe();
      })
})
  ),{dispatch: false})
}

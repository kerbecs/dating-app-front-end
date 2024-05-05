import {Injectable} from "@angular/core";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {preferenceSelector} from "../../../state/selector/preference.selector";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../environments/environment";
import {loginTokenSelector} from "../../../state/selector/login-token.selector";
import {getTokenFromStorage} from "../../../state/action/login-token.actions";

@Injectable({providedIn: 'root'})
export class PreferencesService {
  public userData! : UserDataDto | null;
  public preferenceForm = new FormGroup({
    preferenceList: new FormControl([],[Validators.required])
  })
  public preferenceList : string[] = [];
  private loginToken! : string | null;
  constructor(private store : Store<storeType>, private http : HttpClient, private _snackBar: MatSnackBar) {
    store.select(userDataSelector)
      .subscribe(userData => {
        if(!userData) return;
        this.userData = userData;
        store.select(preferenceSelector)
          .subscribe(preferenceList => {
            if(!preferenceList) return;
            this.preferenceList = preferenceList.filter(pref => !this.userData?.userProfileDto?.preferenceList?.includes(pref));
          })
      })
    store.select(loginTokenSelector)
      .subscribe(loginToken => this.loginToken = loginToken)
  }
  public savePreferences(){
    if(!this.preferenceForm?.controls['preferenceList']?.value?.length || !this.userData?.userProfileDto || !this.loginToken) return;
    this.http.put(environment.userService+'user-profile/user-preference',this.preferenceForm?.controls['preferenceList']?.value, {headers: {
      loginToken: this.loginToken
      }})
      .subscribe({
        next: (resp) => {
          this.store.dispatch(getTokenFromStorage());
          this.openSnackBar('Data successfully saved','Close')
          this.preferenceForm.reset()
        },
        error: (err) => {
          this.openSnackBar('An error has occurred','Close')
        }
      })
  }
  public removePreference(preference : string){
    if(!this.userData?.userProfileDto || !this.loginToken) return;
    this.http.request('DELETE',environment.userService+'user-profile/user-preference',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        loginToken: this.loginToken
      }),
    body: JSON.stringify(preference)
    })
      .subscribe({
        next: (resp) => {
          this.store.dispatch(getTokenFromStorage());
          this.openSnackBar('Data successfully deleted','Close')
        },
        error: (err) => {
          this.openSnackBar('An error has occurred','Close')
        }
      })
  }
  public enableSaveButton(){
    return this.preferenceForm?.controls['preferenceList']?.valid && this.preferenceForm?.controls['preferenceList']?.touched;
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

}

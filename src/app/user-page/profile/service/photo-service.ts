import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {Evented} from "leaflet";
import {fi} from "picmo/dist/i18n";
import {HttpClient} from "@angular/common/http";
import {loginTokenSelector} from "../../../state/selector/login-token.selector";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {getTokenFromStorage} from "../../../state/action/login-token.actions";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public userData!: UserDataDto;
  private loginToken! : string | null;
  private chosenPhoto!: string | ArrayBuffer | undefined | null;
  public addPhotoForm = new FormGroup({
    photo: new FormControl('', [Validators.required])
  })

  constructor(private store: Store<storeType>, private http : HttpClient,private _snackBar: MatSnackBar) {
    store.select(userDataSelector)
      .subscribe(userData => {
        if (!userData) return;
        this.userData = userData
      })
    store.select(loginTokenSelector)
      .subscribe(token => this.loginToken = token)
  }



  // @ts-ignore
  addPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        this.chosenPhoto = event?.target?.result;
      }
      reader.readAsText(event.target.files[0]);
    }
  }
  public savePhoto(){
    if(!this.loginToken || !this.chosenPhoto) return;
    const formData = new FormData();
    formData.append('file', this.chosenPhoto.toString());
    this.http.post(environment.userService+'user-profile/new-photo',formData,{
      headers: {
        loginToken: this.loginToken
              }
    })
      .subscribe({
        next: () => {
          this.openSnackBar('Photo successfully added', 'Close');
          this.store.dispatch(getTokenFromStorage())
        },
        error: () => this.openSnackBar('An error has occurred', 'Close')
      })
  }
  public enableAddPhotoButton(){
    return this.addPhotoForm.controls['photo']?.valid && this.addPhotoForm.controls['photo']?.touched && this.chosenPhoto;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }
}

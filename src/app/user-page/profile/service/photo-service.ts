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
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public userData!: UserDataDto;
  private loginToken! : string | null;
  private chosenPhoto!: File;
  public addPhotoForm = new FormGroup({
    photo: new FormControl('', [Validators.required])
  })
  public userDataSubject = new Subject<void>();
  public selectPhotoAsProfile = new Subject<string>();
  public selectedPhoto! : string|null;
  public closeChooseProfilePhotoDialog = new Subject<void>();

  constructor(private store: Store<storeType>, private http : HttpClient,private _snackBar: MatSnackBar) {
    store.select(userDataSelector)
      .subscribe(userData => {
        if (!userData) return;
        this.userData = userData
        this.userDataSubject.next();
      })
    store.select(loginTokenSelector)
      .subscribe(token => this.loginToken = token)
  }



  // @ts-ignore
  addPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      this.chosenPhoto = event.target.files[0];
    }
  }
  public savePhoto(){
    if(!this.loginToken || !this.chosenPhoto) return;
    const formData = new FormData();
    formData.append('file', this.chosenPhoto, this.chosenPhoto.name);
    this.http.post(environment.userService+'user-profile/new-photo',formData,{
      headers: {
        loginToken: this.loginToken
      },
      reportProgress: true,
      responseType: 'text',
      observe: 'response'
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
  public deletePhoto(name : string){
    if(!this.loginToken) return;
      this.http.delete(environment.userService+'user-profile/photo/'+name,{
        headers: {
          loginToken: this.loginToken
        }
      })
        .subscribe({
          next: () => {
            this.openSnackBar('Photo successfully deleted',' Close')
            this.store.dispatch(getTokenFromStorage())
          },
          error: () => this.openSnackBar('An error has occurred', 'Close')
        })
  }
  public setProfilePhoto(){
    if(!this.loginToken || !this.selectedPhoto) return;
    this.http.put(environment.userService+'user-profile/photo/'+this.getPhotoId(this.selectedPhoto),{
      headers: {
        loginToken: this.loginToken
      }
    })
      .subscribe({
        next: () => {
          this.openSnackBar('Photo successfully set',' Close')
          this.store.dispatch(getTokenFromStorage())
          this.selectedPhoto = null;
        },
        error: () => {
          this.openSnackBar('An error has occurred', 'Close')
          this.selectedPhoto = null;
        }
      })
    this.closeChooseProfilePhotoDialog.next();

  }
  public selectPhotoAsProfileImage(link : string){
    this.selectedPhoto = link;
    this.selectPhotoAsProfile.next(link);
  }
  private getPhotoId(link : string){
    const lastIndexOfSlash = link.lastIndexOf("/");
    const lastIndexOfName = link.lastIndexOf("?");

    return link.slice(lastIndexOfSlash+1, lastIndexOfName);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }
}

import {Injectable} from "@angular/core";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserPersonalDataDto} from "../helper/user-personal-data-dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {loginTokenSelector} from "../../../state/selector/login-token.selector";
import {MatSnackBar} from "@angular/material/snack-bar";
import {userDataAction} from "../../../state/action/user-data.action";
import {UserProfileDto} from "../../welcome-page/helper/user-profile-dto";
import {getTokenFromStorage} from "../../../state/action/login-token.actions";

@Injectable({providedIn: 'root'})
export class PersonalProfileService {
  public userData! : UserDataDto | null;
  public personalProfileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z\\-\\s]{2,20}$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z\\-\\s]{2,20}$')]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s_0-9]{2,40}$")]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl<Date | null | undefined>(null, [Validators.required, this.ageValidator]),
    educationList: new FormControl<string[]>([]),
    sexualOrientation: new FormControl(''),
    race: new FormControl('')
  })
  private loginToken! : string | null;

  constructor(private store : Store<storeType>, private http : HttpClient, private _snackBar: MatSnackBar) {
    store.select(userDataSelector)
      .subscribe(userData => {
        if(!userData) return;
        this.userData = userData
        this.initializeFormData();
      })
    store.select(loginTokenSelector)
      .subscribe(loginToken => this.loginToken = loginToken)
  }
  ageValidator(abstractControl: AbstractControl) {
    const date = new Date(abstractControl.value);

    if (new Date().getTime() - date.getTime() < 18 * 365 * 24 * 60 * 60 * 1000) {
      return {age: true}
    }
    return null;
  }
  public updateProfileData(){
    if(this.personalProfileForm.controls['firstName'].value == null ||  this.personalProfileForm.controls['firstName'].value == undefined||
      this.personalProfileForm.controls['lastName'].value == null ||  this.personalProfileForm.controls['lastName'].value == undefined||
      this.personalProfileForm.controls['country'].value == null || this.personalProfileForm.controls['country'].value == undefined ||
      this.personalProfileForm.controls['city'].value == null || this.personalProfileForm.controls['city'].value == undefined ||
      this.personalProfileForm.controls['gender'].value == null || this.personalProfileForm.controls['gender'].value == undefined ||
      this.personalProfileForm.controls['educationList'].value == null || this.personalProfileForm.controls['educationList'].value == undefined ||
      this.personalProfileForm.controls['race'].value == null || this.personalProfileForm.controls['race'].value == undefined ||
      this.personalProfileForm.controls["sexualOrientation"].value == null || this.personalProfileForm.controls["sexualOrientation"].value == undefined ||
      this.personalProfileForm.controls['birthDate'].value == null || this.personalProfileForm.controls['birthDate'].value == undefined ||
      !this.loginToken) return;

    const userPersonalData = new UserPersonalDataDto(
      this.personalProfileForm.controls['firstName'].value,
      this.personalProfileForm.controls['lastName'].value,
      this.personalProfileForm.controls['country'].value,
      this.personalProfileForm.controls['city'].value,
      this.personalProfileForm.controls['gender'].value,
      this.personalProfileForm.controls['educationList'].value,
      this.personalProfileForm.controls['race'].value || null,
      this.personalProfileForm.controls["sexualOrientation"].value || null,
      this.personalProfileForm.controls['birthDate'].value,
    )

    this.http.put(environment.userService+'user-profile/user-personal-data',userPersonalData,{headers: {
      loginToken: this.loginToken
      }})
      .subscribe({
        next: (resp) => {
          this.store.dispatch(getTokenFromStorage());
          this.openSnackBar('Data successfully saved','Close')
        },
        error: (err) => {
          this.openSnackBar('An error has occurred','Close')
        }
      })
  }

  private initializeFormData(){
    console.log(this.userData)
    this.personalProfileForm.setValue({
      firstName: this.userData?.userProfileDto?.firstName || '',
      lastName: this.userData?.userProfileDto?.lastName || '',
      country: this.userData?.userProfileDto?.countryCode || '',
      city: this.userData?.userProfileDto?.city || '',
      gender: this.userData?.userProfileDto?.gender || '',
      birthDate: this.userData?.userProfileDto?.birthDate,
      educationList: this.userData?.userProfileDto?.educationList || [],
      sexualOrientation: this.userData?.userProfileDto?.sexualOrientation || '',
      race: this.userData?.userProfileDto?.race || '',
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

}

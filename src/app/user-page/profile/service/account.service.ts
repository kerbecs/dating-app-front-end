import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {userAccountSelector} from "../../../state/selector/user-account.selector";
import {UserAccountDto} from "../../../state/helper/user-account-dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ChangePasswordDto} from "../helper/ChangePasswordDto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class AccountService {
  public userAccount!: UserAccountDto | null;
  public emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  public newPasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$")]),
    repeatedPassword: new FormControl(null, [Validators.required, this.passwordMatchValidator.bind(this)])
  })

  constructor(store: Store<storeType>, private http : HttpClient, private _snackBar: MatSnackBar) {
    store.select(userAccountSelector)
      .subscribe(userData => {
        if (!userData) return;
        this.userAccount = userData;
        this.emailForm.setValue({
          email: this.userAccount?.email || ''
        })
      })
  }

  passwordMatchValidator(abstractControl: AbstractControl) {
    if (!this.newPasswordForm || !abstractControl) return null;
    const repeatedPassword = abstractControl.value;
    const password = this.newPasswordForm.controls['password']?.value;

    if (repeatedPassword && repeatedPassword !== password) {
      abstractControl.get('repeatedPassword')?.setErrors({passwordMatch: true})
      return {passwordMatch: true}
    }
    abstractControl.get('repeatedPassword')?.setErrors(null);
    return null;
  }
  enableChangeEmailButton(){
    return this.emailForm.controls['email'].touched && this.emailForm.controls['email'].valid;
  }
  enableChangePasswordButton(){
    return this.newPasswordForm.controls['password'].touched && this.newPasswordForm.controls['password'].valid
    &&
      this.newPasswordForm.controls['repeatedPassword'].touched && this.newPasswordForm.controls['repeatedPassword'].valid
  }
  changePassword(){
    if(!this.userAccount?.id || !this.newPasswordForm.controls['password']?.value) return;
    this.http.post(environment.authService+'user/changePassword', new ChangePasswordDto(this.userAccount.id,this.newPasswordForm.controls['password'].value))
      .subscribe({
        next: resp => {
          this.openSnackBar('Password succesfully changed')
          this.newPasswordForm.reset();
        },
        error: err => this.openSnackBar('An error has occurred')
      })
  }
  private openSnackBar(message : string){
    this._snackBar.open(message, 'Undo', {duration: 3000});
}

}

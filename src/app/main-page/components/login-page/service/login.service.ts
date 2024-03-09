import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../utility/user-login";
import {environment} from "../../../../../environments/environment";
import {UserLoginResponse} from "../utility/user-login-response";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {saveTokenInStorage} from "../../../../state/action/login-token.actions";
import {userDataAction} from "../../../../state/action/user-data.action";
import {NewPasswordComponent} from "../component/new-password/new-password.component";
import {NewPasswordDto} from "../component/helper/NewPasswordDto";

@Injectable()
export class LoginService{
  public errorSubject = new Subject<boolean>();
  public loginForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null, [Validators.required])
  })
  public forgetLoginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required])
  })
  public newPasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$")]),
    repeatedPassword: new FormControl(null, [Validators.required, this.passwordMatchValidator.bind(this)])
  })
  constructor(private httpClient : HttpClient, private router : Router, private store : Store) {
  }
  public login(){
    const email = this.loginForm.controls["email"]?.value;
    const password = this.loginForm.controls["password"].value;

    if(!email || !password) return;

    const userLogin = new UserLogin(email, password);
    this.httpClient.post(environment.authService+'user/login',userLogin)
      .subscribe({
        next: (resp) => {
          this.resetFormFields();
          const userLoginResponse = <UserLoginResponse>resp;
          if(!userLoginResponse || !userLoginResponse.success) {
            this.errorSubject.next(true)
            return ;
          }
          this.router.navigate(['user','welcome-page']);
          this.store.dispatch(saveTokenInStorage({token: userLoginResponse.loginToken}))
          this.store.dispatch(userDataAction(userLoginResponse.userDataDto));
        },
        error: err => {
          this.errorSubject.next(true);
          this.resetFormFields();
        }
      })
  }
  private resetFormFields(){
    this.loginForm.controls['password']?.reset();
  }
  public enableLoginButton() : boolean{
    return Boolean(this.loginForm.controls['password']?.value) && Boolean(this.loginForm.controls['email'].value);
  }
  public enableResetPasswordButton(){
    return this.forgetLoginForm.controls['email']?.valid && this.forgetLoginForm.controls['email'].touched;
  }
  public createResetPasswordToken(){
    return this.httpClient
      .post(environment.authService+"user/resetPasswordToken/"+this.forgetLoginForm.controls['email'].value,{})
  }
  public enableNewPasswordButton(){
    return this.newPasswordForm.controls['password']?.valid && this.newPasswordForm.controls['password'].touched && this.newPasswordForm.controls['repeatedPassword'].touched && this.newPasswordForm.controls['repeatedPassword'].valid ;
  }
  passwordMatchValidator(abstractControl: AbstractControl) {
    if(!this.newPasswordForm || !abstractControl) return null;
    const repeatedPassword = abstractControl.value;
    const password = this.newPasswordForm.controls['password']?.value;

    if (repeatedPassword && repeatedPassword !== password) {
      abstractControl.get('repeatedPassword')?.setErrors({passwordMatch: true})
      return {passwordMatch: true}
    }
    abstractControl.get('repeatedPassword')?.setErrors(null);
    return null;
  }
  validateToken(token : string){
    return this.httpClient.post(environment.authService+'user/resetPassword/'+token,{});
  }
  changePassword(token : string, password : string){
    return this.httpClient.post(environment.authService+'user/resetPassword', new NewPasswordDto(token, password))
  }
}

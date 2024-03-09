import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../utility/user-register";
import {environment} from "../../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class RegisterUserService{
  public isCheckingEmail : boolean = false;
  public showEmailUnavailableIcon : boolean = false;
  public showEmailAvailableIcon : boolean = false;
  public registered = false;

  constructor(private httpClient : HttpClient, private _snackBar: MatSnackBar) {
  }
  public registerUser(userRegister : UserRegister){
    this.httpClient.post(environment.authService+"user/new-user",userRegister)
      .subscribe({
        next:
          (resp) => {
            if (resp) this.registered = true;
          },
        error: this.showErrorSnackBar.bind(this)
      }
  )
  }
  private showErrorSnackBar(){
    this._snackBar.open('An error has occurred', 'Close', {duration: 3000});
  }
}

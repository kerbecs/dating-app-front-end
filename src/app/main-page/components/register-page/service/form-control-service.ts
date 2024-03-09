import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RegisterUserService} from "./register-user-service";

@Injectable({providedIn: 'root'})
export class FormControlService {
    private _matGroupIndex = 0;

    private generalInfo = {
        firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-z\-\s]{2,20}$')]),
        lastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-z\-\s]{2,20}$')]),
        country: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z\-\s_0-9]{2,40}$")]),
        gender: new FormControl(null, [Validators.required]),
        birthDate: new FormControl(null, [Validators.required, this.ageValidator])
    }

    private account = {
        email: new FormControl(null, [Validators.required, Validators.email], [this.checkEmail.bind(this)]),
        password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$")]),
        repeatedPassword: new FormControl(null, [Validators.required])
    }
    private agreements = {
        declareIsAdult: new FormControl(null, [Validators.required]),
        declareAgreeTerms: new FormControl(null, [Validators.required])
    }

    private formObject = {
        generalInfo: new FormGroup(this.generalInfo),
        account: new FormGroup(this.account, [this.passwordMatchValidator]),
        agreements: new FormGroup(this.agreements)
    }

    private _registerFormGroup: FormGroup = new FormGroup(this.formObject);

    constructor(private http: HttpClient, private registerUserService: RegisterUserService) {
    }

    ageValidator(abstractControl: AbstractControl) {
        const date = new Date(abstractControl.value);

        if (new Date().getTime() - date.getTime() < 18 * 365 * 24 * 60 * 60 * 1000) {
            return {age: true}
        }
        return null;
    }

    passwordMatchValidator(abstractControl: AbstractControl) {
        const repeatedPassword = abstractControl.get('repeatedPassword')?.value;
        const password = abstractControl.get('password')?.value;

        if (repeatedPassword && repeatedPassword !== password) {
            abstractControl.get('repeatedPassword')?.setErrors({passwordMatch: true})
            return {passwordMatch: true}
        }
        abstractControl.get('repeatedPassword')?.setErrors(null);
        return null;
    }

    public checkEmail(abstractControl: AbstractControl): Promise<any> | Observable<any> {
        const func = (success: any, fail: any) => {
            if (!abstractControl?.errors?.['email']) {
                this.registerUserService.isCheckingEmail = true;
                this.registerUserService.showEmailAvailableIcon = false;
                this.registerUserService.showEmailUnavailableIcon = false;
                this.http.get(environment.authService + "user/email/" + abstractControl.value)
                    .subscribe(response => {
                        if (!response) {
                            success({emailCheck: true});
                            this.registerUserService.showEmailUnavailableIcon = true;
                            this.registerUserService.showEmailAvailableIcon = false;
                        } else {
                            success(null)
                            this.registerUserService.showEmailUnavailableIcon = false;
                            this.registerUserService.showEmailAvailableIcon = true;
                        }
                        this.registerUserService.isCheckingEmail = false;
                    })
            } else {
                success(null);
            }
        }

        return new Promise(func.bind(this))
    }

    get registerFormGroup(): FormGroup {
        return this._registerFormGroup;
    }

    get matGroupIndex(): number {
        return this._matGroupIndex;
    }

    set matGroupIndex(value: number) {
        this._matGroupIndex = value;
    }

    public getGeneralInfoFormGroup(): FormGroup {
        return <FormGroup>this.registerFormGroup?.get('generalInfo');
    }

    public getAccountFormGroup(): FormGroup {
        return <FormGroup>this.registerFormGroup?.get('account');
    }

    public getAgreementsFormGroup(): FormGroup {
        return <FormGroup>this.registerFormGroup?.get('agreements');
    }
}


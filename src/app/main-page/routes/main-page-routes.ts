import {Routes} from "@angular/router";
import {RegisterPageComponent} from "../components/register-page/register-page.component";
import {MainPageComponent} from "../main-page.component";
import {StartPageComponent} from "../components/start-page/start-page.component";
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {ValidateEmailComponent} from "../components/validate-email/validate-email.component";
import {LoginComponent} from "../components/login-page/component/login/login.component";
import {ForgotPasswordComponent} from "../components/login-page/component/forgot-password/forgot-password.component";
import {NewPasswordComponent} from "../components/login-page/component/new-password/new-password.component";

export const routes : Routes = [
  {path: '', component: MainPageComponent, children: [
      {path: '', component: StartPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'login', component: LoginPageComponent, children: [
          {path: "", component: LoginComponent},
          {path: "reset", component: ForgotPasswordComponent},
          {path: "reset/:token", component: NewPasswordComponent}
        ]},
      {path: 'validate-email/:token', component: ValidateEmailComponent}
    ]}
]

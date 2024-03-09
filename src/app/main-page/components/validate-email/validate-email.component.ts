import {Component} from '@angular/core';
import {AccountComponent} from "../register-page/components/account/account.component";
import {AgrementsComponent} from "../register-page/components/agrements/agrements.component";
import {GeneralInfoComponent} from "../register-page/components/general-info/general-info.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-validate-email',
  standalone: true,
  imports: [
    AccountComponent,
    AgrementsComponent,
    GeneralInfoComponent,
    MatTab,
    MatTabGroup,
    NgIf
  ],
  templateUrl: './validate-email.component.html',
  styleUrl: './validate-email.component.css'
})
export class ValidateEmailComponent {
  public showSuccessMessage: boolean = false;
  public showFailMessage: boolean = false;
  constructor(private http : HttpClient, public activatedRoute: ActivatedRoute) {
    this.activateEmail(activatedRoute.snapshot.params['token']);
  }
  public activateEmail(token: string) {
    this.http.get(environment.authService + "user/email/token/" + token)
      .subscribe({
        next: resp => {
          if (resp) this.showSuccessMessage = true
          else this.showFailMessage = true;
        },
        error: err => this.showFailMessage = true
      })
  }

}

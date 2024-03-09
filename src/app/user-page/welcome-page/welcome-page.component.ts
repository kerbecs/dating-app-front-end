import { Component } from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {UserProfileService} from "./service/user-profile-service";
import {UserProfileDto} from "./helper/user-profile-dto";
import {CompatibilityMenuComponent} from "./component/compatibility-menu/compatibility-menu.component";

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatSuffix,
    MatFabButton,
    UserProfileComponent,
    CompatibilityMenuComponent
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  constructor(public userProfileService : UserProfileService) {
  }

}

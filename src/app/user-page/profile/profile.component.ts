import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AccountComponent} from "./component/account/account.component";
import {PersonalProfileComponent} from "./component/personal-profile/personal-profile.component";
import {PreferencesComponent} from "./component/preferences/preferences.component";
import {PhotosComponent} from "./component/photos/photos.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    AccountComponent,
    PersonalProfileComponent,
    PreferencesComponent,
    PhotosComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

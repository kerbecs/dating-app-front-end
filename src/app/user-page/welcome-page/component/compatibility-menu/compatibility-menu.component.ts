import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {UserProfileService} from "../../service/user-profile-service";
import {UserMatchAction} from "../../helper/user-match-action";
import {UserCompatibilityDto} from "../../helper/user-compatibility-dto";
import {CompatibilityService} from "../../service/compatibility.service";

@Component({
  selector: 'app-compatibility-menu',
  standalone: true,
    imports: [
        MatFabButton,
        MatIcon
    ],
  templateUrl: './compatibility-menu.component.html',
  styleUrl: './compatibility-menu.component.css'
})
export class CompatibilityMenuComponent {
  constructor(public userProfileService : UserProfileService, private compatibilityService : CompatibilityService) {
  }
  sendAction(userMatchAction : UserMatchAction){
    if(!this.userProfileService.userData?.userId || !this.userProfileService.selectedUserProfile?.userId) return;
    switch (userMatchAction) {
      case UserMatchAction.ADD:
        this.userProfileService.addConnexion();
        return;
      case UserMatchAction.REJECT:
        this.userProfileService.nextUserProfile();
        return;
      case UserMatchAction.LIKE:
      case UserMatchAction.LOVE:
        const userCompatibilityDto = new UserCompatibilityDto(this.userProfileService.userData?.userId, this.userProfileService.selectedUserProfile?.userId, userMatchAction);
        this.compatibilityService.sendCompatibilityAction(userCompatibilityDto);
        break;
    }
  }

  protected readonly UserMatchAction = UserMatchAction;
}

import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {connexionsProfilesSelector} from "../../../state/selector/connexions-profiles.selector";
import {UserProfileDto} from "../../welcome-page/helper/user-profile-dto";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class FriendsService{
  private allUserConnexions : UserProfileDto[] = [];
  public userConnexions : UserProfileDto[] = [];

  constructor(private store : Store<storeType>) {
    this.store.select(connexionsProfilesSelector)
      .subscribe(connexions => {
        this.userConnexions = connexions;
        this.allUserConnexions = connexions;
      })
  }
  filterUserConnexions(text : string){
    if(!text) {
      this.userConnexions = this.allUserConnexions;
    }
    this.userConnexions = this.allUserConnexions.filter(user => (user?.firstName + user.lastName).toLowerCase().includes(text.toLowerCase()))

  }
}

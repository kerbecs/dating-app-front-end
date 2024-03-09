import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserProfileDto} from "../helper/user-profile-dto";
import {environment} from "../../../../environments/environment";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {UserConnexionDto} from "../helper/user-connexion-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {addConnexionAction} from "../../../state/action/connexions-profiles.action";

@Injectable({providedIn: 'root'})
export class UserProfileService{
  public selectedIndex = 0;
  public userProfilesList : UserProfileDto[] = [];
  public selectedUserProfileSubject = new Subject<void>();
  public userData! : UserDataDto | null;
  public selectedUserProfile? : UserProfileDto;
  public usersLoaded = false;

  constructor(private http : HttpClient, private store : Store<storeType>, private snackBar: MatSnackBar) {
      store.select(userDataSelector).subscribe(userData => {
        if(!userData) return null;
        this.userData = userData
        this.getUsersProfiles.call(this);

        return userData;
      });
  }
  public addConnexion(){
      this.http.post(environment.userService+'user-connexions', new UserConnexionDto(this.userData?.userId || 0, this.selectedUserProfile?.userId || 0))
        .subscribe({
          next: it => {
            this.showSnackBar('User added successfully');
            if(this.selectedUserProfile) this.store.dispatch(addConnexionAction(this.selectedUserProfile))
            this.nextUserProfile()
          },
          error: it => {this.showSnackBar('Error when adding user')}
        });
  }
  nextUserProfile(){
    if(this.userProfilesList.length == 0) return;

    if(this.userProfilesList.length > this.selectedIndex + 1) this.selectedIndex++;
    else this.selectedIndex--;
    this.selectedUserProfile = this.userProfilesList[this.selectedIndex];
    this.selectedUserProfileSubject.next();
  }
  private getUsersProfiles(){
    this.http.get(environment.userService+'user-profile')
      .subscribe(resp => {
        this.userProfilesList = <UserProfileDto[]> resp;
        this.userProfilesList = this.userProfilesList.filter(userProfile => {
          if(!this.userData) return true;
          return userProfile.userId != this.userData.userId;})
          .filter(userProfile => {
            if(!this.userData?.userProfileDto?.connexions) return true;
            return !this.userData.userProfileDto.connexions.includes(userProfile.userId)
          })

        this.selectedUserProfile = this.userProfilesList[0];
        this.usersLoaded = true;
        this.selectedUserProfileSubject.next();
      })
  }
  private showSnackBar(message : string){
    this.snackBar.open(message,'Close',{duration: 2000})
  }


}

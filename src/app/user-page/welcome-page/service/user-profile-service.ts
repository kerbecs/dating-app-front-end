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
export class UserProfileService {
  public selectedIndex = 0;
  public userProfilesList: UserProfileDto[] = [];
  public filteredUserProfileList: UserProfileDto[] = [];
  public selectedUserProfileSubject = new Subject<void>();
  public userData!: UserDataDto | null;
  public selectedUserProfile?: UserProfileDto;
  public usersLoaded = false;

  constructor(private http: HttpClient, private store: Store<storeType>, private snackBar: MatSnackBar) {
    store.select(userDataSelector).subscribe(userData => {
      if (!userData) return null;
      this.userData = userData
      this.getUsersProfiles.call(this);

      return userData;
    });
  }

  public addConnexion() {
    this.http.post(environment.userService + 'user-connexions', new UserConnexionDto(this.userData?.userId || 0, this.selectedUserProfile?.userId || 0))
      .subscribe({
        next: it => {
          this.showSnackBar('User added successfully');
          if (this.selectedUserProfile) this.store.dispatch(addConnexionAction(this.selectedUserProfile))
          this.nextUserProfile()
        },
        error: it => {
          this.showSnackBar('Error when adding user')
        }
      });
  }

  resetSelectedIndex() {
    if (this.filteredUserProfileList.length == 0) return;
    this.selectedIndex = 0;
    this.selectedUserProfile = this.filteredUserProfileList[this.selectedIndex];
    this.selectedUserProfileSubject.next();
  }

  nextUserProfile() {
    if (this.filteredUserProfileList.length == 0 || this.filteredUserProfileList.length == 1) return;

    if (this.filteredUserProfileList.length > this.selectedIndex + 1) this.selectedIndex++;
    else this.selectedIndex--;
    this.selectedUserProfile = this.filteredUserProfileList[this.selectedIndex];
    this.selectedUserProfileSubject.next();
  }

  public getUsersProfiles() {
    this.http.get(environment.userService + 'user-profile')
      .subscribe(resp => {
        this.userProfilesList = <UserProfileDto[]>resp;
        this.userProfilesList = this.userProfilesList.filter(userProfile => {
          if (!this.userData) return true;
          return userProfile.userId != this.userData.userId;
        })
          .filter(userProfile => {
            if (!this.userData?.userProfileDto?.connexions) return true;
            return !this.userData.userProfileDto.connexions.includes(userProfile.userId)
          })

        this.filteredUserProfileList = this.userProfilesList;

        this.selectedUserProfile = this.filteredUserProfileList[0];
        this.usersLoaded = true;
        this.getUsersCompatibility();
        this.getUsersDistance();
        this.selectedUserProfileSubject.next();

      })
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {duration: 2000})
  }

  private getUsersCompatibility() {
    this.userProfilesList
      .forEach(profile => {
        this.http.get(environment.compatibilityService + 'compatibility-rate/' + profile.userId + '/' + this.userData?.userId)
          .subscribe({
            next: resp => {
              profile.compatibility = <number>resp
            },
            error: err => {}
          })
      })
  }

  private getUsersDistance() {
    let [x, y] = [0, 0];
    navigator.geolocation.getCurrentPosition(position => {
      x = position.coords.latitude;
      y = position.coords.longitude;

      this.userProfilesList.forEach(profile => {
        if (profile.coords && profile.coords.x && profile.coords.y) {
          profile.distance = this.distanceBetweenPoints(x, y, profile.coords.x, profile.coords.y);
        }
      })
    })

  }

  private distanceBetweenPoints(lat1: number, lon1: number, lat2: number, lon2: number) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344
      return dist;
    }
  }


}

import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {UserProfileDto} from "../../welcome-page/helper/user-profile-dto";
import {NgClass, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {removeConnexionsAction} from "../../../state/action/connexions-profiles.action";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {userDataSelector} from "../../../state/selector/user-data.selector";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatIcon,
    NgStyle,
    NgClass
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements AfterViewInit{
  @Input()
  public userProfile! : UserProfileDto;
  @ViewChild("profileContainer")
  public profileContainer! : ElementRef;
  @ViewChild("mainContainer")
  private mainContainer! : ElementRef;
  private userData! : UserDataDto | null;

  constructor(private renderer : Renderer2, private store : Store<storeType>) {
    store.select(userDataSelector).subscribe(userData => {
      this.userData = userData;
    })
  }

  ngAfterViewInit(): void {
    console.log(this.userProfile)
    this.renderer.setStyle(this.profileContainer.nativeElement,'background-image',`url('${this.userProfile?.imgUrl}')`)
  }
  public removeConnexion(){
    if(!this.userData || !this.userProfile) return;
    this.store.dispatch(removeConnexionsAction(
      {userId: this.userData?.userId,
              userConnexionId: this.userProfile.userId}));
    this.mainContainer.nativeElement.remove();
  }
}

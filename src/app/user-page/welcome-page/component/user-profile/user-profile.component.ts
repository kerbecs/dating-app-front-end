import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {UserProfileService} from "../../service/user-profile-service";
import {UserProfileDto} from "../../helper/user-profile-dto";
import {AgePipe} from "../../pipe/age-pipe";
import {CountryPipe} from "../../pipe/country-pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatIcon,
    AgePipe,
    CountryPipe,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements AfterViewInit{
  @ViewChild('imgContainer')
  private imgContainerRef? : ElementRef;

  constructor(public userProfileService : UserProfileService, private renderer : Renderer2) {
    this.userProfileService.selectedUserProfileSubject.subscribe(resp => {
      this.setProfileImage();
    })
  }
  setProfileImage(){
    if(!this.imgContainerRef || !this.userProfileService.selectedUserProfile) return;
    this.renderer.setStyle(this.imgContainerRef.nativeElement,'background-image', `url(${this.userProfileService.selectedUserProfile?.imgUrl})`)
  }

  ngAfterViewInit(): void {
    this.setProfileImage()
  }
}

import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {UserProfileService} from "../../service/user-profile-service";
import {AgePipe} from "../../pipe/age-pipe";
import {CountryPipe} from "../../pipe/country-pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "./dialog/filter-dialog/filter-dialog.component";
import {ReportDialogComponent} from "./dialog/report-dialog/report-dialog.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {UserInfoService} from "../../service/user-info.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatIcon,
    AgePipe,
    CountryPipe,
    MatProgressSpinner,
    NgIf,
    NgClass,
    NgStyle,
    UserInfoComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements AfterViewInit{
  @ViewChild('imgContainer')
  private imgContainerRef? : ElementRef;
  public showUserInfo = false;

  constructor(public userProfileService : UserProfileService, private renderer : Renderer2, public dialog: MatDialog, public userInfoService : UserInfoService) {
    this.userProfileService.selectedUserProfileSubject.subscribe(resp => {
      this.setProfileImage();
    })

  }
  setProfileImage(){
    if(!this.imgContainerRef || !this.userProfileService.selectedUserProfile) return;
    this.renderer.setStyle(this.imgContainerRef.nativeElement,'background-image', `url(${this.userProfileService.selectedUserProfile.imgUrl})`)
  }

  ngAfterViewInit(): void {
    this.setProfileImage()
  }
  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {},
    });
  }
  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: {},
    });
  }
  public chooseCompatibilityColor(){
    const number = this.userProfileService.selectedUserProfile?.compatibility;

    if(!number || isNaN(number)) return 'white';

    if(number <= 15) return 'red';
    else if(number <= 50) return 'orange'
    else if(number <= 75) return 'yellow'
    else return 'green'

  }

}

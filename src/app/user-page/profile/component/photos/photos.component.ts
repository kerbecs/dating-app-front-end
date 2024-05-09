import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {storeType} from "../../../../state/store";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {userDataSelector} from "../../../../state/selector/user-data.selector";
import {UserDataDto} from "../../../../state/helper/user-data-dto";
import {PhotoComponent} from "./photo/photo.component";
import {NgForOf} from "@angular/common";
import {PhotoService} from "../../service/photo-service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ProfilePhotoComponent} from "./profile-photo-dialog/profile-photo.component";

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    PhotoComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent{
  @ViewChild("profileImg")
  private profileImg! : ElementRef;
  constructor(public photoService : PhotoService, private renderer : Renderer2, public dialog: MatDialog) {
    this.photoService.userDataSubject.subscribe(() => {
      this.loadUserProfileImage()
    })
  }

  loadUserProfileImage(): void {
    this.renderer.setStyle(this.profileImg.nativeElement, 'background-image',`url('${this.photoService.userData?.userProfileDto?.imgUrl}')`)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProfilePhotoComponent, {
      data: {imgUrl : 'string'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

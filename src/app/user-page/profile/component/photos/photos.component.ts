import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
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
export class PhotosComponent implements AfterViewInit{
  @ViewChild("profileImg")
  private profileImg! : ElementRef;
  constructor(public photoService : PhotoService, private renderer : Renderer2, public dialog: MatDialog) {
    this.photoService.userDataSubject.subscribe(() => {
      this.loadUserProfileImage()
    })
  }

  ngAfterViewInit(): void {
        this.loadUserProfileImage()
    }

  loadUserProfileImage(): void {
    if(!this.profileImg?.nativeElement || !this.photoService?.userData) return;
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

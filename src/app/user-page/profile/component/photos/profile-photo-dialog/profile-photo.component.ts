import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {PhotoComponent} from "../photo/photo.component";
import {PhotoService} from "../../../service/photo-service";
import {NgForOf} from "@angular/common";

class DialogData {
}

@Component({
  selector: 'profile-photo.component',
  templateUrl: 'profile-photo.component.html',
  styleUrl: 'profile-photo.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    PhotoComponent,
    NgForOf,
  ],
})
export class ProfilePhotoComponent {

  constructor(
    public dialogRef: MatDialogRef<ProfilePhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public photoService : PhotoService
  ) {
    this.photoService.closeChooseProfilePhotoDialog.subscribe(() => this.onNoClick())
  }

  onNoClick(): void {
    this.photoService.selectedPhoto = null;
    this.dialogRef.close();
  }
}

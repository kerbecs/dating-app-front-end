import { Component } from '@angular/core';
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
export class PhotosComponent {
  constructor(public photoService : PhotoService) {
  }
}

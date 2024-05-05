import {Component, Inject} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {storeType} from "../../../../../../state/store";
import {Store} from "@ngrx/store";
import {preferenceSelector} from "../../../../../../state/selector/preference.selector";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {educationSelector} from "../../../../../../state/selector/education.selector";
import {sexualOrientationSelector} from "../../../../../../state/selector/sexual-orientation.selector";
import {raceSelector} from "../../../../../../state/selector/race.selector";
import {genderSelector} from "../../../../../../state/selector/gender.selector";
import {EnumFormatPipe} from "../../../../../pipe/enum-format.pipe";
import {FilterUserProfileService} from "../../../../service/filter-user-profile.service";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'filter-dialog-component',
  templateUrl: 'filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css',
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
    MatSlider,
    MatSliderRangeThumb,
    MatSliderThumb,
    MatSelect,
    NgForOf,
    MatOption,
    EnumFormatPipe,
    ReactiveFormsModule,
    MatIcon,
  ],
})
export class FilterDialogComponent {
  public preferenceList : string[] = [];
  public educationList : string[] = [];
  public sexualOrientationList : string[] = [];
  public raceLit : string[] = [];
  public genderList : string[] = [];
    constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    store : Store<storeType>,
    public filterUserProfileService : FilterUserProfileService
  ) {
    store.select(educationSelector)
      .subscribe(educationList => {
        this.educationList = educationList;
      })
      store.select(sexualOrientationSelector)
        .subscribe(sexualOrientationList => {
          this.sexualOrientationList = sexualOrientationList;
        })
      store.select(raceSelector)
        .subscribe(raceLit => {
          this.raceLit = raceLit;
        })
      store.select(preferenceSelector)
        .subscribe(preferenceList => {
          this.preferenceList = preferenceList;
        })
      store.select(genderSelector)
        .subscribe(genderList => {
          this.genderList = genderList;
        })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onApplyFilters(){
      this.filterUserProfileService.filter();
      this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import {EnumFormatPipe} from "../../../../../pipe/enum-format.pipe";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../../../state/store";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {reportReasonSelector} from "../../../../../../state/selector/report-reason.selector";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-report-dialog',
  standalone: true,
  imports: [
    EnumFormatPipe,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatSlider,
    MatSliderRangeThumb,
    MatSliderThumb,
    NgForOf,
    MatInput
  ],
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.css'
})
export class ReportDialogComponent {
  public reportReasonList : string[] = [];
  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    store : Store<storeType>
  ) {
    store.select(reportReasonSelector)
      .subscribe(reportReasonList => this.reportReasonList = reportReasonList);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

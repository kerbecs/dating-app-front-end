import { Component } from '@angular/core';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MapService} from "../../service/map.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {visibilityList} from "./helper/visibility-list";
import {eventTypeList} from "./helper/event-type-list";
import {NgForOf, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../state/store";
import {loginTokenSelector} from "../../../../state/selector/login-token.selector";
import {MapEventService} from "../../service/map-event.service";
import {SendMapEvent} from "../../helper/send-map-event";
import {MapEvent} from "../../helper/map-event";
import {MapEventFormData} from "../../helper/map-event-form-data";

@Component({
  selector: 'app-add-event-form',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatHint,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-event-form.component.html',
  styleUrl: './add-event-form.component.css'
})
export class AddEventFormComponent {
  public userAddedMarker = false;
  public formGroup : FormGroup = new FormGroup({
    eventType: new FormControl({value: null, disabled: true},[Validators.required]),
    visibility: new FormControl({value: null, disabled: true},[Validators.required]),
    description: new FormControl({value: null, disabled: true},[Validators.required])
  })
  private loginToken : string | null = '';
  protected readonly eventTypeList = eventTypeList;
  protected readonly visibilityList = visibilityList;
  constructor(public mapEventService : MapEventService, private store : Store<storeType>) {
    this.disableFieldsForm();

    mapEventService.eventAddedSubject.subscribe(value => {
      this.formGroup.reset();
      this.userAddedMarker = false;
      this.mapEventService.setLinkToMainMap()
    })

    mapEventService.userAddedMarkerSubject.subscribe(next => {
      this.userAddedMarker = true;
      if(next) this.enableFieldsForm()
      else this.disableFieldsForm()
    }
    );
    store.select(loginTokenSelector).subscribe(value => this.loginToken = value)

  }
  enableFieldsForm(){
    this.formGroup.get('eventType')?.enable();
    this.formGroup.get('visibility')?.enable();
    this.formGroup.get('description')?.enable();
  }
  disableFieldsForm(){
    this.formGroup.get('eventType')?.disable();
    this.formGroup.get('visibility')?.disable();
    this.formGroup.get('description')?.disable();
  }
  getDescription(){
    return this.formGroup.get('description')?.value;
  }
  getEventType(){
    return this.formGroup.get('eventType')?.value;

  }
  getVisibility(){
    return this.formGroup.get('visibility')?.value;

  }
  sendForm(){
    this.mapEventService.saveAddedEvent(new MapEventFormData(this.getDescription(),this.getVisibility(),this.getEventType()));
  }
  closeForm(){
    this.mapEventService.removeAddedMarker()
    this.mapEventService.setLinkToMainMap();
    this.formGroup.reset();
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {createPicker} from "picmo";
import {PickerComponent} from "@ctrl/ngx-emoji-mart";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessageWebSocketService} from "../../../../websocket/message-web-socket.service";

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    PickerComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './text-area.component.html',
  styleUrls: [
    './text-area.component.css',
  ]
})
export class TextAreaComponent{
  public form! : FormGroup;
  constructor(private webSocketService : MessageWebSocketService) {
    this.form = new FormGroup({
      textMessage: new FormControl(null, [Validators.required])
    })
  }
  onSendMessage(){
    if(this.form.invalid) return;
    this.webSocketService.sendMessage(this.form.controls['textMessage'].value)
    this.form.reset();
  }
}

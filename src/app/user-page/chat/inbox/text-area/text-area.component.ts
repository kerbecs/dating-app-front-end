import {Component} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PickerComponent} from "@ctrl/ngx-emoji-mart";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MessageWebSocketService} from "../../../../websocket/message-web-socket.service";
import {ImageToSendComponent} from "./image-to-send/image-to-send.component";

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
    ImageToSendComponent,
  ],
  templateUrl: './text-area.component.html',
  styleUrls: [
    './text-area.component.css',
  ]
})
export class TextAreaComponent{
  public form! : FormGroup;
  public filesToSend = new Array<File>();
  constructor(private webSocketService : MessageWebSocketService) {
    this.form = new FormGroup({
      textMessage: new FormControl(null),
    })
  }
  onSendMessage(){
    if(this.form.invalid) return;
    this.webSocketService.sendMessage(this.form.controls['textMessage'].value)
    this.form.reset();
  }
  onLoadFile(event : Event){
    // @ts-ignore
    this.filesToSend.push(event.target.files[0]);
    console.log(this.filesToSend)
  }
}

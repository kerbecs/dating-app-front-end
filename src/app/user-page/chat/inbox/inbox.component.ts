import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MenuComponent} from "./menu/menu.component";
import {TextAreaComponent} from "./text-area/text-area.component";
import {FriendMessageComponent} from "./message/friend-message/friend-message.component";
import {UserMessageComponent} from "./message/user-message/user-message.component";
import {ChatService} from "../service/chat.service";
import {MessageComponent} from "./message/message.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MenuComponent,
    TextAreaComponent,
    FriendMessageComponent,
    UserMessageComponent,
    MessageComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;

  constructor(public chatService: ChatService) {
    chatService.scrollSubject.subscribe(() => {
      setTimeout(this.scrollTop.bind(this), 300)

    })
  }

  private scrollTop() {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }


}

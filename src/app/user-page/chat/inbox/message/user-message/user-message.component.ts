import {Component, Input} from '@angular/core';
import {Message} from "../../../helper/Message";
import {DatePipe} from "../../../pipe/date.pipe";

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css'
})
export class UserMessageComponent {
  @Input()
  public message! : Message;
}

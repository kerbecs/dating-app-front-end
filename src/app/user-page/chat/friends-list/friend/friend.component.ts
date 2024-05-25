import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {UserProfileDto} from "../../../welcome-page/helper/user-profile-dto";
import {ChatService} from "../../service/chat.service";
import {NgClass} from "@angular/common";
import {Message} from "../../helper/Message";
import {DatePipe} from "../../pipe/date.pipe";
import {LastMessagePipe} from "../../pipe/last-message.pipe";
import {ElementsControlService} from "../../service/elements-control.service";
import {ActivatedRoute, Params, RouterLink} from "@angular/router";

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    LastMessagePipe,
    RouterLink
  ],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent implements AfterViewInit{
  @Input()
  public userProfile! : UserProfileDto;
  public lastMessage! : Message;
  @ViewChild('container')
  private container! : ElementRef;
  @ViewChild('imgContainer')
  private imgContainer! : ElementRef;
  constructor(public chatService : ChatService, private renderer : Renderer2, private elementControlService : ElementsControlService, private activatedRoute  :ActivatedRoute) {
    chatService.newMessageSubject.subscribe(message => {
      if(message.senderId == this.userProfile.userId){
        renderer.addClass(this.container.nativeElement,'new-message')
        this.lastMessage = message;
      }
    })
  }
  onFriendClick(){
    this.chatService.getAllUsersMessages(this.userProfile.userId);
    this.chatService.isAFriendSelected = true;
    this.chatService.scrollSubject.next();
    this.renderer.removeClass(this.container.nativeElement,'new-message')
    this.elementControlService.hideFriendsListMobile();
    this.chatService.readMessages();
  }

  ngAfterViewInit(): void {
    this.chatService.getLastMessage(this.userProfile.userId)
      .subscribe(message => {
        this.lastMessage = <Message>message;
      })
    this.setUserImageProfile();

    this.activatedRoute.queryParams.subscribe(params => {
      if(this.userProfile?.userId == params?.['userId']) this.onFriendClick();
    })
  }
  setUserImageProfile(){
    this.renderer.setStyle(this.imgContainer.nativeElement,'background-image',`url('${this.userProfile.imgUrl}')`)
  }
}

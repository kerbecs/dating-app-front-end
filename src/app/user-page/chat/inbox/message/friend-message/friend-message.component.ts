import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Message} from "../../../helper/Message";
import {DatePipe} from "../../../pipe/date.pipe";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../../state/store";
import {connexionsProfilesSelector} from "../../../../../state/selector/connexions-profiles.selector";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LanguageService} from "../../../../../service/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateMessageDto} from "../../../helper/translate-message-dto";

@Component({
  selector: 'app-friend-message',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './friend-message.component.html',
  styleUrl: './friend-message.component.css'
})
export class FriendMessageComponent implements AfterViewInit{
  @Input()
  public message! : Message;
  @ViewChild('imgProfile')
  public imgProfile! : ElementRef;
  constructor(private store : Store<storeType>, private renderer : Renderer2, private languageService : LanguageService, private _snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.store.select(connexionsProfilesSelector)
      .subscribe(connexions => {
        const user = connexions.find(it => it.userId == this.message.senderId);
        this.renderer.setStyle(this.imgProfile.nativeElement,'background-image',
          `url('${user?.imgUrl || 'https://freesvg.org/img/abstract-user-flat-4.png'}')`);
      })
  }
  translateMessage(){
    if(!this.message?.content) return;
    this.languageService.translateMessage(this.message.content)
      ?.subscribe({
        next: message => {
          if(message){
            this.message.content = (<TranslateMessageDto>message).message;
          }
        },
        error: err => {
          console.log(err)
          this.openSnackBar("An error has occurred",'Close')
        }
      })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

}

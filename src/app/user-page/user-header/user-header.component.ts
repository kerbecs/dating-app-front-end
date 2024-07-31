import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSuffix} from "@angular/material/form-field";
import {RouterLink} from "@angular/router";
import {UserHeaderService} from "./service/user-header-service";
import {MatBadge} from "@angular/material/badge";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {NotificationService} from "./service/notification-service";
import {ChatService} from "../chat/service/chat.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatFabButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatSuffix,
    RouterLink,
    MatBadge,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit {
  @ViewChild('mobileHeader', {static: true})
  mobileHeader: ElementRef | undefined;
  @ViewChild('menuButton', {static: true})
  menuButton: ElementRef | undefined;

  constructor(private renderer: Renderer2,public languageService : LanguageService, public userHeaderService : UserHeaderService, public notificationService : NotificationService, public chatService : ChatService) {
  }

  ngOnInit(): void {
    this.renderer.listen(this.menuButton?.nativeElement, 'click', () => {
      if (this.mobileHeader?.nativeElement.classList.contains('mobile-menu-open')) {
        this.renderer.removeClass(this.mobileHeader?.nativeElement, 'mobile-menu-open')
        this.renderer.addClass(this.mobileHeader?.nativeElement, 'mobile-menu-close')
        setTimeout(() => this.renderer.removeClass(this.mobileHeader?.nativeElement, 'mobile-menu-close'), 300)
      } else {
        this.renderer.addClass(this.mobileHeader?.nativeElement, 'mobile-menu-open')
        this.renderer.removeClass(this.mobileHeader?.nativeElement, 'mobile-menu-close')
      }
    })

  }
  closeMobileMenu(){
    this.renderer.removeClass(this.mobileHeader?.nativeElement,'mobile-menu-open')
    this.renderer.addClass(this.mobileHeader?.nativeElement, 'mobile-menu-close')
  }

}

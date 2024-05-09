import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {UserProfileService} from "../../../service/user-profile-service";
import {UserInfoService} from "../../../service/user-info.service";
import {DatePipe} from "../../../pipe/date-pipe";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../../state/store";
import {countryListSelector} from "../../../../../state/selector/country-list.selector";
import {CountryPipe} from "../../../pipe/country-pipe";
import {EnumFormatPipe} from "../../../../pipe/enum-format.pipe";
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {AgePipe} from "../../../pipe/age-pipe";
import {NgForOf, NgIf} from "@angular/common";
import {ImageComponent} from "./image/image.component";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    DatePipe,
    CountryPipe,
    EnumFormatPipe,
    MatIcon,
    MatSuffix,
    AgePipe,
    NgForOf,
    NgIf,
    ImageComponent
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @ViewChild('container')
  private container! : ElementRef;
  private countryList = new Array<{name:string, code:string}>();

  constructor(public userService : UserProfileService, public userInfoService : UserInfoService, private render : Renderer2) {

    userInfoService.toggle.subscribe(() => this.toggleElement())
  }
  toggleElement() {
    if ((<DOMTokenList>this.container.nativeElement.classList).contains('opened')) {
      this.render.removeClass(this.container.nativeElement, 'opened')
      this.render.addClass(this.container.nativeElement, 'closed');
    } else if ((<DOMTokenList>this.container.nativeElement.classList).contains('closed')) {
      this.render.removeClass(this.container.nativeElement, 'closed')
      this.render.addClass(this.container.nativeElement, 'opened');
    } else {
      this.render.addClass(this.container.nativeElement, 'opened');
    }
  }

}

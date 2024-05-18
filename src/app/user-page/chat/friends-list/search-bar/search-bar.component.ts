import { Component } from '@angular/core';
import {FriendsService} from "../../service/friends.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  public form = new FormGroup({
    text: new FormControl('')
  })
  constructor(public friendService : FriendsService) {

  }
  onChange(event : Event){
    if(this.form.controls?.['text']?.value == null) return;
    this.friendService.filterUserConnexions(this.form.controls['text'].value)

  }
}

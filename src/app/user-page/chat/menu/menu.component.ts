import { Component } from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButton,
    MatAnchor
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}

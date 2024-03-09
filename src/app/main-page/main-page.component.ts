import {Component} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {StartPageComponent} from "./components/start-page/start-page.component";
import {RouterOutlet} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [StartPageComponent, HeaderComponent, RouterOutlet, LoginPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}

import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent implements OnInit{
  @ViewChild('register',{static: true})
  private register : ElementRef | undefined;
  @ViewChild('login',{static: true})
  private login : ElementRef | undefined;

  constructor(private renderer:Renderer2) {
  }

  ngOnInit(): void {

  }

}

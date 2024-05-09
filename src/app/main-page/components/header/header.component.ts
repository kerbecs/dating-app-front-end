import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @ViewChild('menuButton', {static: true})
  private menuButton : ElementRef | undefined;
  @ViewChild('navMenu', {static: true})
  private navMenu : ElementRef | undefined;


  constructor(private renderer : Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.listen(this.menuButton?.nativeElement,'click',() => {
      if(this.navMenu?.nativeElement.classList.contains('open-menu')){
        this.renderer.removeClass(this.navMenu?.nativeElement,'open-menu')
        this.renderer.addClass(this.navMenu?.nativeElement, 'close-menu')
        setTimeout(() => this.renderer.removeClass(this.navMenu?.nativeElement, 'close-menu'),300)
      }
      else{
        this.renderer.addClass(this.navMenu?.nativeElement,'open-menu')
        this.renderer.removeClass(this.navMenu?.nativeElement,'close-menu')
      }
    })

  }
  closeMenu(){
    this.renderer.removeClass(this.navMenu?.nativeElement,'open-menu')
    this.renderer.addClass(this.navMenu?.nativeElement, 'close-menu')
  }

}

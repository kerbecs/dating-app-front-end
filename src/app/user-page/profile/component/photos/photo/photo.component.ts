import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent implements AfterViewInit{
  @ViewChild("container")
  private elementRef! : ElementRef;
  @Input("img-url")
  public imageUrl! : string;

  constructor(private renderer : Renderer2) {
  }

  ngAfterViewInit(): void {
    console.log('img: ',this.imageUrl)
    this.renderer.setStyle(this.elementRef.nativeElement,'background-image',`url('${this.imageUrl}')`);
  }
}

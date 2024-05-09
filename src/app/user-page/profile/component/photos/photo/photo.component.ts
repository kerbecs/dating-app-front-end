import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {PhotoService} from "../../../service/photo-service";

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent implements AfterViewInit{
  @ViewChild("container")
  private elementRef! : ElementRef;
  @Input("img-url")
  public imageUrl! : string;
  @Input("isForSelect")
  public isForSelect = false;

  constructor(private renderer : Renderer2, private photoService : PhotoService) {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement,'background-image',`url('${this.imageUrl}')`);
    if(this.isForSelect) {
      this.photoService.selectPhotoAsProfile.subscribe(link => {
        if (this.imageUrl != link) this.renderer.removeClass(this.elementRef.nativeElement, 'selected');
      })
    }
  }
  deletePhoto(){
    this.photoService.deletePhoto(this.getPhotoId());
  }
  selectPhoto(){
    if(!this.isForSelect) return;
    this.photoService.selectPhotoAsProfileImage(this.imageUrl);
    this.renderer.addClass(this.elementRef.nativeElement, 'selected')
  }
  private getPhotoId(){
    const lastIndexOfSlash = this.imageUrl.lastIndexOf("/");
    const lastIndexOfName = this.imageUrl.lastIndexOf("?");

    return this.imageUrl.slice(lastIndexOfSlash+1, lastIndexOfName);
  }

}

import {Component, ElementRef, Renderer2, ViewChild} from "@angular/core";
import {UserProfileService} from "../../../../service/user-profile-service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-image-user',
  standalone: true,
  templateUrl: './image.component.html',
  imports: [
    MatIcon
  ],
  styleUrl: './image.component.css'
})
export class ImageComponent {
  @ViewChild("main")
  public elementRef!: ElementRef;
  public selectedIndex = 0;

  constructor(public userService: UserProfileService, private renderer: Renderer2) {
    userService.selectedUserProfileSubject.subscribe(() => {
      this.selectedIndex = 0;
      this.setPhoto()
    })

  }

  nextPhoto() {
    console.log(this.selectedIndex)
    console.log(this.userService.selectedUserProfile?.images.length)
    if (!this.userService.selectedUserProfile?.images) return;
    if (this.selectedIndex < this.userService.selectedUserProfile?.images?.length - 1) {
      this.selectedIndex++;
      this.setPhoto();
    }

  }

  previousPhoto() {
    if (this.selectedIndex == 0) return;
    this.selectedIndex--;
    this.setPhoto()
  }

  setPhoto(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url('${this.userService.selectedUserProfile?.images?.at(this.selectedIndex)}')`)
  }

}

import {Injectable} from "@angular/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class ElementsControlService{
  private _displayFriendsList : boolean = true;
  private _displayInbox : boolean = false;

 constructor(private router : Router) {
 }
  public showFriendsListMobile(){
      this.router.navigate(['user','chat'])
      this.displayFriendsList = true;
      this.displayInbox = false;
  }
  public hideFriendsListMobile(){
    if(window.innerWidth <= 768){
      this.displayFriendsList = false;
      this.displayInbox = true;
    }
  }
  get displayFriendsList(): boolean {
    return this._displayFriendsList;
  }

  set displayFriendsList(value: boolean) {
    this._displayFriendsList = value;
  }

  get displayInbox(): boolean {
    return this._displayInbox;
  }

  set displayInbox(value: boolean) {
    this._displayInbox = value;
  }
}

import {Injectable} from "@angular/core";

@Injectable()
export class ElementsControlService{
  private _displayFriendsList : boolean = true;
  private _displayInbox : boolean = false;


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

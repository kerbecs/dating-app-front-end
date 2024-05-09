import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService{
  public toggle = new Subject<void>();

  toggleAction(){
    this.toggle.next();
  }
}

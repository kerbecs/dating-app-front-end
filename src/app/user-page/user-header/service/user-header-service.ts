import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {invalidateToken} from "../../../state/action/login-token.actions";

@Injectable({providedIn: 'root'})
export class UserHeaderService{
  constructor(private store : Store<storeType>) {
  }
  public logout(){
    this.store.dispatch(invalidateToken())
  }
}

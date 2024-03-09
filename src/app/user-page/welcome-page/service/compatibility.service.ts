import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserCompatibilityDto} from "../helper/user-compatibility-dto";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class CompatibilityService{
  constructor(private http : HttpClient) {
  }
  sendCompatibilityAction(action : UserCompatibilityDto){
    this.http.post(environment.compatibilityService+'compatibility',action)
      .subscribe();
  }

}

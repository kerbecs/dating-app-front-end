import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {storeType} from "../state/store";
import {languageSelector} from "../state/selector/language.selector";
import {loginTokenSelector} from "../state/selector/login-token.selector";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {getTokenFromStorage} from "../state/action/login-token.actions";
import {userDataSelector} from "../state/selector/user-data.selector";
import {TranslateMessageDto} from "../user-page/chat/helper/translate-message-dto";

@Injectable({providedIn: 'root'})
export class LanguageService{
  public languageList = new Array<string>();
  private loginToken! : string | null;
  public selectedLanguage = 'EN';
  constructor(private store : Store<storeType>, private http : HttpClient,) {
    this.store.select(languageSelector)
      .subscribe(languageList => {
        if(languageList) this.languageList = languageList;
      })
    this.store.select(loginTokenSelector)
      .subscribe(loginToken => {
        if(loginToken) this.loginToken = loginToken;
      })
    this.store.select(userDataSelector)
      .subscribe(user => {
        if(user?.userProfileDto?.userSettings?.language) this.selectedLanguage = user.userProfileDto.userSettings.language
      })
  }
  public changeUserLanguage(language : string){
    if(!this.loginToken) return;
    this.http.put(environment.userService+'user-profile/language/'+language,{},{
      headers: {
        loginToken: this.loginToken
      }
    })
      .subscribe(resp => {
        this.store.dispatch(getTokenFromStorage())
      })
  }
  public translateMessage(message : string){
    if(!message || !this.loginToken) return;
    return this.http.post(environment.toolService+'translate/message',new TranslateMessageDto(message, this.selectedLanguage),{
      headers: {
        loginToken: this.loginToken
      }
    })
  }

}

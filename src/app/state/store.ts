import {countryListReducer} from "./reducer/country-list.reducer";
import {loginTokenReducer} from "./reducer/login-token.reducer";
import {userLocationReducer} from "./reducer/user-location.reducer";
import {UserDataDto} from "./helper/user-data-dto";
import {userDataReducer} from "./reducer/user-data-reducer";
import {connexionsProfilesReducer} from "./reducer/connexions-profiles.reducer";
import {UserProfileDto} from "../user-page/welcome-page/helper/user-profile-dto";


export const store  = {
    countryList : countryListReducer,
    loginToken : loginTokenReducer,
    userLocation: userLocationReducer,
    userData: userDataReducer,
    connexionsProfiles: connexionsProfilesReducer
}
export type storeType = {
  countryList : {name : string, code : string}[],
  loginToken : string | null,
  userLocation : {x : number, y : number},
  userData : UserDataDto | null,
  connexionsProfiles : UserProfileDto[]
}

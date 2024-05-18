import {countryListReducer} from "./reducer/country-list.reducer";
import {loginTokenReducer} from "./reducer/login-token.reducer";
import {userLocationReducer} from "./reducer/user-location.reducer";
import {UserDataDto} from "./helper/user-data-dto";
import {userDataReducer} from "./reducer/user-data-reducer";
import {connexionsProfilesReducer} from "./reducer/connexions-profiles.reducer";
import {UserProfileDto} from "../user-page/welcome-page/helper/user-profile-dto";
import {userAccountSelector} from "./selector/user-account.selector";
import {UserAccountDto} from "./helper/user-account-dto";
import {userAccountReducer} from "./reducer/user-account.reducer";
import {preferenceReducer} from "./reducer/preference.reducer";
import {sexualOrientationReducer} from "./reducer/sexual-orientation.reducer";
import {raceReducer} from "./reducer/race.reducer";
import {educationReducer} from "./reducer/education.reducer";
import {genderReducer} from "./reducer/gender.reducer";
import {reportReasonSelector} from "./selector/report-reason.selector";
import {reportReasonReducer} from "./reducer/report-reason.reducer";
import {languageReducer} from "./reducer/language.reducer";


export const store  = {
    countryList : countryListReducer,
    loginToken : loginTokenReducer,
    userLocation: userLocationReducer,
    userData: userDataReducer,
    connexionsProfiles: connexionsProfilesReducer,
    userAccount: userAccountReducer,
    preferenceList: preferenceReducer,
    sexualOrientationList: sexualOrientationReducer,
    raceList: raceReducer,
    educationList: educationReducer,
    genderList : genderReducer,
    reportReasonList: reportReasonReducer,
    languageList: languageReducer
}
export type storeType = {
  countryList : {name : string, code : string}[],
  loginToken : string | null,
  userLocation : {x : number, y : number},
  userData : UserDataDto | null,
  connexionsProfiles : UserProfileDto[],
  userAccount: UserAccountDto | null,
  preferenceList: string[],
  sexualOrientationList : string[],
  raceList: string[],
  educationList: string[],
  genderList: string[],
  reportReasonList: string[],
  languageList: string[]
}

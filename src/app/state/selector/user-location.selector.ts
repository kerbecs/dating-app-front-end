import {Store} from "@ngrx/store";
import {storeType} from "../store";
import {userLocationReducer} from "../reducer/user-location.reducer";

export const userLocationSelector = (store : storeType) => store.userLocation;

import {NgModule} from "@angular/core";
import {MainPageRoutesModule} from "../main-page/routes/main-page-routes-module";
import {UserPageRoutesModule} from "../user-page/routes/user-page-routes-module";

@NgModule({
  imports: [MainPageRoutesModule, UserPageRoutesModule]
})
export class GlobalRoutesModule {

}

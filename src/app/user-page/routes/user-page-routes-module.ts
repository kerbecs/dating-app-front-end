import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {userPageRoutes} from "./user-page.routes";

@NgModule({
  imports: [RouterModule.forChild(userPageRoutes)],
  exports: [RouterModule]
})
export class UserPageRoutesModule {

}

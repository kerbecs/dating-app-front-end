import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./main-page-routes";

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainPageRoutesModule{

}

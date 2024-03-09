import { Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {RegisterPageComponent} from "./main-page/components/register-page/register-page.component";
import {StartPageComponent} from "./main-page/components/start-page/start-page.component";
import {MapComponent} from "./user-page/map/map.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent, children: [
      {path: '', component: StartPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]},
];

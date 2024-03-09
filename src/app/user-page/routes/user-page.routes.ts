import {Routes} from "@angular/router";
import {UserPageComponent} from "../user-page.component";
import {MatchPageComponent} from "../match-page/match-page.component";
import {ProfileComponent} from "../profile/profile.component";
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {ChatComponent} from "../chat/chat.component";
import {MapComponent} from "../map/map.component";
import {MenuFormComponent} from "../map/menu-form/menu-form.component";
import {AddEventFormComponent} from "../map/menu-form/add-event-form/add-event-form.component";
import {AllEventsComponent} from "../map/menu-form/all-events/all-events.component";
import {UserEventsComponent} from "../map/menu-form/user-events/user-events.component";
import {ConnexionsComponent} from "../connexions/connexions.component";

export const userPageRoutes : Routes = [
  {path: 'user', component: UserPageComponent, children: [
      {path: 'match-page', component: MatchPageComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'welcome-page', component: WelcomePageComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'map', component: MapComponent, children:[
          {path: 'event', component: MenuFormComponent, children: [
              {path: 'newEvent', component: AddEventFormComponent},
              {path: 'allEvents', component: AllEventsComponent},
              {path: 'userEvents', component: UserEventsComponent}
            ]}
        ]},
      {path: 'connexions', component: ConnexionsComponent}
    ]}
]

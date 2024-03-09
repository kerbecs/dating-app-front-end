import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {GlobalRoutesModule} from "./routes/global-routes-module";
import { provideStore } from '@ngrx/store';
import {store} from "./state/store";
import { provideEffects } from '@ngrx/effects';
import {LoginTokenEffect} from "./state/effect/login-token.effect";
import {InterceptorService} from "./service/Interceptor.service";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ConnexionsProfilesEffect} from "./state/effect/connexions-profiles.effect";
import {UserDataEffect} from "./state/effect/user-data.effect";
import {RouterLink} from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(),
    importProvidersFrom(GlobalRoutesModule),
    provideStore(store),
    provideHttpClient(withInterceptorsFromDi()),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true,
      },
    provideEffects(LoginTokenEffect, ConnexionsProfilesEffect, UserDataEffect),
  ]
};

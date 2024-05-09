import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute, Router, RouterModule, RouterOutlet} from '@angular/router';
import {Store} from "@ngrx/store";
import {loginTokenSelector} from "./state/selector/login-token.selector";
import {storeType} from "./state/store";
import {Observable} from "rxjs";
import {getTokenFromStorage} from "./state/action/login-token.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
  private token$: Observable<string | null>;

  constructor(private store: Store<storeType>, private router: Router, private location : Location) {
    this.token$ = store.select(loginTokenSelector);
    this.store.dispatch(getTokenFromStorage());
  }

  ngOnInit(): void {
    this.token$.subscribe((token) => {
      if (!token) {
        if(this.location.path()=='/register' || this.location.path()=='/login' ||this.location.path()=='/rules'  || this.location.path()=='/about'  || this.location.path().includes('validate-email') || this.location.path().includes('reset')){
         this.router.navigate([this.location.path()])
        }
        else {
          this.router.navigate([""]);
        }
      } else {
        if (this.location.path() === '' || this.location.path() === '/') {
          this.router.navigate(['user', 'welcome-page'])
        }
      }
    })
  }
}

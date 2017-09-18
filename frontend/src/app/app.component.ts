import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {FirebaseService} from "./firebase.service";

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'app';
  user: Observable<firebase.User>;

  constructor(public firebase: FirebaseService) {
    firebase.login();

    console.log(firebase.getUser());
  }
}

import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class FirebaseService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }
}

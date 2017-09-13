import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {FirebaseService} from "./firebase.service";

export const firebaseConfig = {
  apiKey: "AIzaSyCPX0pGdwd-DdpVbZkK6K3VZpVaz6keU9s",
  authDomain: "brazucas-ragemp.firebaseapp.com",
  databaseURL: "https://brazucas-ragemp.firebaseio.com",
  storageBucket: "brazucas-ragemp.appspot.com",
  messagingSenderId: "695744593160"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

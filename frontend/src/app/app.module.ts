import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {FirebaseService} from "./firebase.service";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppRoutingModule} from "./app.routing";
import {LayoutDefaultComponent} from "./layouts/layout-default.component";
import {Layout404Component} from "./layouts/layout-404.component";

export const firebaseConfig = {
  apiKey: "AIzaSyCPX0pGdwd-DdpVbZkK6K3VZpVaz6keU9s",
  authDomain: "brazucas-ragemp.firebaseapp.com",
  databaseURL: "https://brazucas-ragemp.firebaseio.com",
  storageBucket: "brazucas-ragemp.appspot.com",
  messagingSenderId: "695744593160"
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutDefaultComponent,
    Layout404Component
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

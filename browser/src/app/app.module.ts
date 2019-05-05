import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginaComponent } from './components/pagina/pagina.component';
import { IconeComponent } from './components/icone/icone.component';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayersOnlinePage } from './players-online/players-online.page';
import {
  ApresentarAsyncDirective,
  CasoCarregandoDirective,
  CasoErroDirective,
  CasoResultadoDirective
} from './directives/apresentar-async.directive';

@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent,
    IconeComponent,
    PlayersOnlinePage,
    LoginPage,
    HomePage,
    ApresentarAsyncDirective,
    CasoResultadoDirective,
    CasoCarregandoDirective,
    CasoErroDirective,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

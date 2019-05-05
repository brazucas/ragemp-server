import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
})
export class AppComponent {
  public mostrarNavegador = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public zone: NgZone,
    public cd: ChangeDetectorRef,
  ) {
    this.initializeApp();

    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).app = (window as any).ragemp || {};
    (window as any).app.mudarPagina = this.mudarPagina.bind(this);
    (window as any).app.toggleNavegador = this.toggleNavegador.bind(this);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public mudarPagina(pagina: string) {
    this.navCtrl.navigateForward([pagina]);
  }

  public toggleNavegador(toggle: boolean) {
    this.zone.run(() => {
      this.mostrarNavegador = toggle;
      this.cd.detectChanges();
    });
  }
}

import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NavController, Platform } from '@ionic/angular';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH, PLAYER_NAME_REGEXP, RagempService } from './services/ragemp.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
})
export class AppComponent {
  public mostrarNavegador = (typeof mp === 'undefined');

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public zone: NgZone,
    public cd: ChangeDetectorRef,
    public ragemp: RagempService,
  ) {
    this.initializeApp();

    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).app = (window as any).ragemp || {};
    (window as any).app.mudarPagina = this.mudarPagina.bind(this);
    (window as any).app.toggleNavegador = this.toggleNavegador.bind(this);

    this.checarNick();
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

  public checarNick() {
    this.ragemp.playerName$.subscribe(playerName => {
      if (!playerName) {
        return;
      }

      const playerNameClean = PLAYER_NAME_REGEXP.exec(playerName);

      if (
        !playerNameClean ||
        (playerNameClean[1].length !== playerName.length) ||
        playerName.length < PLAYER_NAME_MINLENGTH ||
        playerName.length > PLAYER_NAME_MAXLENGTH
      ) {
        return this.navCtrl.navigateForward(['/nick-invalido']);
      }
    });
  }
}

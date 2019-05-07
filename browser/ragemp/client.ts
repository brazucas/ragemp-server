import { JogadorOnline } from '../src/app/players-online/players-online.page';
import { AutenticacaoResultado } from '../src/interfaces/login.interface';
import { Navegador } from './navegador';
import { ServerEvents } from './server-events';

export class Client {
  public serverEvents: ServerEvents;
  public browsers: {
    central: Navegador,
    playersOnline: Navegador,
  };
  public cursorVisible: boolean;
  public noClipCamera: CameraMp;
  public autenticacaoResultado: AutenticacaoResultado;

  constructor() {
    this.noClipCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 45);
    this.noClipCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, true, 60000, true, false);

    mp.players.local.freezePosition(true);
    mp.game.cam.doScreenFadeIn(5000);
    mp.gui.cursor.visible = false;
    mp.browsers.forEach((browser) => browser.destroy());
    mp.players.local.setVisible(false, false);
    mp.players.local.setCollision(false, false);


    Object.keys(this.browsers).forEach((browser) => this.browsers[browser] = new Navegador());

    this.keysBindings();
    this.initServerEvents();
  }

  public login() {
    this.browsers.central.navegar('login');
    this.browsers.central.mostrar();
  }

  public registro() {
    this.browsers.central.navegar('registro');
    this.browsers.central.mostrar();
  }

  private initServerEvents() {
    this.serverEvents = new ServerEvents(this);
  }

  private keysBindings() {
    mp.keys.bind(0x5A, true, () => {
      this.browsers.playersOnline.navegar('players-online');

      let jogadores: JogadorOnline[] = [];

      mp.players.forEach((player) => jogadores.push({
        name: player.name,
        ping: player.ping,
        id: player.id,
        data: {
          nivel: 0,
        }
      }));

      this.browsers.playersOnline.execute(`window.my.playersOnline.listaJogadores('${JSON.stringify(jogadores)}')`);

      this.browsers.playersOnline.mostrar();
    });
  }
}

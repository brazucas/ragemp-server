export class Navegador {
  private browser: BrowserMp;
  public navegadorAberto: boolean;

  constructor() {
    this.browser = mp.browsers.new('package://browser/index.html');

    setTimeout(() => {
      this.browser.execute(`window.my.ragemp.setPlayerName('${mp.players.local.name}')`);
    }, 2000);

    mp.keys.bind(0x75, true, () => {
      this.navegadorAberto ? this.esconder() : this.mostrar();
    });
  }

  navegar(pagina: string) {
    this.browser.execute(`window.my.app.mudarPagina('${pagina}')`);
  }

  mostrar() {
    this.navegadorAberto = true;
    this.browser.execute(`window.my.app.toggleNavegador(true)`);
    mp.gui.cursor.visible = true;
  }

  esconder() {
    this.navegadorAberto = false;
    this.browser.execute(`window.my.app.toggleNavegador(false)`);
    mp.gui.cursor.visible = false;
  }

  execute(codigo: string) {
    this.browser.execute(codigo);
  }
}

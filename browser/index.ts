import { AutenticacaoResultado, DadosLogin } from './src/interfaces/login.interface';

let browser: BrowserMp;
let cursorVisible = false;
let navegadorAberto = false;
let noClipCamera: CameraMp;
let autenticacaoResultado: AutenticacaoResultado;

noClipCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 45);
noClipCamera.setActive(true);
mp.game.cam.renderScriptCams(true, true, 60000, true, false);

mp.players.local.freezePosition(true);
mp.game.cam.doScreenFadeIn(5000);
mp.gui.cursor.visible = false;
mp.browsers.forEach((browser) => browser.destroy());
mp.players.local.setVisible(false, false);
mp.players.local.setCollision(false, false);

iniciarNavegador();

function iniciarNavegador() {
  browser = mp.browsers.new('package://browser/index.html');
  mudarPaginaNavegador('login');
  browser.execute(`window.my.ragemp.setPlayerName('${mp.players.local.name}')`);

  abrirNavegador();
}

function abrirNavegador() {
  this.navegadorAberto = true;
  browser.execute(`window.my.app.toggleNavegador(true)`);
  mp.gui.cursor.visible = true;
}

function fecharNavegador() {
  this.navegadorAberto = false;
  browser.execute(`window.my.app.toggleNavegador(false)`);
  mp.gui.cursor.visible = false;
}

mp.events.add('IniciarNavegador', () => {
  if (browser) {
    browser.destroy();
    browser = null;
  } else {
    iniciarNavegador();
  }
});

mp.events.add('cursor', () => {
  mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});

mp.events.add('FecharBrowser', () => {
  if (autenticacaoResultado.autenticado) {
    fecharNavegador();
  }
});

mp.events.add('AutenticarJogador', (dados: DadosLogin) => {
  mp.events.callRemote('AutenticarJogador', mp.players.local, dados);
});

mp.events.add('AutenticacaoResultado', (resultado: AutenticacaoResultado) => {
  if (resultado.autenticado) {
    autenticacaoResultado = resultado;
    mp.players.local.setVisible(true, true);
    mp.players.local.setCollision(true, true);
    mp.players.local.freezePosition(false);
    mp.gui.cursor.visible = true;
  }

  browser.execute(`window.my.login.autenticacaoResultado(${resultado.autenticado}, ${resultado.credenciaisInvalidas})`);
});

function mudarPaginaNavegador(pagina: string) {
  browser.execute(`window.my.app.mudarPagina('${pagina}')`);
}

mp.keys.bind(0x75, true, function () {
  navegadorAberto ? fecharNavegador() : abrirNavegador();
});

mp.keys.bind(0x5A, true, function () {
  mudarPaginaNavegador('players-online');
  abrirNavegador();
});

mp.keys.bind(0x5A, false, function () {
  fecharNavegador();
});

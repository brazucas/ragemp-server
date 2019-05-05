import { JogadorOnline } from './src/app/players-online/players-online.page';
import { Jogador } from './src/interfaces/jogador.interface';
import { AutenticacaoResultado, DadosLogin, DadosRegistro, RegistroResultado } from './src/interfaces/login.interface';

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

  setTimeout(() => {
    browser.execute(`window.my.ragemp.setPlayerName('${mp.players.local.name}')`);
  }, 2000);
}

function dadosJogador(dados: Jogador) {
  if (dados) {
    mudarPaginaNavegador('login');
  } else {
    mudarPaginaNavegador('registro');
  }

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

mp.events.add('DadosJogador', dadosJogador);

mp.events.add('cursor', () => {
  mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});

mp.events.add('FecharBrowser', () => {
  if (autenticacaoResultado.autenticado) {
    fecharNavegador();
  }
});

mp.events.add('AutenticarJogador', (dados: DadosLogin) => {
  mp.events.callRemote('AutenticarJogador', dados);
});

function AutenticacaoResultado(resultado: AutenticacaoResultado) {
  if (resultado.autenticado) {
    autenticacaoResultado = resultado;
    mp.players.local.setVisible(true, true);
    mp.players.local.setCollision(true, true);
    mp.players.local.freezePosition(false);
    noClipCamera.setActive(false);
    noClipCamera.destroy();
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.gui.cursor.visible = false;
  }

  browser.execute(`window.my.login.autenticacaoResultado(${resultado.autenticado}, ${resultado.credenciaisInvalidas})`);
}

mp.events.add('AutenticacaoResultado', AutenticacaoResultado);

mp.events.add('RegistrarJogador', (dados: DadosRegistro) => {
  mp.events.callRemote('RegistrarJogador', dados);
});

mp.events.add('RegistroResultado', (resultado: RegistroResultado) => {
  browser.execute(`window.my.login.registroResultado('${JSON.stringify(resultado)}')`);

  if (resultado.registrado) {
    AutenticacaoResultado({
      autenticado: true,
    });
  }
});

function mudarPaginaNavegador(pagina: string) {
  browser.execute(`window.my.app.mudarPagina('${pagina}')`);
}

mp.keys.bind(0x75, true, function() {
  navegadorAberto ? fecharNavegador() : abrirNavegador();
});

mp.keys.bind(0x5A, true, function() {
  mudarPaginaNavegador('players-online');

  let jogadores: JogadorOnline[] = [];

  mp.players.forEach((player) => jogadores.push({
    name: player.name,
    ping: player.ping,
    id: player.id,
    data: {
      nivel: 0,
    }
  }));

  browser.execute(`window.my.playersOnline.listaJogadores('${JSON.stringify(jogadores)}')`);

  abrirNavegador();
});

mp.keys.bind(0x5A, false, function() {
  fecharNavegador();
});

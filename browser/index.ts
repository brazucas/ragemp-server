import { AutenticacaoResultado, DadosLogin } from './src/interfaces/login.interface';

let browser: BrowserMp;
let cursorVisible = false;

mp.events.add(RageEnums.EventKey.PLAYER_JOIN, () => {
  mp.gui.cursor.visible = false;
  mp.browsers.forEach((browser) => browser.destroy());
});

mp.events.add('mostrarNavegador', () => {
  if (browser) {
    browser.destroy();
    browser = null;
  } else {
    browser = mp.browsers.new('package://browser/index.html#/login');
    browser.execute(`window.my.ragemp.setPlayerName('${mp.players.local.name}')`);

    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
  }
});

mp.events.add('cursor', () => {
  mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});

mp.events.add('FecharBrowser', () => {
  browser.destroy();
  browser = null;
});

mp.events.add('AutenticarJogador', (dados: DadosLogin) => {
  mp.events.callRemote('AutenticarJogador', dados);
});

mp.events.add('AutenticacaoResultado', (resultado: AutenticacaoResultado) => {
  browser.execute(`window.my.login.autenticacaoResultado(${resultado.autenticado}, ${resultado.credenciaisInvalidas})`);
});

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

    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
  }
});

mp.events.add('cursor', () => {
  mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});

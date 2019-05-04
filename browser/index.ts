window["browser"] = null;
let cursorVisible = false;

mp.events.add(RageEnums.EventKey.PLAYER_JOIN, () => {
  mp.gui.cursor.visible = false;
  mp.browsers.forEach((browser) => browser.destroy());
});

mp.events.add('mostrarNavegador', () => {
  if (window["browser"]) {
    window["browser"].destroy();
    window["browser"] = null;
  } else {
    window["browser"] = mp.browsers.new('package://browser/index.html#/login');

    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
  }
});

mp.events.add('cursor', () => {
  mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});

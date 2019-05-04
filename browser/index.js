var browser;
mp.events.add("playerJoin" /* PLAYER_JOIN */, function () {
    mp.gui.cursor.visible = false;
    mp.browsers.forEach(function (browser) { return browser.destroy(); });
});
mp.events.add('mostrarNavegador', function () {
    browser = mp.browsers["new"]('package://browser/index.html#/login');
    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
});
mp.events.add('cursor', function () {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});
mp.events.add('cursor2', function () {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

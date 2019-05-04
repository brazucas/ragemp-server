export var browser;
var cursorVisible = false;
mp.events.add("playerJoin" /* PLAYER_JOIN */, function () {
    mp.gui.cursor.visible = false;
    mp.browsers.forEach(function (browser) { return browser.destroy(); });
});
mp.events.add('mostrarNavegador', function () {
    if (browser) {
        browser.destroy();
        browser = null;
    }
    else {
        browser = mp.browsers.new('package://browser/index.html#/login');
        mp.gui.cursor.visible = true;
        mp.gui.chat.push('Mostrando navegador');
    }
});
mp.events.add('cursor', function () {
    mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});
//# sourceMappingURL=index.js.map
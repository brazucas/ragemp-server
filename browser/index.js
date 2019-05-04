"use strict";
exports.__esModule = true;
var cursorVisible = false;
mp.events.add("playerJoin" /* PLAYER_JOIN */, function () {
    mp.gui.cursor.visible = false;
    mp.browsers.forEach(function (browser) { return browser.destroy(); });
});
mp.events.add('mostrarNavegador', function () {
    if (exports.browser) {
        exports.browser.destroy();
        exports.browser = null;
    }
    else {
        exports.browser = mp.browsers["new"]('package://browser/index.html#/login');
        mp.gui.cursor.visible = true;
        mp.gui.chat.push('Mostrando navegador');
    }
});
mp.events.add('cursor', function () {
    mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});

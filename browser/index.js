"use strict";
exports.__esModule = true;
var browser;
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
        browser = mp.browsers["new"]('package://browser/index.html#/login');
        browser.execute("window.my.ragemp.setPlayerName('" + mp.players.local.name + "')");
        mp.gui.cursor.visible = true;
        mp.gui.chat.push('Mostrando navegador');
    }
});
mp.events.add('cursor', function () {
    mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});
mp.events.add('FecharBrowser', function () {
    browser.destroy();
    browser = null;
});
mp.events.add('AutenticarJogador', function (dados) {
    mp.events.callRemote('AutenticarJogador', dados);
});
mp.events.add('AutenticacaoResultado', function (resultado) {
    browser.execute("window.my.login.autenticacaoResultado(" + resultado.autenticado + ", " + resultado.credenciaisInvalidas + ")");
});

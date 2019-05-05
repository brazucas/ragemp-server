var browser;
var cursorVisible = false;
var noClipCamera;
noClipCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 45);
noClipCamera.setActive(true);
mp.game.cam.renderScriptCams(true, true, 60000, true, false);
mp.players.local.freezePosition(true);
mp.game.cam.doScreenFadeIn(5000);
mp.gui.cursor.visible = false;
mp.browsers.forEach(function (browser) { return browser.destroy(); });
mp.players.local.setVisible(false, false);
mp.players.local.setCollision(false, false);
iniciarNavegador();
function iniciarNavegador() {
    browser = mp.browsers.new('package://browser/index.html');
    browser.execute("window.my.app.mudarPagina('login')");
    browser.execute("window.my.ragemp.setPlayerName('" + mp.players.local.name + "')");
    abrirNavegador();
}
function abrirNavegador() {
    browser.execute("window.my.app.toggle(true)");
    mp.gui.cursor.visible = true;
}
function fecharNavegador() {
    browser.execute("window.my.app.toggle(false)");
    mp.gui.cursor.visible = false;
}
mp.events.add('IniciarNavegador', function () {
    if (browser) {
        browser.destroy();
        browser = null;
    }
    else {
        iniciarNavegador();
    }
});
mp.events.add('cursor', function () {
    mp.gui.cursor.visible = cursorVisible = !cursorVisible;
});
mp.events.add('FecharBrowser', function () {
    fecharNavegador();
});
mp.events.add('AutenticarJogador', function (dados) {
    mp.events.callRemote('AutenticarJogador', mp.players.local, dados);
});
mp.events.add('AutenticacaoResultado', function (resultado) {
    if (resultado.autenticado) {
        mp.players.local.setVisible(true, true);
        mp.players.local.setCollision(true, true);
        mp.players.local.freezePosition(false);
        mp.gui.cursor.visible = true;
    }
    browser.execute("window.my.login.autenticacaoResultado(" + resultado.autenticado + ", " + resultado.credenciaisInvalidas + ")");
});
//# sourceMappingURL=index.js.map
"use strict";
exports.__esModule = true;
var navegador_1 = require("./navegador");
var server_events_1 = require("./server-events");
var Client = /** @class */ (function () {
    function Client() {
        var _this = this;
        this.noClipCamera = mp.cameras["new"]('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 45);
        this.noClipCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 60000, true, false);
        mp.players.local.freezePosition(true);
        mp.game.cam.doScreenFadeIn(5000);
        mp.gui.cursor.visible = false;
        mp.browsers.forEach(function (browser) { return browser.destroy(); });
        mp.players.local.setVisible(false, false);
        mp.players.local.setCollision(false, false);
        Object.keys(this.browsers).forEach(function (browser) { return _this.browsers[browser] = new navegador_1.Navegador(); });
        this.keysBindings();
        this.initServerEvents();
    }
    Client.prototype.login = function () {
        this.browsers.central.navegar('login');
        this.browsers.central.mostrar();
    };
    Client.prototype.registro = function () {
        this.browsers.central.navegar('registro');
        this.browsers.central.mostrar();
    };
    Client.prototype.initServerEvents = function () {
        this.serverEvents = new server_events_1.ServerEvents(this);
    };
    Client.prototype.keysBindings = function () {
        var _this = this;
        mp.keys.bind(0x5A, true, function () {
            _this.browsers.playersOnline.navegar('players-online');
            var jogadores = [];
            mp.players.forEach(function (player) { return jogadores.push({
                name: player.name,
                ping: player.ping,
                id: player.id,
                data: {
                    nivel: 0
                }
            }); });
            _this.browsers.playersOnline.execute("window.my.playersOnline.listaJogadores('" + JSON.stringify(jogadores) + "')");
            _this.browsers.playersOnline.mostrar();
        });
    };
    return Client;
}());
exports.Client = Client;

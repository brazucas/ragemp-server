"use strict";
exports.__esModule = true;
var brazucas_eventos_1 = require("../../packages/rpg/interfaces/brazucas-eventos");
var ServerEvents = /** @class */ (function () {
    function ServerEvents(client) {
        var _this = this;
        this.client = client;
        mp.events.add(brazucas_eventos_1.BrazucasEventos.SERVER, function (serverEvent) {
            console.log("[SERVER EVENT] Evento " + serverEvent.event + " recebido \n      redirecionando para o browser com os seguintes dados: " + JSON.stringify(serverEvent.data));
            if (typeof _this[serverEvent.event] === 'function') {
                _this[serverEvent.event](serverEvent.data);
            }
            _this.forwardEventToBrowser(serverEvent);
        });
    }
    ServerEvents.prototype.browserEvent = function (event, data) {
        this.client.browsers.central.execute("window.my.ragemp.serverEvent('" + event + "', " + JSON.stringify(data) + ")");
    };
    ServerEvents.prototype.forwardEventToBrowser = function (serverEvent) {
        this.browserEvent(serverEvent.event, serverEvent.data);
    };
    ServerEvents.prototype.AutenticacaoResultado = function (resultado) {
        if (resultado.autenticado) {
            this.client.autenticacaoResultado = resultado;
            mp.players.local.setVisible(true, true);
            mp.players.local.setCollision(true, true);
            mp.players.local.freezePosition(false);
            this.client.noClipCamera.setActive(false);
            this.client.noClipCamera.destroy();
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
            mp.gui.cursor.visible = false;
        }
    };
    ServerEvents.prototype.RegistroResultado = function (resultado) {
        if (resultado.registrado) {
            this.AutenticacaoResultado({
                autenticado: true
            });
        }
    };
    ServerEvents.prototype.cursor = function () {
        mp.gui.cursor.visible = this.client.cursorVisible = !this.client.cursorVisible;
    };
    ServerEvents.prototype[brazucas_eventos_1.BrazucasEventos.DADOS_JOGADOR] = function (jogador) {
        if (jogador) {
            this.client.login();
        }
        else {
            this.client.registro();
        }
    };
    return ServerEvents;
}());
exports.ServerEvents = ServerEvents;

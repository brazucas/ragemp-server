"use strict";
exports.__esModule = true;
var Navegador = /** @class */ (function () {
    function Navegador() {
        var _this = this;
        this.browser = mp.browsers["new"]('package://browser/index.html');
        setTimeout(function () {
            _this.browser.execute("window.my.ragemp.setPlayerName('" + mp.players.local.name + "')");
        }, 2000);
        mp.keys.bind(0x75, true, function () {
            _this.navegadorAberto ? _this.esconder() : _this.mostrar();
        });
    }
    Navegador.prototype.navegar = function (pagina) {
        this.browser.execute("window.my.app.mudarPagina('" + pagina + "')");
    };
    Navegador.prototype.mostrar = function () {
        this.navegadorAberto = true;
        this.browser.execute("window.my.app.toggleNavegador(true)");
        mp.gui.cursor.visible = true;
    };
    Navegador.prototype.esconder = function () {
        this.navegadorAberto = false;
        this.browser.execute("window.my.app.toggleNavegador(false)");
        mp.gui.cursor.visible = false;
    };
    Navegador.prototype.execute = function (codigo) {
        this.browser.execute(codigo);
    };
    return Navegador;
}());
exports.Navegador = Navegador;

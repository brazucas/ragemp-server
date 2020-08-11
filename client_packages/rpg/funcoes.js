"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcoes = void 0;
var FuncoesAdmin = /** @class */ (function () {
    function FuncoesAdmin() {
        this.positionWP = new mp.Vector3(0, 0, 0);
        this.positionWP = new mp.Vector3(0, 0, 0);
    }
    FuncoesAdmin.prototype.teleporteWP = function () {
        var getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(this.positionWP.x, this.positionWP.y, this.positionWP.z, parseFloat('0'), false);
        mp.players.local.position = new mp.Vector3(this.positionWP.x, this.positionWP.y, getGroundZ);
        //mp.gui.chat.push(`${getGroundZ}, ${this.positionWP.z}`);
    };
    return FuncoesAdmin;
}());
var FuncoesT = new FuncoesAdmin();
mp.events.add("playerCreateWaypoint", function (position) {
    position.z = position.z + 1000;
    FuncoesT.positionWP = position;
});
mp.events.add("playerCommand", function (command) {
    var args = command.split(/[ ]+/);
    var commandName = args[0];
    args.shift();
    if (commandName === "telewp") {
        FuncoesT.teleporteWP();
    }
});
exports.Funcoes = new FuncoesAdmin();

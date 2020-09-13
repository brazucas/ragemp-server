"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComandosAdmin = void 0;
class ComandosAdmin {
    constructor(brazucasServer) {
        this.brazucasServer = brazucasServer;
    }
    static tlt(player, playerOrigemHash, playerDestinoHash) {
        if (!playerOrigemHash || !playerDestinoHash) {
            return player.outputChatBox('!{FF0000}[SINTAXE] /tlt [id/nick] [id/nick]');
        }
        let playerOrigem;
        let playerDestino;
        if (!isNaN(parseInt(playerOrigemHash))) {
            playerOrigem = mp.players.at(playerOrigemHash);
        }
        else {
            mp.players.forEach((player) => {
                if (player.name.toLowerCase() === playerOrigemHash.toLowerCase()) {
                    playerOrigem = player;
                }
            });
        }
        if (!isNaN(parseInt(playerDestinoHash))) {
            playerDestino = mp.players.at(playerDestinoHash);
        }
        else {
            mp.players.forEach((player) => {
                if (player.name.toLowerCase() === playerDestinoHash.toLowerCase()) {
                    playerDestino = player;
                }
            });
        }
        if (!playerOrigem) {
            return player.outputChatBox((!isNaN(parseInt(playerOrigemHash)))
                ? `Jogador com ID ${playerOrigemHash} não encontrado.` : `Jogador com nick ${playerOrigemHash} não encontrado.`);
        }
        if (!playerDestino) {
            return player.outputChatBox((!isNaN(parseInt(playerDestinoHash)))
                ? `Jogador com ID ${playerDestinoHash} não encontrado.` : `Jogador com nick ${playerDestinoHash} não encontrado.`);
        }
        if (playerOrigem === playerDestino) {
            return player.outputChatBox('!{FF0000} Você não pode teleportar um jogador para ele mesmo!');
        }
        console.debug(`[COMANDOS - tlt] teleportando jogador ${playerOrigem.name} para ${playerDestino.name}`);
        playerOrigem.outputChatBox(`!{00FF00} Você foi teleportado para o jogador ${playerDestino.name}`);
        playerDestino.outputChatBox(`!{00FF00} O jogador ${playerOrigem.name} foi teleportado até você`);
        mp.players.broadcast(`!{0000FF}[ADMIN] ${player.name} teleporta ${playerOrigem.name} para ${playerDestino.name}`);
        playerOrigem.position = playerDestino.position;
    }
    irparaveiculo(player, vehId) {
        let veh = mp.vehicles[vehId];
        if (veh && veh.position) {
            player.position = veh.position;
        }
        else {
            console.log('Veículo com ID ' + vehId + ' não encontrado.');
        }
    }
}
exports.ComandosAdmin = ComandosAdmin;
//# sourceMappingURL=comandos-admin.js.map
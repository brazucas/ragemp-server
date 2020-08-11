"use strict";
class PlayerStatus {
    constructor() {
        this.trabalhando = false;
    }
}
mp.events.add('playerJoin', (player) => {
    player.status = new PlayerStatus();
});

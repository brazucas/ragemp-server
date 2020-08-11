class PlayerStatus {
    trabalhando: Boolean;
    constructor() {
        this.trabalhando = false;
    }
}

mp.events.add('playerJoin', (player) => {
    player.status = new PlayerStatus();
});
class FuncoesAdmin {
    positionWP: Vector3Mp = new mp.Vector3(0, 0, 0);

    constructor() {
        this.positionWP = new mp.Vector3(this.positionWP.x, this.positionWP.y, this.positionWP.z);
    }
    
    teleporteWP(): any {
        const getGroundZ: number = mp.game.gameplay.getGroundZFor3dCoord(this.positionWP.x, this.positionWP.y, this.positionWP.z, parseFloat('0'), false);
        mp.players.local.position = new mp.Vector3(this.positionWP.x, this.positionWP.y, getGroundZ);
        //mp.gui.chat.push(`${getGroundZ}, ${this.positionWP.z}`);
    }
}

const FuncoesT = new FuncoesAdmin();

mp.events.add("playerCreateWaypoint", (position) => {
    position.z = position.z + 1000;
    FuncoesT.positionWP = position;
});

mp.events.add("playerCommand", (command) => {
	const args = command.split(/[ ]+/);
	const commandName = args[0];
    args.shift();
		
	if (commandName === "telewp") {
        FuncoesT.teleporteWP();
    }
});

export const Funcoes = FuncoesT;
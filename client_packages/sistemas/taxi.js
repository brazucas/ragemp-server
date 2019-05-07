let vehicle ,vehSeat, vehMaxSpeed = null;
let chat = false;
let MissaoTaxi = 0;
let cpEstacao = null;
let cpEntrega = null;
let ehUmTaxi = false;

mp.keys.bind(0x54, true, (player) => { // If Chat was triggered
    if (!chat) {
        chat = true;
    }
});

mp.keys.bind(0x0D, true, (player) => { // If Chat was stopped.
    if (chat) {
        chat = false;
    }
});

mp.events.add('VehicleEnter', (seat) => {
    if (seat == -1) {
        vehSeat = seat;
        vehicle = mp.players.local.vehicle;
        let modelo = 'taxi';
        let modeloHash = mp.game.joaat(modelo);
        if (vehicle.model === modeloHash) {
            mp.game.graphics.notify(`Aperte 2 para iniciar as missoes de taxi.`);
            ehUmTaxi = true;
        }
    }
});

mp.events.add('VehicleExit', (seat) => { // Reseting Data when driver exits the vehicle.
    vehicle = null;
    vehSeat = -3;
    ehUmTaxi = false;
});

mp.events.add('playerEnterCheckpoint', (player, checkpoint) => {
    if (MissaoTaxi == 1 && ehUmTaxi) {
        if (cpEstacao) cpEstacao.destroy();
        cpEstacao = null;
        cpEntrega = mp.checkpoints.new(1, new mp.Vector3(237.73, -369.84, 43.5), 3.5,
	        	{
    	    direction: new mp.Vector3(237.73, -369.84, 43.5),
    	    color: [255,0,0,255],
    	    visible: true,
    	    dimension: 0
    	});
    	mp.game.ui.setNewWaypoint(237.73, -369.84);
    	MissaoTaxi = 2;
    	mp.gui.chat.push('Eu sei que odeia este trabalho... FODA-SE!! E entregue isto! O Cliente está esperando!');
    } else if (MissaoTaxi == 2 && cpEntrega && ehUmTaxi) {
        if (cpEntrega) cpEntrega.destroy();
        cpEntrega = null;
        cpEstacao = mp.checkpoints.new(1, new mp.Vector3(-110.49005, -1991.33044, 17.62281), 3.5,
	    {
	        direction: new mp.Vector3(-110.49005, -1991.33044, 17.62281),
	        color: [255,0,0,255],
	        visible: true,
	        dimension: 0
	    });
	    mp.game.ui.setNewWaypoint(-110.49005, -1991.33044);
	    mp.gui.chat.push('Entregue! Tá aí sua gorjeta, agora volte para pegar mais produtos...');
	    MissaoTaxi = 1;
    }
});

mp.keys.bind(0x32, true, _ => { // binding 2 to the cruise speed
	let modelo = 'taxi';
	let modeloHash = mp.game.joaat(modelo);
    if (vehSeat == -1 && vehicle && !chat && vehicle.model == modeloHash) { // if he/she was driver and chat isn't active.
        if (MissaoTaxi == 0) { // if cruise was disabled
        	MissaoTaxi = 1;
        	cpEstacao = mp.checkpoints.new(1, new mp.Vector3(-110.49005, -1991.33044, 17.62281), 3.5,
        	{
        	    direction: new mp.Vector3(-110.49005, -1991.33044, 17.62281),
        	    color: [255,0,0,255],
        	    visible: true,
        	    dimension: 0
        	});
        	mp.game.ui.setNewWaypoint(-110.49005, -1991.33044);
        	mp.gui.chat.push('Dirija até o local indicado no mapa para iniciar as entregas!');
        } else {
        	MissaoTaxi = 0;
        	mp.gui.chat.push('Serviço de entregas cancelado!');
        	if (cpEstacao) {
        		cpEstacao.destroy();
        		cpEstacao = null;
        	} else if (cpEntrega) {
        		cpEntrega.destroy();
        		cpEntrega = null;
        	}
        }
    } else {
        return false;
    }
});

mp.events.add('render', () => {

    if (vehicle)
	    mp.game.graphics.drawText(`${(vehicle.getSpeed() * 3.6).toFixed(0)} km/h`, 7, [255, 255, 255, 185], 0.9, 0.9, true, 0.5, 0.005); // It was made to debug the script.
});






let vehicle ,vehSeat, vehMaxSpeed = null;
let state = 0;
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
mp.events.add('VehicleEnter', (seat) => { // Getting Vehicle Data on Player entering vehicle
    if (seat == -1) { // if he/she was driver
        vehSeat = seat;
        vehicle = mp.players.local.vehicle;
        vehMaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.model);
        mp.game.graphics.notify(`Press ~r~C if you want to start Cruise control.`);
        let modelo = 'taxi';
        let modeloHash = mp.game.joaat(modelo);
        if (vehicle.model === modeloHash) {
            mp.game.graphics.notify(`Aperte ~y~2 para iniciar as missoes de taxi.`);
            ehUmTaxi = true;
        }
    }
});

mp.events.add('VehicleExit', (seat) => { // Reseting Data when driver exits the vehicle.
    if (seat == -1) {
        state = 0;
    }

    vehicle = null;
    vehSeat = -3;
    ehUmTaxi = false;
});

mp.events.add('playerExitCheckpoint', (player, checkpoint) => {
    if (MissaoTaxi == 1 && ehUmTaxi) {
        if (cpEstacao) cpEstacao.destroy();
        cpEstacao = null;
        cpEntrega = mp.checkpoints.new(1, new mp.Vector3(237.73, -369.84, 43.5), 10,
	        	{
    	    direction: new mp.Vector3(237.73, -369.84, 43.5),
    	    color: [255,0,0,255],
    	    visible: true,
    	    dimension: 0
    	});
    	mp.game.ui.setNewWaypoint(237.73, -369.84);
    	MissaoTaxi = 2;
    	mp.gui.chat.push('Eu sei que odeia este trabalho... FODA-SE!! E entregue isto! O Cliente está esperando!');
        mp.events.callRemote('DarDinheiro', player, 100);
    } else if (MissaoTaxi == 2 && cpEntrega && ehUmTaxi) {
        if (cpEntrega) cpEntrega.destroy();
        cpEntrega = null;
        cpEstacao = mp.checkpoints.new(1, new mp.Vector3(-110.49005, -1991.33044, 17.62281), 10,
	    {
	        direction: new mp.Vector3(-110.49005, -1991.33044, 17.62281),
	        color: [255,0,0,255],
	        visible: true,
	        dimension: 0
	    });
	    mp.game.ui.setNewWaypoint(-110.49005, -1991.33044);
	    mp.gui.chat.push('Entregue! Tá aí sua gorjeta, agora volte para pegar mais produtos...');
        mp.events.callRemote('DarDinheiro', player, 100);
	    MissaoTaxi = 1;
    }
});

mp.keys.bind(0x43, true, _ => { // binding C to the cruise speed
    if (vehSeat == -1 && vehicle && !chat) { // if he/she was driver and chat isn't active.
        if (state == 0 || state == 2) { // if cruise was disabled
            state = 1;
            toggle(); // start the cruise
        } else
        if (state == 1) { // if cruise was enabled
            state = 2;
            toggle(); // stop the cruise
        }
    } else {
        return false;
    }
});

mp.keys.bind(0x32, true, _ => { // binding 2 to the cruise speed
    if (vehSeat == -1 && vehicle && !chat) { // if he/she was driver and chat isn't active.
        if (MissaoTaxi == 0) { // if cruise was disabled
        	MissaoTaxi = 1;
        	cpEstacao = mp.checkpoints.new(1, new mp.Vector3(-110.49005, -1991.33044, 17.62281), 10,
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

    if (state == 1 && vehicle) { // if cruise was triggered
        let currentvelo = vehicle.getVelocity();

        currentvelo.x = currentvelo.x * 1.1;
        currentvelo.y = currentvelo.y * 1.1;

        vehicle.setVelocity(currentvelo.x, currentvelo.y, currentvelo.z); // set velocity to the current one.

        if (vehicle.hasCollidedWithAnything() || vehicle.isInAir()) // check if vehicle did collision or went off the ground
        {
            state = 2; // stop cruise
            toggle();
        }

        if (buttonchecker()) { // if space, enter, F, S buttons were triggered
            state = 2; // stop cruise
            toggle();
        }
    }
});

function toggle () { // Toggler of the Cruise speed.
    if (state == 1 && vehicle) {
	    let speed = vehicle.getSpeed();
	    vehicle.setMaxSpeed(speed);
	    mp.game.graphics.notify(`Your cruise speed was set to ~b~${(speed * 3.6).toFixed(0)}~b~ km/h`);
    }


    if (state == 2 && vehicle) {
	    vehicle.setMaxSpeed(vehMaxSpeed);
	    mp.game.graphics.notify(`Cruise speed is now ~r~disabled! Drive safely!`);
	    state = 0;
    }
}

function buttonchecker () { // if user presses space, s , enter, or F returns true
    if (mp.keys.isDown(32) === true) return true;
    if (mp.keys.isDown(83) === true) return true;
    if (mp.keys.isDown(70) === true) return true;
    if (mp.keys.isDown(13) === true) return true;

    return false;
}






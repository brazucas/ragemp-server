declare const mp: Mp;

export function Commands() {
  mp.events.addCommand("irparaveiculo", (player: PlayerMp, fullText: string, ...args: string[]): void => {
    let veh: VehicleMp = mp.vehicles[args[0]];

    if (veh && veh.position) {
      player.position = veh.position;
    } else {
      console.log('Veículo com ID ' + args[0] + ' não encontrado.');
    }
  });
};
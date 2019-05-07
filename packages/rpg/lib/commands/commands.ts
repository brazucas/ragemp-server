///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />

import { BrazucasServer } from '../../../../common/brazucas-server';
import { BrazucasEventos } from '../../interfaces/brazucas-eventos';
import { playerEvent } from '../functions/player';
import { ComandosAdmin } from './comandos-admin';

export class Commands extends ComandosAdmin {

  constructor(brazucasServer: BrazucasServer) {
    super(brazucasServer);
  }

  public dararma(player: PlayerMp, weaponHash: string) {
    console.debug(`[COMANDOS - dararma] Dando arma ${weaponHash} para o jogador ${player.name}`);

    const asset = mp.joaat(weaponHash);

    player.giveWeapon(asset, 1000);

    player.notify(`Arma ${weaponHash} recebida!`);
  }

  public posicaoatual(player: PlayerMp) {
    console.debug(`[COMANDOS - posicaoatual] Posição atual de ${player.name}: ${player.position.toString()}`);

    player.outputChatBox(`Posição atual: ${player.position.toString()}`);
  }

  public browser(player: PlayerMp) {
    playerEvent<any>(player, BrazucasEventos.INICIAR_NAVEGADOR);
  }

  public cursor(player: PlayerMp) {
    playerEvent<any>(player, BrazucasEventos.CURSOR);
  }
}

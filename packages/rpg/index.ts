'use strict';

import { AutenticacaoResultado } from '../../browser/src/interfaces/login.interface';
import { BrazucasServer } from '../../common/brazucas-server';
import { PlayerChatHandler } from './handler/playerChat';
import { PlayerDeathHandler } from './handler/playerDeath';
import { PlayerEnterVehicle } from './handler/playerEnterVehicle';
import { PlayerExitVehicle } from './handler/playerExitVehicle';
import { PlayerJoinHandler } from './handler/playerJoin';
import { PlayerQuitHandler } from './handler/playerQuit';
import { BrazucasEventos, ServerEvent } from './interfaces/brazucas-eventos';
import { Commands } from './lib/commands/commands';
import { Events } from './lib/events/events';
import { playerEvent } from './lib/functions/player';
import { Rpg } from './rpg';
import EventKey = RageEnums.EventKey;

mp.events.add(EventKey.PLAYER_COMMAND, (player: PlayerMp, command: string) => {
  console.debug(`[COMANDO] ${player.name} enviou o comando ${command}`);

  const comandos = new Commands(brazucasServer);

  const arr = command.split(' ');

  if (comandos[arr[0]]) {
    const comando = arr[0];

    arr.shift();

    comandos[comando](player, ...arr);
  } else {
    player.outputChatBox('!{#FF0000}Comando desconhecido');
  }
});

let brazucasServer = new BrazucasServer();

mp.events.add(EventKey.PLAYER_JOIN, PlayerJoinHandler.bind(PlayerJoinHandler, brazucasServer));
mp.events.add(EventKey.PLAYER_QUIT, PlayerQuitHandler.bind(PlayerQuitHandler, brazucasServer));
mp.events.add(EventKey.PLAYER_CHAT, PlayerChatHandler.bind(PlayerChatHandler, brazucasServer));
mp.events.add(EventKey.PLAYER_DEATH, PlayerDeathHandler.bind(PlayerDeathHandler, brazucasServer));
mp.events.add(EventKey.PLAYER_EXIT_VEHICLE, PlayerExitVehicle.bind(PlayerExitVehicle, brazucasServer));
mp.events.add(EventKey.PLAYER_ENTER_VEHICLE, PlayerEnterVehicle.bind(PlayerEnterVehicle, brazucasServer));

mp.events.add(BrazucasEventos.BROWSER, async (player: PlayerMp, serverEventStr: string) => {
  const serverEvent: ServerEvent<any> = JSON.parse(serverEventStr);

  console.debug(`[EVENTOS] Jogador ${player.name} ativou o evento ${serverEvent.event} (ID ${serverEvent.eventId})`
  + ` com os seguintes parâmetros: ${serverEvent.data}`);

  const data: any = JSON.parse(serverEvent.data);

  const events = new Events(brazucasServer);

  if (events[serverEvent.event]) {
    const resposta = await events[serverEvent.event](player, data);

    playerEvent<AutenticacaoResultado>(player, BrazucasEventos.SERVER, resposta, serverEvent.eventId);
  } else {
    console.error(`[ERROR] O evento ${event} é inexistente`);
  }
});

brazucasServer.onload()
  .subscribe(() => new Rpg(brazucasServer), console.error);

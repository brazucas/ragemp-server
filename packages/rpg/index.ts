'use strict';

import { BrazucasServer } from '../../common/brazucas-server';
import { PlayerChatHandler } from './handler/playerChat';
import { PlayerDeathHandler } from './handler/playerDeath';
import { PlayerJoinHandler } from './handler/playerJoin';
import { PlayerQuitHandler } from './handler/playerQuit';
import { BrazucasEventos } from './interfaces/brazucas-eventos';
import { Commands } from './lib/commands/commands';
import { Events } from './lib/events/events';
import { Rpg } from './rpg';
import EventKey = RageEnums.EventKey;

mp.events.add('playerCommand', (player: PlayerMp, command: string) => {
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

mp.events.add(BrazucasEventos.BROWSER, (player: PlayerMp, event: string, stringifiedData: string) => {
  console.debug(`[EVENTOS] Jogador ${player.name} ativou o evento ${event} com os seguintes parâmetros: ${stringifiedData}`);

  const data: any = JSON.parse(stringifiedData);

  const events = new Events(brazucasServer);

  if (events[event]) {
    events[event](player, data);
  } else {
    console.error(`[ERROR] O evento ${event} é inexistente`);
  }
});

brazucasServer.onload()
  .subscribe(() => new Rpg(brazucasServer), console.error);

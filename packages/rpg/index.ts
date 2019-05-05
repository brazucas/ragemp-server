'use strict';

import EventKey = RageEnums.EventKey;
import { BrazucasServer } from '../../common/brazucas-server';
import { PlayerChatHandler } from './handler/playerChat';
import { PlayerDeathHandler } from './handler/playerDeath';
import { PlayerJoinHandler } from './handler/playerJoin';
import { PlayerQuitHandler } from './handler/playerQuit';
import { Comandos } from './lib/commands/commands';
import { carregarEventos } from './lib/events/events';
import { Rpg } from './rpg';

mp.events.add(EventKey.PLAYER_JOIN, PlayerJoinHandler);
mp.events.add(EventKey.PLAYER_QUIT, PlayerQuitHandler);
mp.events.add(EventKey.PLAYER_CHAT, PlayerChatHandler);
mp.events.add(EventKey.PLAYER_DEATH, PlayerDeathHandler);

mp.events.add('playerCommand', (player: PlayerMp, command: string) => {
  console.debug(`[COMANDO] ${player.name} enviou o comando ${command}`);

  const arr = command.split(' ');

  if (Comandos[arr[0]]) {
    const comando = arr[0];

    arr.shift();

    Comandos[comando](player, ...arr);
  } else {
    player.outputChatBox('!{#FF0000}Comando desconhecido');
  }
});

let brazucasServer = new BrazucasServer();

brazucasServer.onload()
  .subscribe(() => {
    new Rpg(brazucasServer);
    carregarEventos(brazucasServer);
  }, console.error);

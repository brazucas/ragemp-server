'use strict';

import EventKey = RageEnums.EventKey;
import { BrazucasServer } from '../../common/brazucas-server';
import { PlayerDeathHandler } from './handler/playerChat';
import { PlayerChatHandler } from './handler/playerDeath';
import { PlayerJoinHandler } from './handler/playerJoin';
import { PlayerQuitHandler } from './handler/playerQuit';
import { Rpg } from './rpg';

declare const mp: Mp;

mp.events.add(EventKey.PLAYER_JOIN, PlayerJoinHandler);
mp.events.add(EventKey.PLAYER_QUIT, PlayerQuitHandler);
mp.events.add(EventKey.PLAYER_CHAT, PlayerChatHandler);
mp.events.add(EventKey.PLAYER_DEATH, PlayerDeathHandler);

let brazucasServer = new BrazucasServer();

brazucasServer.onload()
  .subscribe(() => new Rpg(brazucasServer), console.error );

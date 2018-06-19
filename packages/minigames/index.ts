'use strict';

import {Minigames} from "./minigames";
import {PlayerJoinHandler} from "./handler/playerJoin";
import {PlayerQuitHandler} from "./handler/playerQuit";
import {PlayerChatHandler} from "./handler/playerDeath";
import {PlayerDeathHandler} from "./handler/playerChat";

mp.events.add("playerJoin", PlayerJoinHandler);
mp.events.add("playerQuit", PlayerQuitHandler);
mp.events.add("playerChat", PlayerChatHandler);
mp.events.add("playerDeath", PlayerDeathHandler);

let minigames = new Minigames();
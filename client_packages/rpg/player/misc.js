"use strict";
mp.events.add("cliente:getGroundZFor3dCoord", (player) => {
    const getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat('0'), false);
    mp.events.callRemote("servidor:getGroundZFor3dCoord", [player, getGroundZ]);
});

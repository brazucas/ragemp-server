/*const localPlayer: PlayerMp = mp.players.local;
// 0x45 is the E key code
if(!localPlayer.getVariable('TeclaBloqueada')) {
    mp.keys.bind(0x45, true, function() {
        mp.events.callRemote('servidor:IniciarPizzaboy', localPlayer, true);
    });
}*/
mp.events.add(RageEnums.EventKey.PLAYER_ENTER_COLSHAPE, (shape) => {
    if(shape.tipo === 'EntregaPizzaSphere') {
        mp.events.callRemote("servidor:PizzaEntregue", localPlayer);
    }
});
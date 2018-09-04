let lixo = null;
let veh = null;
let dist = 10;

mp.events.add('SpawnarLixo', (player) => {
    let pos = mp.players.local.position; // Returns Vector3 object
    pos.y += 1;
    pos.z += 1;
    let boneid = mp.players.local.getBoneIndexByName('BONETAG_R_HAND');
    lixo = mp.objects.new(1138881502, pos, [0, 0, 0]); // Alternative, mp.joaat(...) resolves the model name into this object id
    lixo.attachTo(mp.players.local.handle, boneid, 0, 0, 0, 0.0, -90.0, 0.0, false, false, true, false, 2, true);
    lixo.setCollision(false, true);

    mp.gui.chat.push(`${boneid}`);

});

mp.events.add('DistanciaVeiculo', (pos, veiculo) => {
    let posicao =  mp.players.local.position;
    veh = veiculo;
    dist = mp.game.gameplay.getDistanceBetweenCoords(pos.x, pos.y, pos.z, posicao.x, posicao.y, posicao.z, true);
    mp.gui.chat.push(`${dist}`);
});


mp.keys.bind(0x14, true, _ => { // binding 2 to the cruise speed
    if(lixo) {
        mp.events.callRemote('CoordsVeiculo', mp.players.local);
        let modeloHash = mp.game.joaat('trash');
        if(dist <= 5.5 && veiculo.model === modeloHash) {
            lixo.destroy();
            lixo = null;
        } else {
            mp.gui.chat.push('Você não está próximo ao caminhão de lixo!');
        }
    }
});

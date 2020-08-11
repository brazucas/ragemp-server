"use strict";
//var blipCliente: BlipMp [] = [];
const localPlayer = mp.players.local;
mp.events.add('cliente:criarBlip', (_sprite, _position, _name, _color, _range, _tipo, _waypoint = false) => {
    //mp.console.logInfo(`${_sprite} ${_position} ${_name} ${_color} ${_range} ${_tipo} ${_waypoint}`, true, true);
    const novoBlip = mp.blips.new(_sprite, _position, {
        name: _name,
        color: _color,
        shortRange: _range
    });
    novoBlip.tipo = _tipo;
    if (_waypoint)
        mp.game.ui.setNewWaypoint(_position.x, _position.y);
    localPlayer.blips.push(novoBlip);
});
mp.events.add('cliente:destruirBlip', (_tipo) => {
    for (let entry of localPlayer.blips) {
        if (entry.doesExist()) {
            const index = localPlayer.blips.indexOf(entry);
            if (index > -1) {
                if (localPlayer.blips[index].tipo === _tipo) {
                    localPlayer.blips[index].destroy();
                    localPlayer.blips.splice(index);
                }
            }
        }
    }
});
mp.events.add('cliente:criarMarker', (_tipo, _type, _position, _scale = 0.75, _color = [255, 0, 0, 255], _dimension = 0, _rotation = 0, _visible = true) => {
    //mp.console.logInfo(`${_sprite} ${_position} ${_name} ${_color} ${_range} ${_tipo} ${_waypoint}`, true, true);
    const novoMarker = mp.markers.new(_type, _position, _scale, {
        color: _color
    });
    novoMarker.tipo = _tipo;
    localPlayer.markers.push(novoMarker);
});
mp.events.add('cliente:destruirMarker', (_tipo) => {
    for (let entry of localPlayer.markers) {
        if (entry != undefined) {
            const index = localPlayer.markers.indexOf(entry);
            if (index > -1) {
                if (localPlayer.markers[index].tipo === _tipo) {
                    localPlayer.markers[index].destroy();
                    localPlayer.markers.splice(index);
                }
            }
        }
    }
});
mp.events.add('cliente:criarSphere', (_tipo, _x, _y, _z, _scale = 0.75) => {
    const novaSphere = mp.colshapes.newSphere(_x, _y, _z, _scale);
    novaSphere.tipo = _tipo;
    localPlayer.colshapes.push(novaSphere);
});
mp.events.add('cliente:destruirSphere', (_tipo) => {
    for (let entry of localPlayer.colshapes) {
        if (entry != undefined) {
            const index = localPlayer.colshapes.indexOf(entry);
            if (index > -1) {
                if (localPlayer.colshapes[index].tipo === _tipo) {
                    localPlayer.colshapes[index].destroy();
                    localPlayer.colshapes.splice(index);
                }
            }
        }
    }
});

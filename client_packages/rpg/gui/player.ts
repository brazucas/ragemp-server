//var blipCliente: BlipMp [] = [];
const localPlayer = mp.players.local;
mp.events.add('cliente:criarBlip', (_sprite: number, _position: Vector3Mp, _name: string, _color: number, _range: boolean, _tipo: string, _waypoint: boolean = false) => {
    //mp.console.logInfo(`${_sprite} ${_position} ${_name} ${_color} ${_range} ${_tipo} ${_waypoint}`, true, true);
    const novoBlip: BlipMp = mp.blips.new(_sprite, _position,
    {
        name: _name,
        color:  _color,
        shortRange: _range
    });
    novoBlip.tipo = _tipo;
    if(_waypoint) mp.game.ui.setNewWaypoint(_position.x, _position.y);
    localPlayer.blips.push(novoBlip);
});

mp.events.add('cliente:destruirBlip', (_tipo: string) => {
    for (let entry of localPlayer.blips) {
        if(entry.doesExist()) {
            const index: number = localPlayer.blips.indexOf(entry);
            if (index > -1) {
                if(localPlayer.blips[index].tipo === _tipo) {
                    localPlayer.blips[index].destroy();
                    localPlayer.blips.splice(index);
                }
            }
        }
    }
});

mp.events.add('cliente:criarMarker', (_tipo: string, _type: number, _position: Vector3Mp, _scale: number = 0.75, 
    _color: RGBA | undefined = [255,0,0,255], _dimension: number | undefined = 0, _rotation: number | undefined = 0, _visible: boolean | undefined = true) => {
    //mp.console.logInfo(`${_sprite} ${_position} ${_name} ${_color} ${_range} ${_tipo} ${_waypoint}`, true, true);
    const novoMarker: MarkerMp = mp.markers.new(_type, _position, _scale,
    {
        color: _color
    });
    novoMarker.tipo = _tipo;
    localPlayer.markers.push(novoMarker);
});

mp.events.add('cliente:destruirMarker', (_tipo: string) => {
    for (let entry of localPlayer.markers) {
        if(entry != undefined) {
            const index: number = localPlayer.markers.indexOf(entry);
            if (index > -1) {
                if(localPlayer.markers[index].tipo === _tipo) {
                    localPlayer.markers[index].destroy();
                    localPlayer.markers.splice(index);
                }
            }
        }
    }
});

mp.events.add('cliente:criarSphere', (_tipo: string, _x: number, _y: number, _z: number, _scale: number = 0.75) => {
    const novaSphere: ColshapeMp = mp.colshapes.newSphere(_x, _y, _z, _scale);
    novaSphere.tipo = _tipo;
    localPlayer.colshapes.push(novaSphere);
});

mp.events.add('cliente:destruirSphere', (_tipo: string) => {
    for (let entry of localPlayer.colshapes) {
        if(entry != undefined) {
            const index: number = localPlayer.colshapes.indexOf(entry);
            if (index > -1) {
                if(localPlayer.colshapes[index].tipo === _tipo) {
                    localPlayer.colshapes[index].destroy();
                    localPlayer.colshapes.splice(index);
                }
            }
        }
    }
});
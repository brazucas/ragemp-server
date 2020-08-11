import fs from "fs";
const saveFile = "savedpos.txt";
let groundZ: number = 0;
mp.events.addCommand("savepos", (player, name = "Sem descrição") => {
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;
    console.log(pos.z);
    pos.z = (groundZ <= 0 && player.vehicle) ? pos.z = pos.z : pos.z = groundZ;
    console.log(pos.z);
    require("../../1zoneapi/index.js");
    player.call('cliente:getGroundZFor3dCoord',[player]);
    fs.appendFile(saveFile, `[${player.name}] Posição: ${pos.x}, ${pos.y}, ${pos.z} [Região: ${mp.world.zone.getName3d(pos)}] | ${(player.vehicle) ? `Rotação: ${rot.x}, ${rot.y}, ${rot.z}` : `Ângulo: ${rot}`} | ${(player.vehicle) ? "Em veículo" : "A pé"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~SavePos Erro: ~w~${err.message}`);
        } else {
            player.notify(`~g~Posição salva. ~w~(${name})`);
        }
    });
});

mp.events.add("servidor:getGroundZFor3dCoord", (player, _groundZ: number) => {
    groundZ = _groundZ;
});

mp.events.addCommand("verpos", (player) => {
    var fs = require('fs')
    , es = require('event-stream');

    var lineNr = 0;

    var s = fs.createReadStream('savedpos.txt')
        .pipe(es.split())
        .pipe(es.mapSync(function(line: String){

            // pause the readstream
            s.pause();
            
            //console.log(line);
            player.call("cliente:logEscrever", [line]);
            lineNr += 1;

            // process line here and call s.resume() when rdy

            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(err: any){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
        })
    );
});
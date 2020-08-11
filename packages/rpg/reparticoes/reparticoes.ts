//falta fazer um objeto para armazenar informacoes gerais de todas as reparticoes (como IDs) criadas
class ReparticaoInit {
    blip: BlipMp [];
    marker: MarkerMp [];
    colShapeMrk: ColshapeMp [];
    constructor(_local: Vector3Mp [], _iconeBlip: number, _corBlip: number, _raioMarker: Number, _corMarker: RGBA, _nome: string) {
        this.blip = [];
        this.marker = [];
        this.colShapeMrk = [];
        for (let entry of _local) {
            this.blip.push(mp.blips.new(_iconeBlip, entry,
            {
                name: _nome,
                color: _corBlip,
                shortRange: true
            }));
            entry.z = entry.z - 1.0;
            this.marker.push(mp.markers.new(1, entry, 0.75,
            {
                color: _corMarker
            }));
            this.colShapeMrk.push(mp.colshapes.newSphere(entry.x, entry.y, entry.z+1, 0.75));
        }
        console.log(`${this.blip.length} ${_nome}(s) inicializados!`);
    }
    maisProximo(Position: Vector3Mp) {
        let prevdist: number = 100000.000;
        let reparticaoID: number | undefined;
        this.marker.forEach((value, index) => {
            const dist: number = this.marker[index].dist(Position);
            if(dist < prevdist) {
                prevdist = dist;
                reparticaoID = index;
            }
        });
        return reparticaoID;
    }
    noMarcador(Player: PlayerMp): boolean {
        const _position = Player.position;
        let noMarcador: boolean = false;
        this.colShapeMrk.some(function(element, index) {
            if(element.isPointWithin(_position)) {
                noMarcador = true;
            }
            if (noMarcador) return true
            else return false
        })
        return noMarcador;
    }
}

export const mercadinho = new ReparticaoInit(
    [
        new mp.Vector3(-1224.518798828125, -907.8533325195312, 12.326346397399902),
        new mp.Vector3(-1224.518798828125, -907.8533325195312, 12.326346397399902),
        new mp.Vector3(1135.71533203125, -980.4263916015625, 46.415802001953125),
        new mp.Vector3(-3241.510009765625, 1001.0987548828125, 12.830707550048828),
        new mp.Vector3(547.6939086914062, 2671.97900390625,  42.156494140625),
        new mp.Vector3(2558.078857421875, 382.054443359375,  108.6229476928711),
        new mp.Vector3(25.74725341796875, -1348.1279296875,  29.497024536132812),
        new mp.Vector3(373.62811279296875, 325.4151306152344, 103.56636810302734),
        new mp.Vector3(-2968.369873046875, 389.3060302734375, 15.043313980102539),
        new mp.Vector3(-1486.3062744140625, -380.57513427734375, 40.16342544555664)
    ],
    52, 1, 0.75, [255,0,0,255], "Mercadinho"
);
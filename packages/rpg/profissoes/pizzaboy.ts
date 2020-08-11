import {mercadinho} from '../reparticoes/reparticoes'

mp.events.addCommand("mercadinho", (player) => {
    const id = mercadinho.maisProximo(player.position);
    if(id != undefined) {
        mercadinho.blip[id].routeFor(player, 2, 1);
        player.notify(`Marcamos no teu mapa o mercadinho mais próximo! (ID: ${id})`);
    }
});

mp.events.addCommand("trabalhar", (player) => {
    //mp.events.callLocal("servidor:IniciarPizzaboy", [player]);
    const noMarcador: boolean = mercadinho.noMarcador(player);
    if(!player.status.trabalhando && noMarcador === true) {
        player.status.trabalhando = true;
        player.PizzaBoy = new PizzaBoyInit(player);
    }
    else player.notify('Você não está em um mercadinho ou já está trabalhando!');
});
mp.events.addCommand("entregar", (player) => {
    //mp.events.callLocal("servidor:IniciarPizzaboy", [player]);
    //console.log(mercadinho.noMarcador(player));
    if(player.PizzaBoy.indoEntrega) {
        player.PizzaBoy.irMercadinhoProximo(player);
    }
    else player.notify('Você não está entregando!');
});
class PizzaBoyInit {
    indoEntrega: Boolean;
    indoMercadinho: Boolean;
    posEntregaAtual: Vector3Mp;
    readonly posEntrega: Vector3Mp [] = [
        new mp.Vector3(1088.57666015625, -775.6830444335938, 58.27894973754883),
        new mp.Vector3(965.6817626953125, -542.8438720703125, 59.35910415649414),
        new mp.Vector3(335.56005859375, -1994.968505859375, 24.05843162536621),
        new mp.Vector3(182.77108764648438, -2028.3824462890625, 18.263368606567383),
        new mp.Vector3(23.593910217285156, -1896.2718505859375, 22.959613800048828),
        new mp.Vector3(-215.8455352783203, -1576.7032470703125, 38.05450439453125),
        new mp.Vector3(-233.88204956054688, -1490.5948486328125, 32.959999084472656),
        new mp.Vector3(-233.88204956054688, -1490.5948486328125, 32.959999084472656),
        new mp.Vector3(-233.88204956054688, -1490.5948486328125, 32.959999084472656),
        new mp.Vector3(-50.6439208984375, -1058.7657470703125, 27.80057716369629),
        new mp.Vector3(7.321916103363037, -934.9170532226562, 29.905006408691406),
        new mp.Vector3(43.98210906982422, -997.8931884765625, 29.33529281616211),
        new mp.Vector3(329.2203369140625, -800.7277221679688, 29.266511917114258),
        new mp.Vector3(499.20916748046875, -550.6196899414062, 24.751144409179688),
        new mp.Vector3(-116.88402557373047, -605.9456787109375, 36.280731201171875),
        new mp.Vector3(-236.06173706054688, -340.5564880371094, 30.06034278869629), 
        new mp.Vector3(-273.194580078125, 28.278846740722656, 54.75250244140625),
        new mp.Vector3(-354.5012512207031, 213.75892639160156, 86.69738006591797),
        new mp.Vector3(-627.8850708007812, 169.58694458007812, 61.15936279296875),
        new mp.Vector3(-1038.44140625, 222.16720581054688, 64.37574005126953),
        new mp.Vector3(-1383.516357421875, 267.3495788574219, 61.23878860473633),
        new mp.Vector3(-1408.2099609375, -109.1984634399414, 51.66018295288086),
        new mp.Vector3(-1821.6806640625, -405.6352233886719, 46.48472595214844),
        new mp.Vector3(-1870.402587890625, -588.2653198242188, 11.859622955322266), 
        new mp.Vector3(-3023.957763671875, 80.33596801757812, 11.608119010925293),
        new mp.Vector3(-1753.341064453125, -724.4586181640625, 10.383560180664062), 
        new mp.Vector3(-1351.4373779296875, -1128.50146484375, 4.119728088378906),
        new mp.Vector3(-1031.612060546875, -1620.593017578125, 5.0097150802612305) 
    ];
    constructor(player: PlayerMp) {
        this.indoEntrega = true;
        this.indoMercadinho = false;
        this.posEntregaAtual = this.gerarEntrega(player);
    }
    gerarEntrega(player: PlayerMp): Vector3Mp {
        let randPos: Vector3Mp = this.posEntrega[Math.floor(Math.random() * this.posEntrega.length)];
        randPos.z = randPos.z - 1;
        this.posEntregaAtual = randPos;
        /*const cp: CheckpointMp = mp.checkpoints.new(1, randPos, 1.5,
        {
            //direction: randPos,
            color: [ 255, 255, 255, 255 ],
            visible: false,
            dimension: 0
        });*/
        //this.cpAtivo = cp;
        player.notify(`Marcamos no teu mapa o local da entrega!`);
        //this.cpAtivo.showFor(player);
        player.call('cliente:criarBlip',[1,randPos,'Entrega',1,false,'EntregaPizzaBlip', true]);
        player.call('cliente:criarMarker',['EntregaPizzaMarker',1,randPos]);
        player.call('cliente:criarSphere',['EntregaPizzaSphere', randPos.x, randPos.y, randPos.z+1]);
        this.indoMercadinho = false;
        this.indoEntrega = true;
        return this.posEntregaAtual;
    }
    irMercadinhoProximo(player: PlayerMp) {
        const id = mercadinho.maisProximo(player.position);
        if(id != undefined) {
            mercadinho.blip[id].routeFor(player, 2, 1);
            this.indoMercadinho = true;
            this.indoEntrega = false;
            player.call('cliente:destruirBlip',['EntregaPizzaBlip']);
            player.call('cliente:destruirMarker',['EntregaPizzaMarker']);
            player.call('cliente:destruirSphere',['EntregaPizzaSphere']);
            player.notify(`Marcamos no teu mapa o mercadinho mais próximo! (ID: ${id})`);
        }
    }
}

mp.events.add("servidor:PizzaEntregue", (player) => {
    if(player.PizzaBoy.indoEntrega) {
        player.PizzaBoy.irMercadinhoProximo(player);
    }
    else player.notify('Você não está entregando!');
});
/*var tempo;
mp.events.add("servidor:IniciarPizzaboy", (player, atalhoTecla: Boolean = false) => {
    console.log('chamou');
    if(atalhoTecla) {
        tempo = new Date().getSeconds;
        if(player.getVariable('TempoDelayTecla') + 3 <= tempo) {
            player.setVariable('TempoDelayTecla', tempo);
            player.setVariable('TeclaBloqueada', true);
        }
        
    }
    else {
        if(!player.status.trabalhando) {
            player.status.trabalhando = true;
            player.PizzaBoy = new PizzaBoyInit(player);
            player.PizzaBoy.cpAtivo.showFor(player);
            player.notify(`Marcamos no teu mapa o local da entrega!`);
        }
    }
});*/

/*mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
    if(player.PizzaBoy.cpAtivo === checkpoint) {
        player.PizzaBoy.cpAtivo.destroy();
        player.PizzaBoy.irMercadinhoProximo(player);
    }
});*/
/*mp.events.add("playerEnterColshape", (player, shape: ColshapeMp) => {
    if(player.PizzaBoy.indoMercadinho && shape == mercadinho.noMarcador(player)) {
        const id = mercadinho.maisProximo(player.position);
        if(id != undefined) {
            mercadinho.blip[id].unrouteFor(player);
            player.PizzaBoy.gerarEntrega(player);
        }
    }
});*/
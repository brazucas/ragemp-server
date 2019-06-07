"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringIsNumber = value => isNaN(Number(value)) === false;
const VOICE_CHAT_RANGE = 50.0;
const VOICE_CHAT_INTERVAL = 2000;
function EnumToArray(enumme) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key]);
}
class Client {
    constructor() {
        this.browsers = {
            central: new Navegador('central'),
            playersOnline: new Navegador('playersOnline'),
            playerGui: new Navegador('playerGui'),
        };
        this.noClipCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 45);
        this.noClipCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 60000, true, false);
        mp.players.local.freezePosition(true);
        mp.game.cam.doScreenFadeIn(5000);
        mp.gui.cursor.visible = false;
        mp.players.local.setVisible(false, false);
        mp.players.local.setCollision(false, false);
        this.keysBindings();
        this.initServerEvents();
        this.initPlayerEvents();
        this.initBrowserEvents();
        this.bindCommands();
    }
    login() {
        this.browsers.central.navegar('login');
        this.browsers.central.mostrar();
    }
    registro() {
        this.browsers.central.navegar('registro');
        this.browsers.central.mostrar();
    }
    initServerEvents() {
        this.serverEvents = new ServerEvents(this);
    }
    initBrowserEvents() {
        this.browserEvents = new BrowserEvents(this);
    }
    initPlayerEvents() {
        this.playerEvents = new PlayerEvents(this);
    }
    broadcastBrowserEvent(eventName, data) {
        const browsers = Object.keys(this.browsers).map((key) => {
            return this.browsers[key];
        });
        browsers.forEach(browser => browser.call(eventName, data));
    }
    bindCommands() {
        const comandos = new Commands(this);
        mp.events.add("playerCommand" /* PLAYER_COMMAND */, (command) => {
            console.debug(`[COMANDO CLIENTE] comando ${command} solicitado`);
            const arr = command.split(' ');
            if (comandos[arr[0]]) {
                const comando = arr[0];
                arr.shift();
                comandos[comando](mp.players.local, ...arr);
            }
            else {
                mp.gui.chat.push('!{#FF0000}Comando desconhecido');
            }
        });
    }
    keysBindings() {
        mp.keys.bind(0x5A, true, () => {
            if (this.autenticacaoResultado.autenticado) {
                this.browsers.playersOnline.navegar('players-online');
                let jogadores = [];
                mp.players.forEach((player) => jogadores.push({
                    name: player.name,
                    ping: player.ping,
                    id: player.remoteId,
                    data: {
                        nivel: 0,
                    }
                }));
                this.browsers.playersOnline.execute(`window.my.playersOnline.listaJogadores('${JSON.stringify(jogadores)}')`);
                this.browsers.playersOnline.mostrar();
            }
        });
        mp.keys.bind(0x5A, false, () => {
            if (this.autenticacaoResultado.autenticado) {
                this.browsers.playersOnline.esconder();
            }
        });
        mp.keys.bind(0x02, false, () => {
            const browsers = Object.keys(this.browsers).map((key) => {
                return this.browsers[key];
            });
            const navegadoresAbertos = browsers.filter((browser) => browser.navegadorAberto);
            if (navegadoresAbertos.length > 0) {
                mp.gui.cursor.visible = true;
            }
        });
        mp.keys.bind(0x72, false, () => {
            if (this.autenticacaoResultado.autenticado) {
                this.browsers.playerGui.call('setPlayerGuiMenuAtivo', '');
            }
        });
    }
}
class Commands {
    constructor(client) {
        this.client = client;
    }
    criarveiculo() {
        this.client.browsers.central.navegar('criar-veiculo');
        this.client.browsers.central.mostrar();
        this.client.browsers.central.execute(`window.my.ragemp.DadosJogador('${JSON.stringify({
            posicaoX: mp.players.local.position.x,
            posicaoY: mp.players.local.position.y,
            posicaoZ: mp.players.local.position.z,
        })}')`);
    }
}
class Navegador {
    constructor(browserName) {
        this.browser = mp.browsers.new('package://browser/index.html');
        setTimeout(() => {
            this.browser.execute(`window.my.ragemp.setPlayerName('${mp.players.local.name}')`);
            this.browser.execute(`window.my.ragemp.setBrowserName('${browserName}')`);
        }, 2000);
        mp.keys.bind(0x75, true, () => {
            this.navegadorAberto ? this.esconder() : this.mostrar();
        });
    }
    navegar(pagina) {
        this.browser.execute(`window.my.app.mudarPagina('${pagina}')`);
    }
    mostrar(mostrarCursor = true) {
        this.navegadorAberto = true;
        this.browser.execute(`window.my.app.toggleNavegador(true)`);
        if (mostrarCursor) {
            setTimeout(() => {
                mp.gui.cursor.visible = true;
            }, 100);
        }
    }
    publish(event, eventId, data) {
        this.execute(`window.my.ragemp.serverEvent(${eventId}, '${event}', ${JSON.stringify(data)})`);
    }
    esconder() {
        this.navegadorAberto = false;
        this.browser.execute(`window.my.app.toggleNavegador(false)`);
        mp.gui.cursor.visible = false;
    }
    call(eventName, data) {
        this.execute(`window.my.ragemp.${eventName}(${JSON.stringify(data)})`);
    }
    execute(codigo) {
        this.browser.execute(codigo);
    }
}
class PlayerEvents {
    constructor(client) {
        this.voiceChatListeners = [];
        this.client = client;
        this.startVoiceChat();
    }
    startVoiceChat() {
        mp.voiceChat.muted = false;
        this.chatInterval = setInterval(() => {
            const currentListeners = [];
            mp.players.forEachInRange(mp.players.local.position, VOICE_CHAT_RANGE, player => {
                if (player.remoteId !== mp.players.local.remoteId) {
                    currentListeners.push(player);
                }
            });
            const diff = this.voiceChatListeners.filter(player => !currentListeners.find((p) => p.remoteId === player.remoteId));
            diff.forEach(playerDiff => {
                if (playerDiff) {
                    mp.events.callRemote('browser', JSON.stringify({
                        eventId: -1,
                        event: 'DesabilitarVoiceChat',
                        data: JSON.stringify({
                            targetId: playerDiff.remoteId,
                        }),
                    }));
                    mp.gui.chat.push(`!{#FFFFFF}[CHAT POR VOZ] !{#FF0000}${playerDiff.name} !{#FF0000}saiu.`);
                }
            });
            currentListeners.forEach(player => {
                if (!this.voiceChatListeners.find(listener => listener.remoteId == player.remoteId)) {
                    mp.events.callRemote('browser', JSON.stringify({
                        eventId: -1,
                        event: 'HabilitarVoiceChat',
                        data: JSON.stringify({
                            targetId: player.remoteId,
                        }),
                    }));
                    player.voice3d = true;
                    player.voiceVolume = 1.0;
                    mp.gui.chat.push(`!{#FFFFFF}[CHAT POR VOZ] !{#FF0000}${player.name} !{#00FFFF}entrou.`);
                }
            });
            this.voiceChatListeners = currentListeners;
            this.broadcastListeners();
        }, VOICE_CHAT_INTERVAL);
    }
    broadcastListeners() {
        const simpleListeners = this.voiceChatListeners.map(listener => {
            return {
                playerId: listener.remoteId,
                playerName: listener.name,
            };
        });
        this.client.broadcastBrowserEvent('setVoiceChatListeners', simpleListeners);
    }
    stopVoiceChat() {
        clearInterval(this.chatInterval);
    }
}
class ServerEvents {
    constructor(client) {
        this.client = client;
        mp.events.add('server', (serverEvent) => {
            console.log(`[SERVER EVENT] Evento ${serverEvent.event} recebido 
      redirecionando para o browser com os seguintes dados: ${JSON.stringify(serverEvent.data)}`);
            if (typeof this[serverEvent.event] === 'function') {
                this[serverEvent.event](serverEvent.data);
            }
            else if (serverEvent.data && serverEvent.data.eventoResposta && typeof this[serverEvent.data.eventoResposta] === 'function') {
                this[serverEvent.data.eventoResposta](serverEvent.data);
            }
            this.forwardEventToBrowser(serverEvent);
        });
        mp.events.add("playerStartTalking" /* PLAYER_START_TALKING */, () => {
            mp.events.callRemote('browser', JSON.stringify({
                eventId: -1,
                event: 'AnimacaoVoiceChat',
                data: JSON.stringify({
                    targetId: mp.players.local.remoteId,
                }),
            }));
            mp.gui.chat.push(`!{#FFFFFF}[CHAT POR VOZ] !{#00FF00}Você começou a falar.`);
        });
        mp.events.add("playerStopTalking" /* PLAYER_STOP_TALKING */, () => {
            mp.gui.chat.push(`!{#FFFFFF}[CHAT POR VOZ] !{#FF0000}Você parou de falar.`);
        });
    }
    browserEvent(event, eventId, data) {
        this.client.browsers.central.publish(event, eventId, data);
    }
    forwardEventToBrowser(serverEvent) {
        this.browserEvent(serverEvent.event, serverEvent.eventId, serverEvent.data);
    }
    AutenticacaoResultado(resultado) {
        if (resultado.autenticado) {
            this.client.autenticacaoResultado = resultado;
            mp.players.local.setVisible(true, true);
            mp.players.local.setCollision(true, true);
            mp.players.local.freezePosition(false);
            if (this.client.noClipCamera) {
                this.client.noClipCamera.setActive(false);
                this.client.noClipCamera.destroy();
            }
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
            mp.gui.cursor.visible = false;
            this.client.browsers.playerGui.navegar('player-gui');
            this.client.browsers.playerGui.mostrar(false);
        }
    }
    RegistroResultado(resultado) {
        if (resultado.registrado) {
            this.AutenticacaoResultado({
                autenticado: true,
            });
        }
    }
    cursor() {
        mp.gui.cursor.visible = this.client.cursorVisible = !this.client.cursorVisible;
    }
    DadosJogador(jogador) {
        this.client.jogador = jogador;
        if (jogador) {
            this.client.login();
        }
        else {
            this.client.registro();
        }
    }
}
class BrowserEvents {
    constructor(client) {
        this.client = client;
        mp.events.add('browser', (eventId, event, data) => {
            console.log(`[BROWSER EVENT] Evento ${event} (ID ${eventId}) recebido 
      redirecionando para o server com os seguintes dados: ${data}`);
            mp.events.callRemote('browser', JSON.stringify({
                eventId: eventId,
                event: event,
                data: data,
            }));
        });
        mp.events.add('FecharBrowser', (browserName) => {
            if (typeof this.client.browsers[browserName] !== 'undefined') {
                this.client.browsers[browserName].esconder();
            }
        });
        mp.events.add('HabilitarCursor', () => {
            mp.gui.cursor.visible = true;
        });
        mp.events.add('DesabilitarCursor', () => {
            mp.gui.cursor.visible = false;
        });
    }
}
new Client();
//# sourceMappingURL=index.js.map
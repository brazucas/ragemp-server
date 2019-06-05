import { JogadorOnline } from '../browser/src/app/players-online/players-online.page';
import { Jogador } from '../browser/src/interfaces/jogador.interface';
import { AutenticacaoResultado, RegistroResultado } from '../browser/src/interfaces/login.interface';
import { BrazucasEventos, ServerEvent } from '../packages/rpg/interfaces/brazucas-eventos';
import EventKey = RageEnums.EventKey;

const StringIsNumber = value => isNaN(Number(value)) === false;

const VOICE_CHAT_RANGE = 50.0;
const VOICE_CHAT_INTERVAL = 2000;

function EnumToArray(enumme) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

class Client {
  public jogador: Jogador;
  public serverEvents: ServerEvents;
  public browserEvents: BrowserEvents;

  public browsers: {
    central: Navegador,
    playersOnline: Navegador,
  } = {
    central: new Navegador('central'),
    playersOnline: new Navegador('playersOnline'),
  };
  public cursorVisible: boolean;
  public noClipCamera: CameraMp;
  public autenticacaoResultado: AutenticacaoResultado;

  constructor() {
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
    this.initBrowserEvents();
    this.bindCommands();
  }

  public login() {
    this.browsers.central.navegar('login');
    this.browsers.central.mostrar();
  }

  public registro() {
    this.browsers.central.navegar('registro');
    this.browsers.central.mostrar();
  }

  private initServerEvents() {
    this.serverEvents = new ServerEvents(this);
  }

  private initBrowserEvents() {
    this.browserEvents = new BrowserEvents(this);
  }

  private bindCommands() {
    const comandos = new Commands(this);

    mp.events.add(EventKey.PLAYER_COMMAND, (command: string) => {
      console.debug(`[COMANDO CLIENTE] comando ${command} solicitado`);

      const arr = command.split(' ');

      if (comandos[arr[0]]) {
        const comando = arr[0];

        arr.shift();

        comandos[comando](mp.players.local, ...arr);
      } else {
        mp.gui.chat.push('!{#FF0000}Comando desconhecido');
      }
    });
  }

  private keysBindings() {
    mp.keys.bind(0x5A, true, () => { // Segurar a letra Z
      if (this.autenticacaoResultado.autenticado) {
        this.browsers.playersOnline.navegar('players-online');

        let jogadores: JogadorOnline[] = [];

        mp.players.forEach((player) => jogadores.push({
          name: player.name,
          ping: player.ping,
          id: player.id,
          data: {
            nivel: 0,
          }
        }));

        this.browsers.playersOnline.execute(`window.my.playersOnline.listaJogadores('${JSON.stringify(jogadores)}')`);

        this.browsers.playersOnline.mostrar();
      }
    });

    mp.keys.bind(0x5A, false, () => { // Soltar letra Z
      if (this.autenticacaoResultado.autenticado) {
        this.browsers.playersOnline.esconder();
      }
    });

    mp.keys.bind(0x02, false, () => { // Botão direito do mouse
      const browsers: Navegador[] = Object.keys(this.browsers).map((key) => {
        return this.browsers[key];
      });

      const navegadoresAbertos = browsers.filter((browser) => browser.navegadorAberto);

      if (navegadoresAbertos.length > 0) {
        mp.gui.cursor.visible = true;
      }
    });
  }
}

class Commands {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public criarveiculo() {
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
  private browser: BrowserMp;
  public navegadorAberto: boolean;

  constructor(browserName: string) {
    this.browser = mp.browsers.new('package://browser/index.html');

    setTimeout(() => {
      this.browser.execute(`window.my.ragemp.setPlayerName('${mp.players.local.name}')`);
      this.browser.execute(`window.my.ragemp.setBrowserName('${browserName}')`);
    }, 2000);

    mp.keys.bind(0x75, true, () => {
      this.navegadorAberto ? this.esconder() : this.mostrar();
    });
  }

  public navegar(pagina: string) {
    this.browser.execute(`window.my.app.mudarPagina('${pagina}')`);
  }

  public mostrar() {
    this.navegadorAberto = true;
    this.browser.execute(`window.my.app.toggleNavegador(true)`);

    setTimeout(() => {
      mp.gui.cursor.visible = true;
    }, 100);
  }

  public publish(event: string, eventId: number, data: any) {
    this.execute(`window.my.ragemp.serverEvent(${eventId}, '${event}', ${JSON.stringify(data)})`);
  }

  public esconder() {
    this.navegadorAberto = false;
    this.browser.execute(`window.my.app.toggleNavegador(false)`);
    mp.gui.cursor.visible = false;
  }

  public execute(codigo: string) {
    this.browser.execute(codigo);
  }
}

class PlayerEvents {
  public client: Client;
  public voiceChatListeners: PlayerMp[] = [];
  public chatInterval: NodeJS.Timer;

  constructor(client: Client) {
    this.client = client;

    this.startVoiceChat();
  }

  public startVoiceChat() {
    this.chatInterval = setInterval(() => {
      const currentListeners: PlayerMp[] = [];

      mp.players.forEachInRange(mp.players.local.position, VOICE_CHAT_RANGE, player => {
        currentListeners.push(player);
        player.voice3d = true;
        player.voiceAutoVolume = true;
      });

      const diff = this.voiceChatListeners.filter(player => !currentListeners.find((p) => p === player));

      diff.forEach(playerDiff => {
        mp.events.callRemote(BrazucasEventos.DESABILITAR_VOICE_CHAT, JSON.stringify({
          targetId: playerDiff.id,
        }));
      });

      currentListeners.forEach(playerDiff => {
        mp.events.callRemote(BrazucasEventos.HABILITAR_VOICE_CHAT, JSON.stringify({
          targetId: playerDiff.id,
        }));
      });
    }, VOICE_CHAT_INTERVAL);
  }

  public stopVoiceChat() {
    clearInterval(this.chatInterval);
  }
}

class ServerEvents {
  public client: Client;

  constructor(client: Client) {
    this.client = client;

    mp.events.add('server', (serverEvent: ServerEvent<any>) => {
      console.log(`[SERVER EVENT] Evento ${serverEvent.event} recebido 
      redirecionando para o browser com os seguintes dados: ${JSON.stringify(serverEvent.data)}`);

      if (typeof this[serverEvent.event] === 'function') {
        this[serverEvent.event](serverEvent.data);
      } else if (serverEvent.data && serverEvent.data.eventoResposta && typeof this[serverEvent.data.eventoResposta] === 'function') {
        this[serverEvent.data.eventoResposta](serverEvent.data);
      }

      this.forwardEventToBrowser(serverEvent);
    });
  }

  private browserEvent(event: string, eventId: number, data: string) {
    this.client.browsers.central.publish(event, eventId, data);
  }

  private forwardEventToBrowser(serverEvent: ServerEvent<any>) {
    this.browserEvent(serverEvent.event, serverEvent.eventId, serverEvent.data);
  }

  public AutenticacaoResultado(resultado: AutenticacaoResultado) {
    if (resultado.autenticado) {
      this.client.autenticacaoResultado = resultado;
      mp.players.local.setVisible(true, true);
      mp.players.local.setCollision(true, true);
      mp.players.local.freezePosition(false);
      this.client.noClipCamera.setActive(false);
      this.client.noClipCamera.destroy();
      mp.game.cam.renderScriptCams(false, false, 0, true, false);
      mp.gui.cursor.visible = false;
    }
  }

  public RegistroResultado(resultado: RegistroResultado) {
    if (resultado.registrado) {
      this.AutenticacaoResultado({
        autenticado: true,
      });
    }
  }

  public cursor() {
    mp.gui.cursor.visible = this.client.cursorVisible = !this.client.cursorVisible;
  }

  public DadosJogador(jogador: Jogador) {
    this.client.jogador = jogador;

    if (jogador) {
      this.client.login();
    } else {
      this.client.registro();
    }
  }
}

class BrowserEvents {
  public client: Client;

  constructor(client: Client) {
    this.client = client;

    mp.events.add('browser', (eventId: number, event: string, data: string) => {
      console.log(`[BROWSER EVENT] Evento ${event} (ID ${eventId}) recebido 
      redirecionando para o server com os seguintes dados: ${data}`);

      mp.events.callRemote('browser', JSON.stringify({
        eventId: eventId,
        event: event,
        data: data,
      }));
    });

    mp.events.add('FecharBrowser', (browserName: string) => {
      if (typeof this.client.browsers[browserName] !== 'undefined') {
        this.client.browsers[browserName].esconder();
      }
    });
  }
}

new Client();

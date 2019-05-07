import { BrazucasEventos, ServerEvent } from '../../packages/rpg/interfaces/brazucas-eventos';
import { Jogador } from '../src/interfaces/jogador.interface';
import { AutenticacaoResultado, RegistroResultado } from '../src/interfaces/login.interface';
import { Client } from './client';

export class ServerEvents {
  public client: Client;

  constructor(client: Client) {
    this.client = client;

    mp.events.add(BrazucasEventos.SERVER, (serverEvent: ServerEvent<any>) => {
      console.log(`[SERVER EVENT] Evento ${serverEvent.event} recebido 
      redirecionando para o browser com os seguintes dados: ${JSON.stringify(serverEvent.data)}`);

      if (typeof this[serverEvent.event] === 'function') {
        this[serverEvent.event](serverEvent.data);
      }

      this.forwardEventToBrowser(serverEvent);
    });
  }

  private browserEvent(event: string, data: string) {
    this.client.browsers.central.execute(`window.my.ragemp.serverEvent('${event}', ${JSON.stringify(data)})`);
  }

  private forwardEventToBrowser(serverEvent: ServerEvent<any>) {
    this.browserEvent(serverEvent.event, serverEvent.data);
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

  public [BrazucasEventos.DADOS_JOGADOR](jogador: Jogador) {
    if (jogador) {
      this.client.login();
    } else {
      this.client.registro();
    }
  }
}

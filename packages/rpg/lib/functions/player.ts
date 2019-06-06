import { BrazucasEventos, ServerEvent } from '../../interfaces/brazucas-eventos';

export function notificarTodos(text: string) {
  mp.players.forEach(player => player.notify(text));
}

export function playerEvent<T>(player: PlayerMp, event: string, data?: T, eventId?: number) {
  console.debug(`[PLAYER EVENT] ${player.name} chamou o evento ${event} (ID ${eventId}) com os seguintes dados: ${JSON.stringify(data)}`);

  player.call(BrazucasEventos.SERVER, [<ServerEvent<T>> {
    eventId: eventId,
    event: event,
    data: data,
  }]);
}

export function playersEvent<T>(event: string, data?: T, eventId?: number) {
  console.debug(`[ALL PLAYER EVENT] Evento ${event} (ID ${eventId}) com os seguintes dados: ${JSON.stringify(data)} disparado para ${mp.players.length} jogadores.`);

  mp.players.call(BrazucasEventos.SERVER, [<ServerEvent<T>> {
    eventId: eventId,
    event: event,
    data: data,
  }]);
}

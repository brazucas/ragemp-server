import { BrazucasEventos, ServerEvent } from '../../interfaces/brazucas-eventos';

export function notificarTodos(text: string) {
  mp.players.forEach(player => player.notify(text));
}

export function playerEvent<T>(player: PlayerMp, event: string, data?: T) {
  player.call(BrazucasEventos.SERVER, [<ServerEvent<T>> {
    event: event,
    data: data,
  }]);
}

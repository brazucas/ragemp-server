export function notificarTodos(text: string) {
  mp.players.forEach(player => player.notify(text));
}

let browser: BrowserMp;

mp.events.add('mostrarNavegador', () => {
  browser = mp.browsers.new('package://browser/index.html#/login');

  mp.gui.cursor.visible = true;
  mp.gui.chat.push('Mostrando navegador');
});

mp.events.add(RageEnums.EventKey.PLAYER_COMMAND, (player: PlayerMp, command: string) => {
  console.debug(`[COMANDO] ${player.name} enviou o comando ${command}`);

  const arr = command.split(' ');

  if (Comandos[arr[0]]) {
    const comando = arr[0];

    arr.shift();

    Comandos[comando](player, ...arr);
  } else {
    mp.gui.chat.push('!{#FF0000}Comando desconhecido');
  }
});

const Comandos = {
  cursor: (player: PlayerMp) => {
    browser.destroy();
    mp.gui.cursor.visible = false;
  }
};

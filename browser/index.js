var browser;
mp.events.add('mostrarNavegador', function () {
    browser = mp.browsers["new"]('package://browser/index.html#/login');
    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
});
mp.events.add("playerCommand" /* PLAYER_COMMAND */, function (player, command) {
    console.debug("[COMANDO] " + player.name + " enviou o comando " + command);
    var arr = command.split(' ');
    if (Comandos[arr[0]]) {
        var comando = arr[0];
        arr.shift();
        Comandos[comando].apply(Comandos, [player].concat(arr));
    }
    else {
        mp.gui.chat.push('!{#FF0000}Comando desconhecido');
    }
});
var Comandos = {
    cursor: function (player) {
        browser.destroy();
        mp.gui.cursor.visible = false;
    }
};

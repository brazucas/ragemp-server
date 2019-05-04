mp.events.add('mostrarNavegador', function () {
    mp.browsers["new"]('package://browser/index.html#/login');
    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
});

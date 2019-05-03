mp.events.add('mostrarNavegador', function () {
    var browser = mp.browsers["new"]('package://browser/index.html#/login');
    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
    setTimeout(function () {
        mp.gui.cursor.visible = false;
        browser.destroy();
    }, 16000);
});

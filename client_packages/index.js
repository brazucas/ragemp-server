mp.events.add('mostrarNavegador', () => {
    mp.browsers.new('package://browser/index.html');
    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
});
//# sourceMappingURL=index.js.map
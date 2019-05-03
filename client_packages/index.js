mp.events.add('mostrarNavegador', () => {
    const browser = mp.browsers.new('package://browser/index.html');
    mp.gui.cursor.visible = true;
    mp.gui.chat.push('Mostrando navegador');
    browser.execute("window.location = '/login'");
    setTimeout(() => {
        mp.gui.cursor.visible = false;
        browser.destroy();
    }, 8000);
});
//# sourceMappingURL=index.js.map
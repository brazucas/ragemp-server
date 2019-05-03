mp.events.add('mostrarNavegador', () => {
  const browser = mp.browsers.new('package://browser/index.html#/login');
  mp.gui.cursor.visible = true;
  mp.gui.chat.push('Mostrando navegador');

  setTimeout(() => {
    mp.gui.cursor.visible = false;
    browser.destroy();
  }, 16000);
});

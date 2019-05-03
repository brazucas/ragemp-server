mp.events.add('mostrarNavegador', () => {
  const browser = (mp as any).browsers.new('package://browser/index.html/#/login');
  (mp as any).gui.cursor.visible = true;
  (mp as any).gui.chat.push('Mostrando navegador');

  setTimeout(() => {
    (mp as any).gui.cursor.visible = false;
    browser.destroy();
  }, 16000);
});

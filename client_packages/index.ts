mp.events.add('mostrarNavegador', () => {
  (mp as any).browsers.new('package://browser/index.html');
  (mp as any).gui.cursor.visible = true;
  (mp as any).gui.chat.push('Mostrando navegador');
});

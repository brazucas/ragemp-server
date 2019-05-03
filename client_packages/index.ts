mp.events.add('mostrarNavegador', () => {
  (mp as any).browsers.new('package://brazucas-browser/dist/index.html');
  (mp as any).gui.chat.push('Mostrando navegador');
});

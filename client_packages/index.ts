mp.events.add('mostrarNavegador', () => {
  mp.browsers.new('package://brazucas-browser/dist/index.html');
  mp.gui.chat.push('Mostrando navegador');
});

declare let cmp: any;

cmp.events.add('mostrarNavegador', () => {
  cmp.browsers.new('package://brazucas-browser/dist/index.html');
  cmp.gui.chat.push('Mostrando navegador');
});

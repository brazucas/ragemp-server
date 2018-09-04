var bootstrap;

require('freeroam/index.js');

mp.events.add('guiReady', function () {
  if (!bootstrap) {
    // Creating CEF browser.
    bootstrap = mp.browsers.new('package://browser/index.html');
    // Init menus and events, when browser ready.
    mp.events.add('browserDomReady', function (browser) {

    });
  }
});
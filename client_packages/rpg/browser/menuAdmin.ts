// CEF browser.
let menu: BrowserMp;
// Configs.
let vehicles     = JSON.parse(require('./rpg/browser/assets/configs/vehicles.js'));
let skins        = JSON.parse(require('./rpg/browser/assets/configs/skins.js')).Skins;
let weapon       = JSON.parse(require('./rpg/browser/assets/configs/weapon.js'));
// Initialization functions.
let vehiclesInit = require('./rpg/browser/assets/menu_initialization/vehicles.js');
let skinsinit    = require('./rpg/browser/assets/menu_initialization/skins.js');
let weaponInit   = require('./rpg/browser/assets/menu_initialization/weapon.js');
let playersInit  = require('./rpg/browser/assets/menu_initialization/players.js');

// Creating browser.
mp.events.add('guiReady', () => {
    if (!menu) {
        // Creating CEF browser.
        menu = mp.browsers.new('package://rpg/browser/admin_panel/index.html');
        // Init menus and events, when browser ready.
        mp.events.add('browserDomReady', (browser) => {
            if (browser == menu) {
                // Init events.
                require('./rpg/admin/events.js')(menu);
                // Init menus.
                vehiclesInit(menu, vehicles);
                skinsinit(menu, skins);
                weaponInit(menu, weapon);
                playersInit(menu);

                mp.gui.execute(`insertMessageToChat('<div style="background-color: rgba(0, 0, 0, 0.75); font-size: 1.0vw; padding: 6px; color: #ff0000; font-weight: 600;">Press F2 for open freeroam menu.</div>', 'true');`);
            }
        });
    }
});

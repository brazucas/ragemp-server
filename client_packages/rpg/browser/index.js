"use strict";
// CEF browser.
var menu;
// Configs.
var vehicles = JSON.parse(require('./assets/configs/vehicles.js'));
var skins = JSON.parse(require('./assets/configs/skins.js')).Skins;
var weapon = JSON.parse(require('./assets/configs/weapon.js'));
// Initialization functions.
var vehiclesInit = require('./assets/menu_initialization/vehicles.js');
var skinsinit = require('./assets/menu_initialization/skins.js');
var weaponInit = require('./assets/menu_initialization/weapon.js');
var playersInit = require('./assets/menu_initialization/players.js');
// Creating browser.
mp.events.add('guiReady', function () {
    if (!menu) {
        // Creating CEF browser.
        menu = mp.browsers.new('package://rpg/browser/admin_panel/index.html');
        // Init menus and events, when browser ready.
        mp.events.add('browserDomReady', function (browser) {
            if (browser == menu) {
                // Init events.
                require('../admin/events.js')(menu);
                // Init menus.
                vehiclesInit(menu, vehicles);
                skinsinit(menu, skins);
                weaponInit(menu, weapon);
                playersInit(menu);
                mp.gui.execute("insertMessageToChat('<div style=\"background-color: rgba(0, 0, 0, 0.75); font-size: 1.0vw; padding: 6px; color: #ff0000; font-weight: 600;\">Press F2 for open freeroam menu.</div>', 'true');");
            }
        });
    }
});

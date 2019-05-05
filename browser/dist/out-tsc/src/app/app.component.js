import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, navCtrl, zone) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.mostrarNavegador = true;
        this.initializeApp();
        if (!window) {
            window = {};
        }
        window.my = window || {};
        window.app = window.ragemp || {};
        window.app.mudarPagina = this.mudarPagina.bind(this);
        window.app.toggleNavegador = this.toggleNavegador.bind(this);
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.mudarPagina = function (pagina) {
        this.navCtrl.navigateForward([pagina]);
    };
    AppComponent.prototype.toggleNavegador = function (toggle) {
        var _this = this;
        this.zone.run(function () {
            _this.mostrarNavegador = toggle;
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            NavController,
            NgZone])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map
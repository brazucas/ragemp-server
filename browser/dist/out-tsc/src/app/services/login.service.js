import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
var LoginService = /** @class */ (function () {
    function LoginService() {
        if (!window) {
            window = {};
        }
        window.my = window || {};
        window.login = window.ragemp || {};
        window.login.autenticacaoResultado = this.autenticacaoResultado.bind(this);
    }
    LoginService.prototype.login = function (dados) {
        var _this = this;
        return new Observable(function (observer) {
            _this.loginObserver = observer;
            if (typeof mp !== 'undefined') {
                mp.trigger('AutenticarJogador', dados);
            }
            else {
                observer.next({
                    autenticado: true,
                });
                observer.complete();
            }
        });
    };
    LoginService.prototype.autenticacaoResultado = function (autenticado, credenciaisInvalidas) {
        if (autenticado) {
            this.loginObserver.next({ autenticado: autenticado });
            this.loginObserver.complete();
        }
        else {
            this.loginObserver.error({ autenticado: false, credenciaisInvalidas: credenciaisInvalidas });
        }
    };
    LoginService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map
/// <reference path="../../../node_modules/@types/ragemp-c/index.d.ts" />
import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { RagempService } from '../services/ragemp.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(toastCtrl, loginService, ragemp) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.loginService = loginService;
        this.ragemp = ragemp;
        this.mostrarFormulario = true;
        this.formGroup = new FormGroup({
            usuario: new FormControl({
                value: '',
                disabled: true,
            }, {
                validators: [
                    Validators.maxLength(40),
                    Validators.required,
                ],
            }),
            senha: new FormControl('', {
                validators: [
                    Validators.required,
                ],
            }),
        });
        this.ragemp.playerName.subscribe(function (playerName) {
            _this.formGroup.controls.usuario.patchValue(playerName);
        });
    }
    LoginPage.prototype.ngAfterViewInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.campoSenha.setFocus();
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast, err_1, toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.loginService.login(this.formGroup.value).toPromise()];
                    case 1:
                        _a.sent();
                        this.mostrarFormulario = false;
                        return [4 /*yield*/, this.toastCtrl.create({
                                message: 'Autenticado com sucesso!',
                                position: 'top',
                                color: 'success',
                                duration: 3000,
                            })];
                    case 2:
                        toast = _a.sent();
                        toast.present();
                        setTimeout(function () {
                            mp.trigger('FecharBrowser');
                        }, 3000);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.toastCtrl.create({
                                message: err_1.mensagem || 'Um erro ocorreu ao autenticar',
                                position: 'top',
                                color: 'danger',
                                duration: 3000
                            })];
                    case 4:
                        toast = _a.sent();
                        toast.present();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('senha'),
        tslib_1.__metadata("design:type", IonInput)
    ], LoginPage.prototype, "campoSenha", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            LoginService,
            RagempService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map
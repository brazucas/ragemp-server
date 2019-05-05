import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var IconeComponent = /** @class */ (function () {
    function IconeComponent() {
        this.cor = '#FFFFFF';
        this.tamanho = '30px';
    }
    IconeComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], IconeComponent.prototype, "name", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], IconeComponent.prototype, "cor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], IconeComponent.prototype, "tamanho", void 0);
    IconeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-icone',
            templateUrl: './icone.component.html',
            styleUrls: ['./icone.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], IconeComponent);
    return IconeComponent;
}());
export { IconeComponent };
//# sourceMappingURL=icone.component.js.map
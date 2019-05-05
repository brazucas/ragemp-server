import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var PaginaComponent = /** @class */ (function () {
    function PaginaComponent() {
        this.podeFechar = true;
    }
    PaginaComponent.prototype.ngOnInit = function () { };
    PaginaComponent.prototype.fechar = function () {
        mp.trigger('FecharBrowser');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PaginaComponent.prototype, "podeFechar", void 0);
    PaginaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-pagina',
            templateUrl: './pagina.component.html',
            styleUrls: ['./pagina.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PaginaComponent);
    return PaginaComponent;
}());
export { PaginaComponent };
//# sourceMappingURL=pagina.component.js.map
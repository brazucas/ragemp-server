import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
var RagempService = /** @class */ (function () {
    function RagempService() {
        this.playerName = new BehaviorSubject(null);
        if (!window) {
            window = {};
        }
        window.my = window || {};
        window.ragemp = window.ragemp || {};
        window.ragemp.setPlayerName = this.setPlayerName.bind(this);
    }
    RagempService.prototype.setPlayerName = function (playerName) {
        this.playerName.next(playerName);
    };
    RagempService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RagempService);
    return RagempService;
}());
export { RagempService };
//# sourceMappingURL=ragemp.service.js.map
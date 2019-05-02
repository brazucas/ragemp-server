"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringIsNumber = value => isNaN(Number(value)) === false;
function EnumToArray(enumme) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key]);
}
exports.EnumToArray = EnumToArray;
//# sourceMappingURL=util.js.map
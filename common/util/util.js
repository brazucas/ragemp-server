"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
const StringIsNumber = value => isNaN(Number(value)) === false;
function EnumToArray(enumme) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key]);
}
exports.EnumToArray = EnumToArray;
function soNumeros(texto) {
    return texto.replace(/\D/g, '');
}
exports.soNumeros = soNumeros;
function bcryptHash(texto) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(texto, null, null, (err, resultado) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(resultado);
            }
        });
    });
}
exports.bcryptHash = bcryptHash;
function bcryptCompare(data, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(data, hash, (err, resultado) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(resultado);
            }
        });
    });
}
exports.bcryptCompare = bcryptCompare;
//# sourceMappingURL=util.js.map
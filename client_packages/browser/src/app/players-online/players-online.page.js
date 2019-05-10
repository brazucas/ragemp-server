"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const BehaviorSubject_1 = require("rxjs/internal/BehaviorSubject");
let PlayersOnlinePage = class PlayersOnlinePage {
    constructor() {
        this.jogadores = new BehaviorSubject_1.BehaviorSubject([]);
        if (!window) {
            window = {};
        }
        window.my = window || {};
        window.playersOnline = window.playersOnline || {};
        window.playersOnline.listaJogadores = this.listaJogadores.bind(this);
        if (typeof mp === 'undefined') {
            this.jogadores.next([
                {
                    name: 'GermanB',
                    data: {
                        nivel: 1,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 0,
                },
                {
                    name: 'Mandrakke_Army',
                    data: {
                        nivel: 2,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'joaoloco',
                    data: {
                        nivel: 3,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'premium',
                    data: {
                        nivel: 4,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Smoke_System',
                    data: {
                        nivel: 5,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Gouki',
                    data: {
                        nivel: 6,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Ticolé',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'IroN',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Gorn',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Mariuzinho',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'DangeR',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'ZMiguelR',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Nega0',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Abu',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Bull',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'CHUUNAS',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'KorN',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Braz[]s',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'Pinnochio',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                },
                {
                    name: 'CyNiC',
                    data: {
                        nivel: 7,
                    },
                    ping: Math.round(Math.random() * 200),
                    id: 1,
                }
            ]);
        }
    }
    ngOnInit() {
    }
    listaJogadores(lista) {
        this.jogadores.next(JSON.parse(lista));
    }
};
PlayersOnlinePage = __decorate([
    core_1.Component({
        selector: 'app-players-online',
        templateUrl: './players-online.page.html',
        styleUrls: ['./players-online.page.scss'],
    }),
    __metadata("design:paramtypes", [])
], PlayersOnlinePage);
exports.PlayersOnlinePage = PlayersOnlinePage;
//# sourceMappingURL=players-online.page.js.map
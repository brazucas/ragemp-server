import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-online',
  templateUrl: './players-online.page.html',
  styleUrls: ['./players-online.page.scss'],
})
export class PlayersOnlinePage implements OnInit {
  public listaJogadoresMock: Array<{
    name: string;
    data: {
      nivel: number;
    }
    ping: number;
    id: number;
  }> = [
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
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

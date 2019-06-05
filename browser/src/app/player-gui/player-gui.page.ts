import { Component, OnInit } from '@angular/core';
import { Jogador } from '../../interfaces/jogador.interface';
import { dinheiroPad } from '../../interfaces/util';
import { RagempService, VoiceChatListener } from '../services/ragemp.service';

@Component({
  selector: 'app-player-gui',
  templateUrl: './player-gui.page.html',
  styleUrls: ['./player-gui.page.scss'],
})
export class PlayerGuiPage implements OnInit {
  public voiceChatListeners: Array<VoiceChatListener>;
  public dadosJogador: Jogador;
  public dinheiro: string;
  public creditos: string;

  constructor(public ragemp: RagempService) {
  }

  ngOnInit() {
    this.ragemp.voiceChatListeners$.subscribe(listeners => {
      this.voiceChatListeners = listeners;
    });

    this.ragemp.dadosJogador$.subscribe(jogador => {
      this.dadosJogador = jogador;

      this.dinheiro = dinheiroPad(jogador.dinheiro);
      this.creditos = dinheiroPad(jogador.creditos);
    });
  }

}

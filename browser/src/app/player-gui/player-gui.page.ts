import { Component, OnInit } from '@angular/core';
import { CountUp } from 'countup.js';
import { Jogador } from '../../interfaces/jogador.interface';
import { RagempService, VoiceChatListener } from '../services/ragemp.service';

@Component({
  selector: 'app-player-gui',
  templateUrl: './player-gui.page.html',
  styleUrls: ['./player-gui.page.scss'],
})
export class PlayerGuiPage implements OnInit {
  public voiceChatListeners: Array<VoiceChatListener>;
  public dadosJogador: Jogador;
  public diffForcaFisica: number;
  public diffSono: number;
  public diffFome: number;
  public diffSede: number;

  constructor(public ragemp: RagempService) {
  }

  ngOnInit() {
    const dinheiroCountUp = new CountUp('dinheiro', 0, {
      decimal: '',
      useGrouping: false,
    });

    const creditosCountUp = new CountUp('creditos', 0, {
      decimal: '',
      useGrouping: false,
    });

    if (!dinheiroCountUp.error) {
      dinheiroCountUp.start();
    } else {
      console.error(dinheiroCountUp.error);
    }

    if (!creditosCountUp.error) {
      creditosCountUp.start();
    } else {
      console.error(creditosCountUp.error);
    }

    this.ragemp.voiceChatListeners$.subscribe(listeners => {
      this.voiceChatListeners = listeners;
    });

    this.ragemp.dadosJogador$.subscribe(jogador => {
      if (this.dadosJogador) {
        this.diffForcaFisica = jogador.forcaFisica - this.dadosJogador.forcaFisica;
        this.diffSono = jogador.sono - this.dadosJogador.sono;
        this.diffFome = jogador.fome - this.dadosJogador.fome;
        this.diffSede = jogador.sede - this.dadosJogador.sede;

        setTimeout(() => {
          this.diffForcaFisica = 0;
          this.diffSono = 0;
          this.diffFome = 0;
          this.diffSede = 0;
        }, 100000);
      }

      this.dadosJogador = jogador;

      dinheiroCountUp.update(jogador.dinheiro);
      creditosCountUp.update(jogador.creditos);
    });
  }

}

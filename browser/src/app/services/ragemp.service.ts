import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Jogador } from '../../interfaces/jogador.interface';

@Injectable({
  providedIn: 'root'
})
export class RagempService {
  public playerName: BehaviorSubject<string> = new BehaviorSubject(null);
  public jogadorLocal: BehaviorSubject<Jogador> = new BehaviorSubject(null);

  constructor() {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).ragemp = (window as any).ragemp || {};
    (window as any).ragemp.setPlayerName = this.setPlayerName.bind(this);
  }

  public setPlayerName(playerName: string) {
    this.playerName.next(playerName);
  }

  public setJogadorLocal(jogador: Jogador) {
    this.jogadorLocal.next(jogador);
  }
}

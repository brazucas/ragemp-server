import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RagempService {
  public playerName: BehaviorSubject<string> = new BehaviorSubject(null);

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
}

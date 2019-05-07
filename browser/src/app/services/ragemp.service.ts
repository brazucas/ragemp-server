import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BrazucasEventos } from '../../../../packages/rpg/interfaces/brazucas-eventos';
import { Jogador } from '../../interfaces/jogador.interface';

declare let mp: any;

@Injectable({
  providedIn: 'root'
})
export class RagempService {
  public playerName$: BehaviorSubject<string> = new BehaviorSubject(null);
  public jogadorLocal$: BehaviorSubject<Jogador> = new BehaviorSubject(null);
  public serverEvent$: Subject<ServerEvent> = new Subject();

  constructor() {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).ragemp = (window as any).ragemp || {};
    (window as any).ragemp.setPlayerName = this.setPlayerName.bind(this);
    (window as any).ragemp.serverEvent = this.serverEvent.bind(this);
  }

  public callRagempEvent(event: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      mp.trigger(BrazucasEventos.BROWSER, event, JSON.stringify(data));

      const subscriber = this.serverEvent$.subscribe((serverEvent) => {
        const eventData = JSON.parse(serverEvent.data);

        if (serverEvent.event === event) {
          clearTimeout(timeout);
          subscriber.unsubscribe();

          resolve(eventData);
        }
      });

      const timeout = setTimeout(() => {
        subscriber.unsubscribe();
        reject('timeout');
      }, 10000);
    });
  }

  public setPlayerName(playerName: string) {
    this.playerName$.next(playerName);
  }

  public serverEvent(event: string, data: any) {
    this.serverEvent$.next({
      event: event,
      data: data,
    });
  }
}

export interface ServerEvent {
  event: string,
  data: any,
}

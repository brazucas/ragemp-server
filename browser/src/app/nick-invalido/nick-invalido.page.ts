import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH } from '../../../../common/interfaces';
import { RagempService } from '../services/ragemp.service';

@Component({
  selector: 'app-nick-invalido',
  templateUrl: './nick-invalido.page.html',
  styleUrls: ['./nick-invalido.page.scss'],
})
export class NickInvalidoPage implements OnInit {
  public playerName$: Observable<string>;
  public PLAYER_NAME_MINLENGTH = PLAYER_NAME_MINLENGTH;
  public PLAYER_NAME_MAXLENGTH = PLAYER_NAME_MAXLENGTH;

  constructor(public ragemp: RagempService) { }

  ngOnInit() {
    this.playerName$ = this.ragemp.playerName$;
  }

}

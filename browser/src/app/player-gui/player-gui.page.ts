import { Component, OnInit } from '@angular/core';
import { RagempService, VoiceChatListener } from '../services/ragemp.service';

@Component({
  selector: 'app-player-gui',
  templateUrl: './player-gui.page.html',
  styleUrls: ['./player-gui.page.scss'],
})
export class PlayerGuiPage implements OnInit {
  public voiceChatListeners: Array<VoiceChatListener>;

  constructor(public ragemp: RagempService) {
  }

  ngOnInit() {
    this.ragemp.voiceChatListeners$.subscribe(listeners => {
      this.voiceChatListeners = listeners;
    });
  }

}

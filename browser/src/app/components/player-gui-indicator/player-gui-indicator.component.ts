import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-gui-indicator',
  templateUrl: './player-gui-indicator.component.html',
  styleUrls: ['./player-gui-indicator.component.scss'],
})
export class PlayerGuiIndicatorComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Input() activeColor = '#FF0000';
  @Input() backgroundColor = '#FF3333';
  public barWidth: number;
  public containerWidth = 150;

  constructor() {
  }

  ngOnInit() {
    this.barWidth = Math.min((this.containerWidth * this.value) / this.max, this.containerWidth);
  }

}

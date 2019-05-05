import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icone',
  templateUrl: './icone.component.html',
  styleUrls: ['./icone.component.scss'],
})
export class IconeComponent implements OnInit {
  @Input() name: string;
  @Input() cor = '#FFFFFF';
  @Input() tamanho = '30px';

  constructor() { }

  ngOnInit() {}

}

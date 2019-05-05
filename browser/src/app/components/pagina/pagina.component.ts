import { Component, Input, OnInit } from '@angular/core';

declare let mp: any;

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {
  @Input() podeFechar: boolean = true;

  constructor() { }

  ngOnInit() {}

  public fechar() {
    mp.trigger('FecharBrowser');
  }
}

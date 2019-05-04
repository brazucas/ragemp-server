import { Component, OnInit } from '@angular/core';
import { browser } from '../../../../index';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  public fechar() {
    browser.destroy();
  }
}

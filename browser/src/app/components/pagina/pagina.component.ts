import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  public fechar() {
    mp.browsers.forEach((browser) => browser.destroy());
  }
}

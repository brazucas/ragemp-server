import { Component, OnInit } from '@angular/core';
import { RagempService } from '../services/ragemp.service';

declare const mp;

@Component({
  selector: 'app-gerenciar-veiculo',
  templateUrl: './gerenciar-veiculo.page.html',
  styleUrls: ['./gerenciar-veiculo.page.scss'],
})
export class GerenciarVeiculoPage implements OnInit {

  constructor(public ragemp: RagempService) {
  }

  ngOnInit() {
  }

  browserPage(pagina: string) {
    mp.trigger('BrowserPagina', 'central', pagina);
  }
}

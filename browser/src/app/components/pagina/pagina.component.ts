import { Component, Input, OnInit } from '@angular/core';
import { RagempService } from '../../services/ragemp.service';

declare let mp: any;

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {
  @Input() podeFechar = true;
  @Input() cabecalho = true;
  @Input() position = 'center';
  @Input() layout = true;
  @Input() top: number;
  @Input() anim = true;

  constructor(public ragemp: RagempService) { }

  ngOnInit() {}

  public fechar() {
    this.ragemp.closeBrowser();
  }
}

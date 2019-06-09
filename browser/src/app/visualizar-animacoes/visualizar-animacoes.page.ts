import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrazucasEventos } from '../../../../packages/rpg/interfaces/brazucas-eventos';
import { Animations } from '../../interfaces/animations.interface';
import { RagempService } from '../services/ragemp.service';

declare const mp;

@Component({
  selector: 'app-visualizar-animacoes',
  templateUrl: './visualizar-animacoes.page.html',
  styleUrls: ['./visualizar-animacoes.page.scss'],
})
export class VisualizarAnimacoesPage implements AfterViewInit {
  public animacaoPacoteIndex = 0;
  public animacaoNomeIndex = 0;

  public formGroup = new FormGroup({
    pacote: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    nome: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  constructor(public ragemp: RagempService) {
  }

  ngAfterViewInit() {
    this.updateAnimation();
  }

  public updateAnimation() {
    this.formGroup.patchValue({
      pacote: Animations[this.animacaoPacoteIndex][0],
      nome: Animations[this.animacaoPacoteIndex][1][this.animacaoNomeIndex],
    });

    if (typeof mp !== 'undefined') {
      this.ragemp.callRagempEvent(BrazucasEventos.VISUALIZAR_ANIMACAO, this.formGroup.value);
    }
  }

  public animacaoPacoteAnterior() {
    if (Animations[this.animacaoPacoteIndex - 1]) {
      this.animacaoPacoteIndex -= 1;
      this.animacaoNomeIndex = 0;

      this.updateAnimation();
    }
  }

  public animacaoPacoteProximo() {
    if (Animations[this.animacaoPacoteIndex + 1]) {
      this.animacaoPacoteIndex += 1;
      this.animacaoNomeIndex = 0;

      this.updateAnimation();
    }
  }

  public animacaoNomeAnterior() {
    if (Animations[this.animacaoPacoteIndex][1][this.animacaoNomeIndex - 1]) {
      this.animacaoNomeIndex -= 1;

      this.updateAnimation();
    } else {
      this.animacaoPacoteAnterior();
    }
  }

  public animacaoNomeProximo() {
    if (Animations[this.animacaoPacoteIndex][1][this.animacaoNomeIndex + 1]) {
      this.animacaoNomeIndex += 1;

      this.updateAnimation();
    } else {
      this.animacaoPacoteProximo();
    }
  }

}

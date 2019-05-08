import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Veiculos } from '../../../../common/util/vehicles';
import { EnumToArray } from '../../interfaces/util';

@Component({
  selector: 'app-criar-veiculo',
  templateUrl: './criar-veiculo.page.html',
  styleUrls: ['./criar-veiculo.page.scss'],
})
export class CriarVeiculoPage implements AfterViewInit {
  public mostrarFormulario = true;
  public listaVeiculos = EnumToArray(Veiculos).sort();

  public color = '#FF0000';

  public filtroPesquisa: string;

  public formGroup = new FormGroup({
    modelo: new FormControl('adder', {
      validators: [
        Validators.required,
      ],
    }),
    cor: new FormControl('#FF0000', {
      validators: [
        Validators.required,
      ],
    }),
    placa: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    proprietario: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    posicaoX: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    posicaoY: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    posicaoZ: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    trancado: new FormControl(true, {
      validators: [
        Validators.required,
      ],
    }),
    motor: new FormControl(false, {
      validators: [
        Validators.required,
      ],
    }),
    transparencia: new FormControl('0', {
      validators: [
        Validators.required,
      ],
    }),
    tamanho: new FormControl('1', {
      validators: [
        Validators.required,
      ],
    }),
  });


  constructor() {
    if (typeof mp === 'undefined') {
      this.formGroup.patchValue({
        posicaoX: 1233.123183323,
        posicaoY: 1233.123183323,
        posicaoZ: 1233.123183323,
      });
    }
  }

  public modeloSelecionado($event) {
    console.log('>>>> ', $event, this.formGroup.controls.modelo.value);
  }

  public modeloPesquisa($event: CustomEvent) {
    this.filtroPesquisa = $event.detail.value;
  }

  async ngAfterViewInit() {

  }

  public criarVeiculo() {

  }
}

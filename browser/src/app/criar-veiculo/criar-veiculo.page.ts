import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Veiculos } from '../../../../common/util/vehicles';
import { EnumToArray } from '../../interfaces/util';
import { RagempService } from '../services/ragemp.service';
import { VeiculoService } from '../services/veiculo.service';

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

  constructor(public ragemp: RagempService,
              public toastCtrl: ToastController,
              public loading: LoadingController,
              public veiculo: VeiculoService) {
    if (typeof mp === 'undefined') {
      this.formGroup.patchValue({
        posicaoX: 1233.123183323,
        posicaoY: 1233.123183323,
        posicaoZ: 1233.123183323,
      });
    } else {
      this.ragemp.dadosJogador$.subscribe((dadosJogador) => {
        console.debug(`DADOS JOGADOR ${JSON.stringify(dadosJogador)}`);
        this.formGroup.patchValue({
          posicaoX: dadosJogador.posicaoX,
          posicaoY: dadosJogador.posicaoY,
          posicaoZ: dadosJogador.posicaoZ,
        });
      });
    }
  }

  public corVeiculo(cor: string) {
    this.formGroup.controls.cor.patchValue(cor);
  }

  public modeloSelecionado($event) {
    console.log('>>>> ', $event, this.formGroup.controls.modelo.value);
  }

  public modeloPesquisa($event: CustomEvent) {
    this.filtroPesquisa = $event.detail.value;
  }

  async ngAfterViewInit() {

  }

  public async criarVeiculo() {
    const loading = await this.loading.create();

    try {
      loading.present();

      await this.veiculo.criarVeiculo(this.formGroup.value);

      this.mostrarFormulario = false;

      const toast = await this.toastCtrl.create({
        message: 'Veículo criado com sucesso!',
        position: 'top',
        color: 'success',
        duration: 3000,

      });

      loading.dismiss();
      toast.present();

      setTimeout(() => {
        this.ragemp.closeBrowser();
        this.mostrarFormulario = true;
      }, 3000);
    } catch (err) {
      loading.dismiss();
      
      const toast = await this.toastCtrl.create({
        message: err.mensagem || 'Um erro ocorreu ao criar o veículo',
        position: 'top',
        color: 'danger',
        duration: 3000
      });
      toast.present();
    }
  }
}

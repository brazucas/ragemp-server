/// <reference path="../../../node_modules/@types/ragemp-c/index.d.ts" />

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { AutenticacaoResultado } from '../../interfaces/login.interface';
import { LoginService } from '../services/login.service';
import { RagempService } from '../services/ragemp.service';

declare let mp: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  @ViewChild('senha') campoSenha: IonInput;
  public mostrarFormulario = true;

  public formGroup = new FormGroup({
    usuario: new FormControl({
      value: '',
      disabled: true,
    }, {
      validators: [
        Validators.maxLength(40),
        Validators.required,
      ],
    }),
    senha: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  constructor(public toastCtrl: ToastController,
              public loginService: LoginService,
              public loading: LoadingController,
              public ragemp: RagempService) {
    this.ragemp.playerName$.subscribe((playerName) => {
      this.formGroup.controls.usuario.patchValue(playerName);
    });
  }

  async ngAfterViewInit() {
    this.campoSenha.setFocus();
  }

  public async login() {
    const loading = await this.loading.create();

    try {
      loading.present();

      const autenticacaoResultado: AutenticacaoResultado = await this.loginService.login(this.formGroup.value);

      if (!autenticacaoResultado.autenticado) {
        throw autenticacaoResultado;
      }

      this.mostrarFormulario = false;

      const toast = await this.toastCtrl.create({
        message: 'Autenticado com sucesso!',
        position: 'top',
        color: 'success',
        duration: 3000,

      });

      toast.present();
      loading.dismiss();

      mp.trigger('DesabilitarCursor');

      setTimeout(() => {
        this.ragemp.closeBrowser();
      }, 3000);
    } catch (err) {
      loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: err.credenciaisInvalidas ? 'Credenciais Inválidas' : 'Um erro ocorreu ao autenticar',
        position: 'top',
        color: 'danger',
        duration: 3000
      });
      toast.present();
    }
  }

}

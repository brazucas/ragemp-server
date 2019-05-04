/// <reference path="../../../node_modules/@types/ragemp-c/index.d.ts" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { playerMock } from '../mock';
import { IonInput, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { browser } from '../../../index';

declare let mp: Mp;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('senha') campoSenha: IonInput;

  public player: PlayerMp | any;

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
              public loginService: LoginService) {
  }

  async ngOnInit() {
    if (typeof mp !== 'undefined') {
      this.player = mp.players.local;
    } else {
      this.player = playerMock;
    }

    this.formGroup.controls.usuario.patchValue(this.player.name);

    this.campoSenha.setFocus();
  }

  public async login() {
    try {
      await this.loginService.login(this.formGroup.value).toPromise();

      const toast = await this.toastCtrl.create({
        message: 'Autenticado com sucesso!',
        position: 'top',
        color: 'success',
        duration: 3000,

      });

      toast.present();

      browser.destroy();
    } catch (err) {
      const toast = await this.toastCtrl.create({
        message: err.mensagem || 'Um erro ocorreu ao autenticar',
        position: 'top',
        color: 'danger',
        duration: 3000
      });
      toast.present();

      browser.destroy();
    }
  }

}

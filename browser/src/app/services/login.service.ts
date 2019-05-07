import { Injectable } from '@angular/core';
import { BrazucasEventos } from '../../../../packages/rpg/interfaces/brazucas-eventos';
import { AutenticacaoResultado, DadosLogin, DadosRegistro, RegistroResultado } from '../../interfaces/login.interface';
import { RagempService } from './ragemp.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public ragemp: RagempService) {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).login = (window as any).ragemp || {};
  }

  public login(dados: DadosLogin): Promise<AutenticacaoResultado> {
    return this.ragemp.callRagempEvent(BrazucasEventos.AUTENTICAR_JOGADOR, dados);
  }

  public registrar(dados: DadosRegistro): Promise<RegistroResultado> {
    return this.ragemp.callRagempEvent(BrazucasEventos.REGISTRAR_JOGADOR, dados);
  }
}

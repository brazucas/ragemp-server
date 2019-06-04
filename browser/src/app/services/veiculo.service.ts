import { Injectable } from '@angular/core';
import { BrazucasEventos } from '../../../../packages/rpg/interfaces/brazucas-eventos';
import { AutenticacaoResultado } from '../../interfaces/login.interface';
import { RagempService } from './ragemp.service';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(public ragemp: RagempService) {
  }

  public criarVeiculo(dados: DadosVeiculo): Promise<AutenticacaoResultado> {
    return this.ragemp.callRagempEvent(BrazucasEventos.CRIAR_VEICULO, dados);
  }
}

export interface DadosVeiculo {
  modelo: string,
  corPrimaria: string,
  corSecundaria: string,
  placa: string,
  proprietario: string,
  posicaoX: string,
  posicaoY: string,
  posicaoZ: string,
  trancado: boolean,
  motor: boolean,
  transparencia: number,
  tamanho: string,
}

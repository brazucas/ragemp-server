import { Jogador } from './jogador.interface';

export interface AutenticacaoResultado {
  autenticado: boolean;
  credenciaisInvalidas?: boolean;
}

export interface RegistroResultado {
  registrado: boolean;
  erro?: boolean;
  mensagem?: string;
  jogador?: Jogador;
}

export interface DadosLogin {
  senha: string;
}

export interface DadosRegistro {
  email: string,
  celular: string,
  senha: string,
  senhaConfirma: string,
}

export interface AutenticacaoResultado {
  autenticado: boolean;
  credenciaisInvalidas?: boolean;
}

export interface DadosLogin {
  usuario: string;
  senha: string;
}

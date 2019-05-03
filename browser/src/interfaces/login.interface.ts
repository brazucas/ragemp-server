export interface AutenticacaoResultado {
  autenticado: boolean,
  mensagem?: string,
}

export interface DadosLogin {
  usuario: string,
  senha: string,
}

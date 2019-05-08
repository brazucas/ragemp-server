export enum BrazucasEventos {
  BROWSER = 'browser',
  SERVER = 'server',
  AUTENTICAR_JOGADOR = 'AutenticarJogador',
  REGISTRAR_JOGADOR = 'RegistrarJogador',
  AUTENTICACAO_RESULTADO = 'AutenticacaoResultado',
  REGISTRO_RESULTADO = 'RegistroResultado',
  DADOS_JOGADOR = 'DadosJogador',
  INICIAR_NAVEGADOR = 'IniciarNavegador',
  CURSOR = 'cursor',
}

export interface ServerEvent<T> {
  eventId?: number,
  event: string,
  data: T,
}

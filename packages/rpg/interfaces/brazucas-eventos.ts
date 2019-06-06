export enum BrazucasEventos {
  BROWSER = 'browser',
  SERVER = 'server',
  AUTENTICAR_JOGADOR = 'AutenticarJogador',
  CRIAR_VEICULO = 'CriarVeiculo',
  REGISTRAR_JOGADOR = 'RegistrarJogador',
  AUTENTICACAO_RESULTADO = 'AutenticacaoResultado',
  REGISTRO_RESULTADO = 'RegistroResultado',
  DADOS_JOGADOR = 'DadosJogador',
  INICIAR_NAVEGADOR = 'IniciarNavegador',
  CURSOR = 'cursor',
  HABILITAR_VOICE_CHAT = 'HabilitarVoiceChat',
  DESABILITAR_VOICE_CHAT = 'DesabilitarVoiceChat',
  ANIMACAO_VOICE_CHAT = 'AnimacaoVoiceChat',
  ATUALIZAR_FOME = 'AtualizarFome',
  ATUALIZAR_SEDE = 'AtualizarSede',
  ATUALIZAR_SONO = 'AtualizarSono',
  ATUALIZAR_FORCA_FISICA = 'AtualizarForcaFisica',
}

export interface ServerEvent<T> {
  eventId?: number,
  event: string,
  data: T,
}

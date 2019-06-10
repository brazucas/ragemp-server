import { DadosVeiculo } from '../../../../browser/src/app/services/veiculo.service';
import { DadosLogin, DadosRegistro, RegistroResultado } from '../../../../browser/src/interfaces/login.interface';
import { BrazucasServer } from '../../../../common/brazucas-server';
import { Jogador } from '../../../../common/database/models/Jogador';
import { environment } from '../../../../common/environment';
import { BrazucasEventos } from '../../interfaces/brazucas-eventos';
import { VoiceChatProvider } from '../../providers/voice-chat.provider';
import { Rpg } from '../../rpg';
import { playerEvent } from '../functions/player';

export class Events {
  protected brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    this.brazucasServer = brazucasServer;
  }

  public async [BrazucasEventos.AUTENTICAR_JOGADOR](player: PlayerMp, dados: DadosLogin) {
    try {
      const jogador: Jogador = await this.brazucasServer.autenticarJogador(player.name, dados.senha);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        await Rpg.playerProvider.update(player, jogador.toJSON());

        return {
          eventoResposta: 'AutenticacaoResultado',
          credenciaisInvalidas: false,
          autenticado: true,
        };
      } else {
        return {
          eventoResposta: 'AutenticacaoResultado',
          credenciaisInvalidas: true,
          autenticado: false,
        };
      }
    } catch (err) {
      console.error(err.toString());

      return {
        eventoResposta: 'AutenticacaoResultado',
        credenciaisInvalidas: false,
        autenticado: false,
      };
    }
  }

  public async [BrazucasEventos.REGISTRAR_JOGADOR](player: PlayerMp, dados: DadosRegistro) {
    try {
      const jogador: Jogador = await this.brazucasServer.registrarJogador(player, dados);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        playerEvent<RegistroResultado>(player, BrazucasEventos.REGISTRO_RESULTADO, {
          erro: false,
          jogador: jogador,
          registrado: true,
        });
      } else {
        playerEvent<RegistroResultado>(player, BrazucasEventos.REGISTRO_RESULTADO, {
          registrado: false,
          erro: true,
        });
      }
    } catch (err) {
      console.debug(`[REGISTRO] Um erro ocorreu ao criar o jogador ${player.name}`);
      console.error(err.toString());

      playerEvent<RegistroResultado>(player, BrazucasEventos.REGISTRO_RESULTADO, {
        registrado: false,
        erro: true,
        mensagem: err.toString() || 'Erro interno ao cadastrar',
      });
    }
  }

  public async [BrazucasEventos.CRIAR_VEICULO](player: PlayerMp, dados: DadosVeiculo) {
    try {
      await this.brazucasServer.criarVeiculo(player, dados);
    } catch (err) {
      console.debug(`[VEÍCULOS] Um erro ocorreu ao criar o veículo`);
      console.error(err.toString());

      return false;
    }
  }

  public async [BrazucasEventos.HABILITAR_VOICE_CHAT](player: PlayerMp, dados: any) {
    console.log(`[VOICE CHAT] Ativando voice chat para ${player.name} com os dados: ${JSON.stringify(dados)}`);

    const target = mp.players.at(dados.targetId);

    if (!target) {
      return {
        erro: true,
        mensagem: 'Jogador não encontrado',
      };
    }

    VoiceChatProvider.habilitar(player, target);
  }

  public async [BrazucasEventos.DESABILITAR_VOICE_CHAT](player: PlayerMp, dados: any) {
    console.log(`[VOICE CHAT] Desativando voice chat para ${player.name} com os dados: ${JSON.stringify(dados)}`);

    const target = mp.players.at(dados.targetId);

    if (!target) {
      return {
        erro: true,
        mensagem: 'Jogador não encontrado',
      };
    }

    VoiceChatProvider.desabilitar(player, target);
  }

  public async [BrazucasEventos.ANIMACAO_VOICE_CHAT](player: PlayerMp) {
    console.log(`[VOICE CHAT] Aplicando animação para ${player.name}`);

    player.playAnimation('special_ped@baygor@monologue_3@monologue_3e', 'trees_can_talk_4', 1, 0);
  }

  public async [BrazucasEventos.VISUALIZAR_ANIMACAO](player: PlayerMp, dados: {
    pacote: string,
    nome: string;
  }) {
    player.stopAnimation();
    player.playAnimation(dados.pacote, dados.nome, 1, 0);
  }
}

import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import * as Sequelize from 'sequelize';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH, PLAYER_NAME_REGEXP } from '../browser/src/app/services/ragemp.service';
import { DadosRegistro } from '../browser/src/interfaces/login.interface';
import { Database } from './database/database';
import { Jogador } from './database/models/Jogador';
import { bcryptCompare, bcryptHash, soNumeros } from './util/util';
import Bluebird = require('bluebird');

export class BrazucasServer {
  private database: Database;
  public isReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.database = new Database();
  }

  public onload(): Observable<any> {
    const fork = forkJoin(
      ...[
        this.database.sync(),
        this.database.authenticate(),
      ],
    );

    fork.subscribe(() => this.isReady.next(true));

    return fork;
  }

  public loadPlayer(playerName: string): Bluebird<Jogador> {
    return Jogador.findOne({
      ['where' as any]: {
        nome: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nome')), '=', playerName.toLowerCase())
      }
    });
  }

  public async autenticarJogador(playerName: string, senha: string): Promise<Jogador> {
    const jogador = await this.loadPlayer(playerName);

    if (!jogador) {
      throw 'Jogador não encontrado';
    }

    const autenticado = await bcryptCompare(senha, jogador.senha);

    return autenticado ? jogador : null;
  }

  public async registrarJogador(player: PlayerMp, dados: DadosRegistro): Promise<Jogador> {
    console.debug(`[REGISTRO] Novo jogador ${player.name}`);

    if (
      !dados.senhaConfirma || !dados.senha || !dados.celular || !dados.email ||
      !dados.senhaConfirma.length || !dados.senha.length || !dados.celular.length || !dados.email.length
    ) {
      throw 'Todos os campos devem ser informados';
    }

    if (dados.senha !== dados.senhaConfirma) {
      throw 'As senhas informadas diferem';
    }

    const playerNameClean = PLAYER_NAME_REGEXP.exec(player.name);

    if (
      !playerNameClean ||
      (playerNameClean[1].length !== player.name.length) ||
      player.name.length < PLAYER_NAME_MINLENGTH ||
      player.name.length > PLAYER_NAME_MAXLENGTH
    ) {
      throw 'Nick não permitido';
    }

    const jogadorExistente = await this.loadPlayer(player.name);

    if (jogadorExistente) {
      throw 'Já existe um jogador cadastrado com esse nick';
    }

    console.debug(`[REGISTRO] Criando jogador ${player.name}`);

    const senhaHash = await bcryptHash(dados.senha);

    let jogador = new Jogador({
      nome: player.name,
      senha: (senhaHash as string),
      nivel: 1,
      email: dados.email,
      celular: soNumeros(dados.celular),
    });

    return jogador.save();
  }
}

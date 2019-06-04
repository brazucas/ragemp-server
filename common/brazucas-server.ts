import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import * as Sequelize from 'sequelize';
import { DadosVeiculo } from '../browser/src/app/services/veiculo.service';
import { DadosRegistro } from '../browser/src/interfaces/login.interface';
import { Database } from './database/database';
import { Jogador } from './database/models/Jogador';
import { Veiculo } from './database/models/Veiculo';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH, PLAYER_NAME_REGEXP } from './interfaces';
import { bcryptCompare, bcryptHash, hexToRgb, soNumeros } from './util/util';
import { Veiculos } from './util/vehicles';
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

    const jogador = new Jogador({
      nome: player.name,
      senha: (senhaHash as string),
      nivel: 1,
      email: dados.email,
      celular: soNumeros(dados.celular),
    });

    return jogador.save();
  }

  public async criarVeiculo(player: PlayerMp, dadosVeiculo: DadosVeiculo): Promise<any> {
    if (!Veiculos[dadosVeiculo.modelo]) {
      throw 'Modelo não encontrado';
    }

    const rgbPrimaria = hexToRgb(dadosVeiculo.corPrimaria);
    const rgbSecundaria = hexToRgb(dadosVeiculo.corSecundaria);

    const jogador = await this.loadPlayer(player.name);

    const veiculo = new Veiculo({
      placaOriginal: dadosVeiculo.placa,
      placaExibido: dadosVeiculo.placa,
      modelo: dadosVeiculo.modelo,
      posicaoX: dadosVeiculo.posicaoX,
      posicaoY: dadosVeiculo.posicaoY,
      posicaoZ: dadosVeiculo.posicaoZ,
      rotacao: 0,
      transparencia: dadosVeiculo.transparencia,
      corPrimariaR: rgbPrimaria.r,
      corPrimariaG: rgbPrimaria.g,
      corPrimariaB: rgbPrimaria.b,
      corSecundariaR: rgbSecundaria.r,
      corSecundariaG: rgbSecundaria.g,
      corSecundariaB: rgbSecundaria.b,
      trancado: dadosVeiculo.trancado,
      motor: dadosVeiculo.motor,
      mundo: 0,
      valorOriginal: 1000,
      valorVenda: 1000,
      aVenda: true,
      jogadorVeiculo: jogador,
    });

    await veiculo.save();

    const veiculoMp = mp.vehicles.new(Veiculos[dadosVeiculo.modelo],
      new mp.Vector3(parseFloat(dadosVeiculo.posicaoX), parseFloat(dadosVeiculo.posicaoY), parseFloat(dadosVeiculo.posicaoZ)));

    veiculoMp.engine = dadosVeiculo.motor;
    veiculoMp.locked = dadosVeiculo.trancado;
    veiculoMp.setColorRGB(rgbPrimaria.r, rgbPrimaria.g, rgbPrimaria.b, rgbSecundaria.r, rgbSecundaria.g, rgbSecundaria.b);
    veiculoMp.numberPlate = dadosVeiculo.placa;
    veiculoMp.alpha = dadosVeiculo.transparencia;

    veiculoMp.spawn(veiculoMp.position, 0);

    return true;
  }
}

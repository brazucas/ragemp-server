import Bluebird = require('bluebird');
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import * as Sequelize from 'sequelize';
import { Database } from './database/database';
import { Jogador } from './database/models/Jogador';

export class BrazucasServer {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  public onload(): Observable<any> {
    return forkJoin(
      ...[
        this.database.sync(),
        this.database.authenticate(),
      ],
    );
  }

  public loadPlayer(playerName: string): Bluebird<Jogador> {
    const Op = Sequelize.Op;

    return Jogador.findOne({where: {nome: {[Op.eq]: playerName}}});
  }
}

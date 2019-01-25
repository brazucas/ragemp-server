import {Database} from "./database/database";
import {Usuario} from "./database/models/Usuario";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import * as Sequelize from "sequelize";
import Bluebird = require("bluebird");
import {forkJoin} from "rxjs";

export class BrazucasServer {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  public onload(): Observable<any> {
    return forkJoin(
      ...[
        this.database.sync(),
        this.database.authenticate()
      ]
    );
  }

  public loadPlayer(playerName: string): Bluebird<Usuario> {
    const Op = Sequelize.Op;

    return Usuario.findOne({where: {nome: {[Op.eq]: playerName}}});
  }
}
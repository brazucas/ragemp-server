import {Database} from "./database/database";
import {Usuario} from "./database/models/usuario";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

export class BrazucasServer {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  public loadPlayer(playerName: string) {
    return Observable.of(Usuario.findOne({where: {nome: playerName}}));
  }
}
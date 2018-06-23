import {Sequelize} from "sequelize-typescript";
import {environment} from "../environment";
import * as SequelizeOrigin from "sequelize";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/observable/of';

export class Database {
  public handler: any;

  constructor() {
    const Op: any = SequelizeOrigin.Op;

    this.handler = new Sequelize({
      host: environment.database_host,
      port: environment.database_port,
      database: environment.database_name,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      operatorsAliases: Op,
      dialect: 'mysql',
      username: environment.database_username,
      password: environment.database_password,
      modelPaths: [__dirname + '/models']
    });
  }

  public sync(): Observable<any> {
    return Observable.of(this.handler.sync());
  }

  public authenticate(): Observable<any> {
    return Observable.of(this.handler.authenticate());
  }
}
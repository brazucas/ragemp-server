import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { from } from 'rxjs/internal/observable/from';
import * as SequelizeOrigin from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { environment } from '../environment';

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
        idle: 10000,
      },
      operatorsAliases: Op,
      dialect: 'mysql',
      username: environment.database_username,
      password: environment.database_password,
      modelPaths: [__dirname + '/models'],
      sync: {
        alter: true,
      },
    });
  }

  public sync(): Observable<any> {
    return from(this.handler.sync());
  }

  public authenticate(): Observable<any> {
    return from(this.handler.authenticate());
  }
}

import {Sequelize} from 'sequelize-typescript';
import {environment} from "../environment";

export class Database {
  public handler: Sequelize;

  constructor() {
    this.handler = new Sequelize({
      database: environment.database_name,
      dialect: 'sqlite',
      username: environment.database_username,
      password: environment.database_password,
      storage: './database.sqlite',
      modelPaths: [__dirname + '/models']
    });
  }
}
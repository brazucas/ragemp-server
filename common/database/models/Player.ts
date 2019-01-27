import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Player extends Model<Player> {

  @Column
  nome: string;

  @Column
  senha: string;


  // @HasMany(() => Hobby)
  // hobbies: Hobby[];
}

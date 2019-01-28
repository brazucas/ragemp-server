import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Propriedade } from './Propriedade';
import { Jogador } from './Jogador';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class BancoConta extends Model<BancoConta> {

  @Column({allowNull: false})
  numero: string;

  @BelongsTo(() => Propriedade, {foreignKey: {allowNull: false, name: 'propriedade'}})
  bancoContaPropriedade: Propriedade;

  @BelongsTo(() => Jogador, {foreignKey: {allowNull: false, name: 'jogador'}})
  bancoContaJogador: Jogador;
}

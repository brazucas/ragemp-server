import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Jogador } from './Jogador';
import { Propriedade } from './Propriedade';

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

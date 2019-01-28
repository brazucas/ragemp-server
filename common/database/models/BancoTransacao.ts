import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { BancoConta } from './BancoConta';
import { BancoTipoTransacao } from './BancoTipoTransacao';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class BancoTransacao extends Model<BancoTransacao> {

  @Column
  valor: number;

  @BelongsTo(() => BancoConta, {foreignKey: {allowNull: false, name: 'conta'}})
  bancoTransacaoConta: BancoConta;

  @BelongsTo(() => BancoTipoTransacao, {foreignKey: {allowNull: false, name: 'tipo'}})
  bancoTransacaoTipo: BancoTipoTransacao;
}

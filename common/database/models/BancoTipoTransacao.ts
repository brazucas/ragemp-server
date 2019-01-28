import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { BancoTransacao } from './BancoTransacao';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class BancoTipoTransacao extends Model<BancoTipoTransacao> {

  @PrimaryKey
  @Column
  id: number;

  @Column({allowNull: false})
  nome: string;

  @Column({allowNull: false, unique: true})
  identificador: string;

  @HasMany(() => BancoTransacao, 'tipo')
  transacoes: BancoTransacao[];
}

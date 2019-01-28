import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Jogador } from './Jogador';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Notificacao extends Model<Notificacao> {

  @Column({allowNull: false})
  titulo: string;

  @Column({allowNull: false})
  descricao: string;

  @Column({defaultValue: false})
  lido: boolean;

  @Column
  dataLido: string;

  @ForeignKey(() => Jogador)
  jogador: Jogador;
}

import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Notificacao } from './Notificacao';
import { Profissao } from './Profissao';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Jogador extends Model<Jogador> {

  @Column({allowNull: false, unique: true})
  nome: string;

  @Column({allowNull: false})
  senha: string;

  @Column({defaultValue: 1})
  nivel: number;

  @BelongsTo(() => Profissao, {foreignKey: {allowNull: false, name: 'profissao'}})
  jogadorProfissao: Profissao;

  @HasMany(() => Notificacao)
  notificacoes: Notificacao[];
}

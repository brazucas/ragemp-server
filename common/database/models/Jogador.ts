import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Profissao } from './Profissao';
import { Notificacao } from './Notificacao';
import { TipoPropriedade } from './TipoPropriedade';

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

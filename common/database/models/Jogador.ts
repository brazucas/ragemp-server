import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Notificacao } from './Notificacao';
import { Profissao } from './Profissao';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['nome'],
    }
  ]
})
export class Jogador extends Model<Jogador> {

  @Column({allowNull: false})
  nome: string;

  @Column({allowNull: false})
  senha: string;

  @Column({allowNull: false})
  email: string;

  @Column({allowNull: false})
  celular: string;

  @Column({defaultValue: 1})
  nivel: number;

  @BelongsTo(() => Profissao, {foreignKey: {allowNull: true, name: 'profissao'}})
  jogadorProfissao: Profissao;

  @HasMany(() => Notificacao)
  notificacoes: Notificacao[];
}

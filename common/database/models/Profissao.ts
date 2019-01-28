import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Jogador } from './Jogador';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Profissao extends Model<Profissao> {

  @Column({allowNull: false, unique: true})
  nome: string;

  @Column({allowNull: false, defaultValue: 10})
  vagas: number;

  @Column({allowNull: false, defaultValue: 1})
  nivelMinimo: number;

  @Column({allowNull: false})
  salario: number;

  @HasMany(() => Jogador, 'profissao')
  jogadores: Jogador[];
}

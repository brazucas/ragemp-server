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

  @Column
  nome: string;

  @Column
  vagas: number;

  @Column
  nivelMinimo: number;

  @HasMany(() => Jogador)
  jogadores: Jogador[];
}

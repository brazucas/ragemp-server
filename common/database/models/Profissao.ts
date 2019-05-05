import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Jogador } from './Jogador';

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
export class Profissao extends Model<Profissao> {

  @Column({allowNull: false})
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

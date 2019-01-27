import { Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { Profissao } from './Profissao';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Jogador extends Model<Jogador> {

  @Column
  nome: string;

  @Column
  senha: string;

  @Column
  nivel: number;

  @ForeignKey(() => Profissao)
  profissao: Profissao;
}

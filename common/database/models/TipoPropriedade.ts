import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Jogador } from './Jogador';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class TipoPropriedade extends Model<TipoPropriedade> {

  @PrimaryKey
  @Column
  id: number;

  @Column
  nome: string;

  @Column
  identificador: string;
}
